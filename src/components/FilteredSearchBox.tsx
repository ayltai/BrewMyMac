'use client';

import { FilterAlt as FilterIcon, } from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem, } from '@mui/material';
import { useTranslation, } from 'next-i18next';
import React, { ComponentType, Fragment, MouseEvent, useState, } from 'react';

import { default as SearchBox, } from './SearchBox';

import type { SearchBoxProps, } from './SearchBox/SearchBox.types';

const Filter = ({
    onChange,
} : {
    onChange : (filter : string) => void,
}) => {
    const [ anchorElement, setAnchorElement, ] = useState<null | HTMLElement>(null);

    const { t, } = useTranslation();

    const filters : Record<string, string> = t('app.filters', {
        returnObjects : true,
    });

    const handleClick = (event : MouseEvent<HTMLButtonElement>) => setAnchorElement(event.currentTarget);

    const handleClose = () => setAnchorElement(null);

    return (
        <Fragment>
            <IconButton
                sx={{
                    marginLeft : 0.5,
                }}
                size='medium'
                edge='end'
                color='inherit'
                aria-label='filter'
                onClick={handleClick}>
                <FilterIcon />
            </IconButton>
            <Menu
                open={Boolean(anchorElement)}
                anchorEl={anchorElement}
                anchorOrigin={{
                    horizontal : 'left',
                    vertical   : 'bottom',
                }}
                transformOrigin={{
                    horizontal : 'left',
                    vertical   : 'top',
                }}
                onClose={handleClose}>
                {Object.keys(filters).map(key => {
                    const handleSelect = () => {
                        handleClose();

                        onChange(key);
                    };

                    return (
                        <MenuItem
                            key={key}
                            onClick={handleSelect}>
                            {filters[key]}
                        </MenuItem>
                    );
                })}
            </Menu>
        </Fragment>
    );
};

const withFilter = (Component : ComponentType<SearchBoxProps>) => {
    const ComponentWithFilter : (props : SearchBoxProps) => React.JSX.Element = (props : SearchBoxProps) => {
        const [ initialKeyword, setInitialKeyword, ] = useState<string>(props.initialKeyword || '');

        const handleChange = (filter : string) => setInitialKeyword(filter);

        return (
            <Box
                display='flex'
                flexDirection='row'>
                <Box flexGrow={1} />
                <Component
                    {...props}
                    initialKeyword={initialKeyword} />
                <Filter onChange={handleChange} />
                <Box flexGrow={1} />
            </Box>
        );
    };

    return ComponentWithFilter;
};

export default withFilter(SearchBox);
