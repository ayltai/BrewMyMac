'use client';

import { Check as CheckIcon, Language as LanguageIcon, } from '@mui/icons-material';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, } from '@mui/material';
import React, { FC, Fragment, MouseEvent, ReactNode, useState, } from 'react';

import { LanguageChoiceProps, } from './LanguageChoice.types';

const Choice = ({
    selected,
    children,
    onClick,
} : {
    selected? : boolean,
    children? : ReactNode,
    onClick?  : () => void,
}) => (
    <MenuItem onClick={onClick}>
        <ListItemIcon>
            {selected && <CheckIcon fontSize='small' />}
        </ListItemIcon>
        <ListItemText>
            {children}
        </ListItemText>
    </MenuItem>
);

const LanguageChoice : FC<LanguageChoiceProps> = ({
    selected,
    languages,
    onChange,
    ...rest
}) => {
    const [ anchorElement, setAnchorElement, ] = useState<null | HTMLElement>(null);

    const handleClick = (event : MouseEvent<HTMLButtonElement>) => setAnchorElement(event.currentTarget);

    const handleClose = () => setAnchorElement(null);

    return (
        <Fragment>
            <IconButton
                size='large'
                edge='end'
                color='inherit'
                aria-label='language'
                onClick={handleClick}
                {...rest}>
                <LanguageIcon />
            </IconButton>
            <Menu
                open={Boolean(anchorElement)}
                anchorEl={anchorElement}
                anchorOrigin={{
                    horizontal : 'right',
                    vertical   : 'bottom',
                }}
                transformOrigin={{
                    horizontal : 'right',
                    vertical   : 'top',
                }}
                onClose={handleClose}>
                {languages.map(language => {
                    const handleChange = () => {
                        handleClose();

                        if (onChange) onChange(language);
                    };

                    return (
                        <Choice
                            key={language}
                            selected={language === selected}
                            onClick={handleChange}>
                            {language}
                        </Choice>
                    );
                })}
            </Menu>
        </Fragment>
    );
};

export default LanguageChoice;
