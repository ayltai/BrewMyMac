import { Search as SearchIcon, } from '@mui/icons-material';
import { alpha, CircularProgress, InputBase, styled, } from '@mui/material';
import React, { ChangeEvent, useEffect, useState, } from 'react';
import { useTranslation, } from 'react-i18next';
import { useDebounce, } from 'usehooks-ts';

const Search = styled('div')(({ theme,}) => ({
    position                          : 'relative',
    borderRadius                      : theme.shape.borderRadius,
    backgroundColor                   : alpha(theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black, 0.15),
    '&:hover'                         : {
        backgroundColor : alpha(theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black, 0.25),
    },
    width                             : '100%',
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
        padding                         : theme.spacing(1, 1, 1, 0),
        paddingLeft                     : `calc(1em + ${theme.spacing(4)})`,
        transition                      : theme.transitions.create('width'),
        width                           : '100%',
        [theme.breakpoints.up('sm')] : {
            width     : '24ch',
            '&:focus' : {
                width : '32ch',
            },
        },
        [theme.breakpoints.up('lg')] : {
            width     : '32ch',
            '&:focus' : {
                width : '48ch',
            },
        },
    },
}));

export const SearchBox = ({
    inProgress     = false,
    initialKeyword = '',
    onSearch,
} : {
    inProgress?     : boolean,
    initialKeyword? : string,
    onSearch?       : (search? : string) => void,
}) => {
    const [ keyword, setKeyword, ] = useState<string>(initialKeyword || '');

    const debouncedKeyword = useDebounce(keyword, 400);

    const { t, } = useTranslation();

    const handleChange = (event : ChangeEvent<HTMLInputElement>) => setKeyword(event.target.value);

    useEffect(() => {
        if (onSearch) onSearch(debouncedKeyword);
    }, [ debouncedKeyword, ]);

    return (
        <Search>
            <SearchIconWrapper>
                {inProgress && (
                    <CircularProgress
                        size={24}
                        color='inherit' />
                )}
                {!inProgress && <SearchIcon />}
            </SearchIconWrapper>
            <StyledInputBase
                placeholder={t('hint_search')}
                value={keyword}
                onChange={handleChange} />
        </Search>
    );
};
