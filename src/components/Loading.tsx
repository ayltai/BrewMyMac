import { Backdrop, CircularProgress, } from '@mui/material';
import React from 'react';

export const Loading = () => (
    <Backdrop open>
        <CircularProgress color='inherit' />
    </Backdrop>
);
