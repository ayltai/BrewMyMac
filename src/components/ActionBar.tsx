import { GitHub, InfoOutlined, LinkedIn, } from '@mui/icons-material';
import { AppBar, Box, IconButton, Grid, Link, styled, Toolbar, Tooltip, } from '@mui/material';
import { useGA4React, } from 'ga-4-react';
import React, { useState, } from 'react';
import { useTranslation, } from 'react-i18next';

import { About, } from '../screens';

const ClickableImage = styled('img')`
    cursor : pointer;
`;

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

    const handleHomepageClick = () => window.open('/', '_self');

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
            <AppBar
                position='sticky'
                color='inherit'>
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
                            <ClickableImage
                                width={48}
                                height={48}
                                src={require('../LogoSmall.png')}
                                onClick={handleHomepageClick} />
                            <Link
                                marginLeft={2}
                                color='inherit'
                                underline='none'
                                href='/'
                                fontFamily='Inconsolata'
                                fontWeight={600}
                                variant='h4'>
                                {title}
                            </Link>
                            <PaddedIconButton onClick={handleGitHubClick}>
                                <GitHub />
                            </PaddedIconButton>
                            <PaddedIconButton onClick={handleLinkedInClick}>
                                <LinkedIn />
                            </PaddedIconButton>
                            <Tooltip title={t('action_about')}>
                                <PaddedIconButton onClick={handleAboutClick}>
                                    <InfoOutlined />
                                </PaddedIconButton>
                            </Tooltip>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            alignItems='center'
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
                            alignItems='center'
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
