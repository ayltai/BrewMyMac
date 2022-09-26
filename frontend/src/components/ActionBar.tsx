import mixpanel from 'mixpanel-browser';
import { GitHub, } from '@mui/icons-material';
import { AppBar, Box, IconButton, Grid, Link, styled, Toolbar, } from '@mui/material';
import React from 'react';

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
    const handleHomepageClick = () => window.open('/', '_self');

    const handleGitHubClick = () => {
        mixpanel.track('Referral - GitHub');

        window.open('https://github.com/ayltai/BrewMyMac', '_blank');
    };

    return (
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
    );
};
