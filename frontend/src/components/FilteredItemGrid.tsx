import { Grid, Typography, } from '@mui/material';
import { QueryStatus, } from '@reduxjs/toolkit/query';
import MiniSearch from 'minisearch';
import React, { useEffect, useRef, useState, } from 'react';
import { useTranslation, } from 'react-i18next';

import { useCaskQuery, useFormulaQuery, useGetTweaksQuery, useSearchQuery, } from '../apis';
import { HOMEBREW_REFRESH_INTERVAL, MIN_SEARCH_LENGTH, TWEAKS_REFRESH_INTERVAL, } from '../constants';
import { useAppSelector, } from '../hooks';
import type { Item, } from '../models';
import { handleError, } from '../utils';

import { ItemGrid, } from './ItemGrid';

const Message = ({
    children,
} : {
    children : React.ReactNode,
}) => (
    <Grid
        container
        margin={4}
        justifyContent='center'>
        <Typography
            color='text.secondary'
            variant='body1'>
            {children}
        </Typography>
    </Grid>
);

export const FilteredItemGrid = ({
    selectedOnly = false,
    filter       = '',
    onStatusChange,
} : {
    selectedOnly?   : boolean,
    filter?         : string,
    onStatusChange? : (isInProgress : boolean) => void,
}) => {
    const session = useAppSelector(state => state.session);

    const searchEngine = useRef<MiniSearch<Item>>(new MiniSearch({
        fields        : [
            'name',
            'description',
        ],
        storeFields   : [
            'id',
            'name',
            'description',
            'imageUrl',
            'infoUrl',
            'author',
            'parameter',
            'source',
        ],
        searchOptions : {
            fuzzy : 0.2,
        },
    }));

    const [ filteredItems, setFilteredItems, ] = useState<Item[]>([]);

    const { data : formulaData, error : formulaError, status : formulaStatus, } = useFormulaQuery(undefined, {
        pollingInterval : HOMEBREW_REFRESH_INTERVAL,
    });

    const { data : caskData, error : caskError, status : caskStatus, } = useCaskQuery(undefined, {
        pollingInterval : HOMEBREW_REFRESH_INTERVAL,
    });

    const { data : searchData, error : searchError, status : searchStatus, } = useSearchQuery(filter, {
        skip : filter.length < MIN_SEARCH_LENGTH,
    });

    const { data : tweakData, error : tweakError, status : tweakStatus, } = useGetTweaksQuery(undefined, {
        pollingInterval : TWEAKS_REFRESH_INTERVAL,
    });

    const { t, } = useTranslation();

    const search = () => searchEngine.current.search(filter).map(result => ({
        id          : result.id,
        name        : result.name,
        description : result.description,
        imageUrl    : result.imageUrl,
        infoUrl     : result.infoUrl,
        author      : result.author,
        parameter   : result.parameter,
        source      : result.source,
    }));

    const empty = <Message>{t('label_no_results')}</Message>;
    const hint  = <Message>{t('label_start_searching')}</Message>;

    useEffect(() => {
        searchEngine.current.removeAll();

        if (selectedOnly) {
            if (filter.length >= MIN_SEARCH_LENGTH) {
                searchEngine.current.addAll(session.items);

                setFilteredItems(search());
            }
        } else {
            if (formulaData) searchEngine.current.addAll(formulaData);
            if (caskData) searchEngine.current.addAll(caskData);
            if (searchData) searchEngine.current.addAll(searchData);
            if (tweakData) searchEngine.current.addAll(tweakData);

            setFilteredItems(search());
        }
    }, [ filter, selectedOnly, ]);

    useEffect(() => {
        if (formulaStatus === QueryStatus.fulfilled && formulaData) {
            searchEngine.current.addAll(formulaData);

            if (filter.length >= MIN_SEARCH_LENGTH) setFilteredItems(search());
        }
    }, [ formulaData, formulaStatus, ]);

    useEffect(() => {
        if (caskStatus === QueryStatus.fulfilled && caskData) {
            searchEngine.current.addAll(caskData);

            if (filter.length >= MIN_SEARCH_LENGTH) setFilteredItems(search());
        }
    }, [ caskData, caskStatus, ]);

    useEffect(() => {
        if (searchStatus === QueryStatus.fulfilled && searchData) {
            searchEngine.current.addAll(searchData);

            if (filter.length >= MIN_SEARCH_LENGTH) setFilteredItems(search());
        }
    }, [ searchData, searchStatus, ]);

    useEffect(() => {
        if (tweakStatus === QueryStatus.fulfilled && tweakData) {
            searchEngine.current.addAll(tweakData);

            if (filter.length >= MIN_SEARCH_LENGTH) setFilteredItems(search());
        }
    }, [ tweakData, tweakStatus, ]);

    useEffect(() => {
        if (onStatusChange) return onStatusChange(formulaStatus === QueryStatus.pending || caskStatus === QueryStatus.pending || searchStatus === QueryStatus.pending || tweakStatus === QueryStatus.pending);
    }, [ formulaStatus, caskStatus, searchStatus, tweakStatus, ]);

    useEffect(() => formulaError && handleError(formulaError), [ formulaError, ]);
    useEffect(() => caskError && handleError(caskError), [ caskError, ]);
    useEffect(() => searchError && handleError(searchError), [ searchError, ]);
    useEffect(() => tweakError && handleError(tweakError), [ tweakError, ]);

    if (filter.length < MIN_SEARCH_LENGTH) return selectedOnly ? <ItemGrid items={session.items} /> : hint;

    return filteredItems.length > 0 ? <ItemGrid items={filteredItems} /> : empty;
};
