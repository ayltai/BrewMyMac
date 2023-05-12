'use client';

import { Menu as MenuIcon, } from '@mui/icons-material';
import { IconButton, Menu, } from '@mui/material';
import React, { Children, cloneElement, FC, Fragment, MouseEvent, useState, } from 'react';

import type { ShortcutMenuProps, } from './ShortcutMenu.types';

const ShortcutMenu : FC<ShortcutMenuProps> = ({
    children,
    ...rest
}) => {
    const [ anchorElement, setAnchorElement, ] = useState<null | HTMLElement>(null);

    const handleClick = (event: MouseEvent<HTMLElement>) => setAnchorElement(event.currentTarget);

    const handleClose = () => setAnchorElement(null);

    return (
        <Fragment>
            <IconButton
                size='large'
                edge='start'
                color='inherit'
                aria-label='menu'
                onClick={handleClick}
                {...rest}>
                <MenuIcon />
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
                {children && Children.map(children, child => cloneElement(child, {
                    mode : 'mobile',
                }))}
            </Menu>
        </Fragment>
    );
};

export default ShortcutMenu;
