import { GitHub, InfoOutlined, LinkedIn, } from '@mui/icons-material';
import { AppBar, Box, IconButton, Grid, Link, styled, Toolbar, } from '@mui/material';
import { useGA4React, } from 'ga-4-react';
import React, { useState, } from 'react';
import { useTranslation, } from 'react-i18next';

import { About, } from '../screens';

const PaddedIconButton = styled(IconButton)(({ theme, }) => ({
    marginLeft : theme.spacing(1),
}));

export const ActionBar = ({
    title,
    centerComponent,
    rightComponent,
} : {
    title?           : string,
    centerComponent? : React.ReactNode,
    rightComponent?  : React.ReactNode,
}) => {
    const ga = useGA4React();

    const { t, } = useTranslation();

    const [ open, setOpen, ] = useState(false);

    const handleGitHubClick = () => {
        if (ga) ga.event('Click', 'GitHub', 'Referral');

        window.open('https://github.com/ayltai/BrewMyMac', '_blank');
    };

    const handleLinkedInClick = () => {
        if (ga) ga.event('Click', 'LinkedIn', 'Referral');

        window.open(t('url_linkedin'), '_blank');
    };

    const handleAboutClick = () => setOpen(true);

    const handleClose = () => setOpen(false);

    return (
        <>
            <AppBar position='sticky'>
                <Toolbar>
                    <Grid
                        container
                        width='100%'>
                        <Grid
                            item
                            display='flex'
                            flexDirection='row'
                            xs={3}
                            alignItems='center'>
                            <Link
                                color='inherit'
                                underline='none'
                                href='/'
                                variant='h5'>
                                {title}
                            </Link>
                            <PaddedIconButton onClick={handleGitHubClick}>
                                <GitHub />
                            </PaddedIconButton>
                            <PaddedIconButton onClick={handleLinkedInClick}>
                                <LinkedIn />
                            </PaddedIconButton>
                            <PaddedIconButton onClick={handleAboutClick}>
                                <InfoOutlined />
                            </PaddedIconButton>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            justifyContent='center'>
                            <Box
                                display='flex'
                                flexDirection='row'>
                                <Box flexGrow={1} />
                                {centerComponent}
                                <Box flexGrow={1} />
                            </Box>
                        </Grid>
                        <Grid
                            item
                            xs={3}
                            justifyContent='flex-end'>
                            {rightComponent}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {open && <About onClose={handleClose} />}
        </>
    );
};
