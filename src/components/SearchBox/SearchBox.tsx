'use client';

import { Search as SearchIcon, } from '@mui/icons-material';
import { CircularProgress, InputBase, } from '@mui/material';
import { alpha, styled, } from '@mui/material/styles'
import React, { ChangeEvent, FC, useCallback, useEffect, useState, } from 'react';
import { useDebounce, } from 'usehooks-ts';

import type { SearchBoxProps, } from './SearchBox.types';

const Search = styled('div')(({ theme, }) => ({
    position                     : 'relative',
    borderRadius                 : theme.shape.borderRadius,
    backgroundColor              : alpha(theme.palette.common.black, 0.10),
    '&:hover'                    : {
        backgroundColor : alpha(theme.palette.common.black, 0.15),
    },
    width                        : '100%',
    [theme.breakpoints.up('sm')] : {
        marginLeft : theme.spacing(1),
        width      : 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme, }) => ({
    padding        : theme.spacing(0, 2),
    height         : '100%',
    position       : 'absolute',
    pointerEvents  : 'none',
    display        : 'flex',
    alignItems     : 'center',
    justifyContent : 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme, }) => ({
    color                   : 'inherit',
    '& .MuiInputBase-input' : {
        padding                        : theme.spacing(1, 1, 1, 0),
        paddingLeft                    : `calc(1em + ${ theme.spacing(4) })`,
        transition                     : theme.transitions.create('width'),
        width                          : '100%',
        [theme.breakpoints.down('lg')] : {
            width     : '24ch',
            '&:focus' : {
                width : '36ch',
            },
        },
        [theme.breakpoints.up('lg')]   : {
            width     : '48ch',
            '&:focus' : {
                width : '72ch',
            },
        },
    },
}));

const SearchBox : FC<SearchBoxProps> = ({
    isLoading      = false,
    initialKeyword = '',
    hint,
    onSearch,
}) => {
    const [ keyword, setKeyword, ] = useState<string>(initialKeyword || '');

    const debouncedKeyword = useDebounce(keyword, 400);

    const handleChange = useCallback((event : ChangeEvent<HTMLInputElement>) => setKeyword(event.target.value), [ setKeyword, ]);

    useEffect(() => setKeyword(initialKeyword), [ initialKeyword, ]);

    useEffect(() => {
        if (onSearch) onSearch(debouncedKeyword);
    }, [ debouncedKeyword, onSearch, ]);

    return (
        <Search>
            <SearchIconWrapper>
                {isLoading && (
                    <CircularProgress
                        size={24}
                        color='inherit' />
                )}
                {!isLoading && <SearchIcon />}
            </SearchIconWrapper>
            <StyledInputBase
                placeholder={hint}
                value={keyword}
                onChange={handleChange} />
        </Search>
    );
};

export default SearchBox;
