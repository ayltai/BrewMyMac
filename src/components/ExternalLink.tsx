import { OpenInNew, } from '@mui/icons-material';
import { Box, Link, styled, Typography, } from '@mui/material';
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
            <OpenInNew />
            <Typography margin={1}>
                {title}
            </Typography>
        </Box>
    </ClickableLink>
);
