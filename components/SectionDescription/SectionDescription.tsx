import { Typography, } from '@mui/material';
import React, { FC, } from 'react';

import { SectionContentProps, } from '../SectionContent/SectionContent.types';

const SectionDescription : FC<SectionContentProps> = ({
    children,
    ...rest
}) => (
    <Typography {...rest}>
        {children}
    </Typography>
);

export default SectionDescription;
