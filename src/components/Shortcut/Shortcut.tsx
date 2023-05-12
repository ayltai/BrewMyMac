'use client';

import { Button, MenuItem, useMediaQuery, } from '@mui/material';
import React, { FC, } from 'react';

import type { ShortcutProps, } from './Shortcut.types';

const Shortcut : FC<ShortcutProps> = ({
    mode,
    anchor,
    children,
    ...rest
}) => {
    const mobileMode  = !useMediaQuery('(max-width: 900px)');
    const desktopMode = (mode && mode === 'desktop') || mobileMode;

    const handleClick = () => window.location.href = `#${anchor}`;

    return desktopMode ? (
        <Button
            size='large'
            color='inherit'
            onClick={handleClick}
            {...rest}>
            {children}
        </Button>
    ) : (
        <MenuItem
            onClick={handleClick}
            {...rest}>
            {children}
        </MenuItem>
    );
};

export default Shortcut;
