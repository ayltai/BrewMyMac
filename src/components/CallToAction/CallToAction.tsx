'use client';

import { Button, Fab, useMediaQuery, } from '@mui/material';
import React, { FC, } from 'react';

import type { CallToActionProps, } from './CallToAction.types';

const CallToAction : FC<CallToActionProps> = ({
    icon,
    children,
    onClick,
    ...rest
}) => {
    const desktopMode = useMediaQuery('(min-width: 900px)');

    return desktopMode ? (
        <Button
            color='secondary'
            variant='contained'
            startIcon={icon}
            onClick={onClick}
            {...rest}>
            {children}
        </Button>
    ) : (
        <Fab
            color='secondary'
            aria-label='call to action'
            onClick={onClick}
            {...rest}>
            {icon ?? children}
        </Fab>
    );
};

export default CallToAction;
