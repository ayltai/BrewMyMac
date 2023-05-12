import { Typography, } from '@mui/material';
import React, { FC, } from 'react';

import type { SectionNameProps, } from './SectionName.types';

const SectionName : FC<SectionNameProps> = ({
    children,
    ...rest
}) => (
    <Typography
        gutterBottom
        color='secondary'
        variant='subtitle1'
        fontWeight='bold'
        {...rest}>
        {children}
    </Typography>
);

export default SectionName;
