'use client';

import { Grid, Typography } from '@mui/material';
import MiniSearch from 'minisearch';
import { useTranslation, } from 'next-i18next';
import React, { ReactNode, useEffect, useRef, useState, } from 'react';

import { useCaskQuery, useFormulaQuery, } from '../apis';
import { useAppSelector, } from '../hooks';
import { handleError, } from '../utils';
import { ItemGrid, } from './ItemGrid';

import type { Item, } from '../types';

const Message = ({
    children,
} : {
    children : ReactNode,
}) => (
    <Grid
        container
        margin={4}
        justifyContent='center'>
        <Typography color='text.secondary'>
            {children}
        </Typography>
    </Grid>
);

export const FilteredItemGrid = ({
    selectedOnly = false,
    filter,
    onStatusChange,
} : {
    selectedOnly?   : boolean,
    filter          : string,
    onStatusChange? : (inProgress : boolean) => void,
}) => {
    const [ filteredItems, setFilteredItems, ] = useState<Item[]>([]);

    const shoppingCart = useAppSelector(state => state.shoppingCart);

    const { data : formulaData, error : formulaError, isError : isFormulaError, isFetching : isFormulaFetching, isLoading : isFormulaLoading, isSuccess : isFormulaSuccess, } = useFormulaQuery(undefined, {
        pollingInterval : Number(process.env.INTERVAL_API_HOMEBREW),
    });

    const { data : caskData, error : caskError, isError : isCaskError, isFetching : isCaskFetching, isLoading : isCaskLoading, isSuccess : isCaskSuccess, } = useCaskQuery(undefined, {
        pollingInterval : Number(process.env.INTERVAL_API_HOMEBREW),
    });

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

    const { t, } = useTranslation();

    const search = () : Item[] => searchEngine.current.search(filter).map(result => ({
        id          : result.id,
        name        : result.name,
        description : result.description,
        imageUrl    : result.imageUrl,
        infoUrl     : result.infoUrl,
        author      : result.author,
        parameter   : result.parameter,
        source      : result.source,
    }));

    useEffect(() => {
        searchEngine.current.removeAll();

        if (selectedOnly) {
            if (filter.length >= Number(process.env.LENGTH_SEARCH)) {
                searchEngine.current.addAll(shoppingCart.items);

                setFilteredItems(search());
            }
        } else {
            if (caskData) searchEngine.current.addAll(caskData.map(item => ({
                ...item,
                id : `${item.source}|${item.id}`,
            })));

            if (formulaData) searchEngine.current.addAll(formulaData.map(item => ({
                ...item,
                id : `${item.source}|${item.id}`,
            })));

            setFilteredItems(search());
        }
    }, [ caskData, formulaData, filter, selectedOnly,]);

    useEffect(() => {
        if (onStatusChange) return onStatusChange(isCaskLoading || isCaskFetching || isFormulaLoading || isFormulaFetching);
    }, [ isCaskLoading, isCaskFetching, isFormulaLoading, isFormulaFetching, onStatusChange, ]);

    useEffect(() => {
        if (isCaskError) handleError(caskError);
    }, [ isCaskError, caskError, ]);

    useEffect(() => {
        if (isFormulaError) handleError(formulaError);
    }, [ isFormulaError, formulaError, ]);

    if (filter.length < Number(process.env.LENGTH_SEARCH)) return selectedOnly ? <ItemGrid items={shoppingCart.items} /> : <Message>{t('hint.type-more')}</Message>;

    return filteredItems.length > 0 ? <ItemGrid items={filteredItems} /> : <Message>{t('hint.no-results')}</Message>;
};
