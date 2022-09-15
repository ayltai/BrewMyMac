import { Box, Paper, styled, } from '@mui/material';
import React from 'react';

const BottomPaper = styled(Paper)`
    width    : 100%;
    bottom   : 0;
    position : fixed;
    z-index  : 1;
`;

export const Footer = ({
    children,
} : {
    children? : React.ReactNode,
}) => (
    <BottomPaper
        square
        elevation={3}>
        <Box
            display='flex'
            flexGrow={1}
            justifyContent='center'>
            {children}
        </Box>
    </BottomPaper>
);
