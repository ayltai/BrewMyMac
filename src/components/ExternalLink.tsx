'use client';

import { OpenInNew as OpenInNewIcon, } from '@mui/icons-material';
import { Box, Link, Typography, } from '@mui/material';
import { styled, } from '@mui/material/styles';
import React from 'react';

const ClickableLink = styled(Link)`
    cursor : pointer;
`;

export const ExternalLink = ({
    title,
    href,
    onClick,
} : {
    title    : string,
    href?    : string,
    onClick? : () => void,
}) => (
    <ClickableLink
        underline='none'
        href={href}
        target='_blank'
        onClick={onClick}>
        <Box
            display='flex'
            alignItems='center'>
            <Typography margin={1}>
                {title}
            </Typography>
            <OpenInNewIcon fontSize='small' />
        </Box>
    </ClickableLink>
);
