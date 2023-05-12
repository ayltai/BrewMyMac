'use client';

import { PrecisionManufacturing as PrecisionManufacturingIcon, Repeat as RepeatIcon, ShoppingCart as ShoppingCartIcon, RocketLaunch as RocketLaunchIcon, } from '@mui/icons-material';
import { Avatar, Box, Container, Grid, Paper, Typography, } from '@mui/material';
import { useTheme, } from '@mui/material/styles';
import { Inconsolata, } from 'next/font/google';
import Image from 'next/image';
import { useRouter, } from 'next/router';
import { i18n, useTranslation, } from 'next-i18next';
import React, { Fragment, ReactNode, useCallback, useState, } from 'react';

import { Branding, CallToAction, FilteredItemGrid, FilteredSearchBox, LanguageChoice, Screen, Section, SectionContent, SectionDescription, SectionForeground, SectionName, SectionTitle, Shortcut, TopBar, } from '../components';
import { useAppDispatch, useAppSelector, } from '../hooks';
import { setLocale, } from '../states';
import { handleError, } from '../utils';
import getServerSideProps from '../utils/getServerSideProps';

type Feature = {
    icon        : ReactNode,
    title       : string,
    description : string,
};

const inconsolata = Inconsolata({
    display : 'swap',
    subsets : [
        'latin',
    ],
});

const Home = () => {
    const [ filter,            setFilter,            ] = useState<string>('');
    const [ inProgress,        setInProgress,        ] = useState<boolean>(false);
    const [ showSelected,      setShowSelected,      ] = useState<boolean>(false);

    const { locale, } = useAppSelector(state => state.preferences);

    const dispatch = useAppDispatch();
    const theme    = useTheme();
    const router   = useRouter();

    const { t, } = useTranslation();

    const locales : Record<string, string> = t('app.locales', {
        returnObjects : true,
    });

    const features : Feature[] = [
        {
            icon        : <ShoppingCartIcon />,
            title       : t('section.overview.feature.1.title'),
            description : t('section.overview.feature.1.description'),
        },
        {
            icon        : <PrecisionManufacturingIcon />,
            title       : t('section.overview.feature.2.title'),
            description : t('section.overview.feature.2.description'),
        },
        {
            icon        : <RepeatIcon />,
            title       : t('section.overview.feature.3.title'),
            description : t('section.overview.feature.3.description'),
        },
    ];

    const handleLanguageChange = useCallback((language : string) => dispatch(setLocale(Object.keys(locales).find(key => locales[key] === language) || 'en')), [ setLocale, ]);

    const handleStatusChange = useCallback((isInProgress : boolean) => setInProgress(isInProgress), [ setInProgress, ]);

    const handleSearch = useCallback((keyword? : string) => setFilter(keyword || ''), [ setFilter, ]);

    const handleToggleShowSelected = () => setShowSelected(!showSelected);

    const handleClick = () => {
        router.push('/packages').catch(handleError);
    };

    return (
        <Fragment>
            <Screen display={filter ? 'none' : 'block'}>
                <TopBar>
                    <Branding>
                        <Image
                            width={36}
                            height={36}
                            src='/logo.webp'
                            alt='logo' />
                        <Typography
                            marginX={1}
                            variant='h5'
                            fontFamily={inconsolata.style.fontFamily}
                            fontWeight={600}>
                            {t('app.name')}
                        </Typography>
                    </Branding>
                    <LanguageChoice
                        sx={{
                            margin : 1,
                        }}
                        selected={locales[locale]}
                        languages={(i18n?.languages || []).map(language => locales[language])}
                        onChange={handleLanguageChange} />
                    <CallToAction
                        icon={<RocketLaunchIcon />}
                        onClick={handleClick}>
                        <Typography fontWeight='bold'>
                            {t('action.cta')}
                        </Typography>
                    </CallToAction>
                </TopBar>
                <Section background='linear-gradient(145deg, rgba(245,127,23,0.3), rgba(255,213,79,0) 50%), linear-gradient(200deg, rgba(25,118,210,0.2), rgba(79,195,247,0) 45%), linear-gradient(315deg, rgba(56,142,60,0.2), rgba(174,213,129,0) 45%)'>
                    <SectionTitle
                        marginX={12}
                        marginTop={16}
                        variant='h2'>
                        {t('section.landing.title')}
                    </SectionTitle>
                    <SectionDescription
                        marginBottom={8}
                        variant='h4'>
                        {t('section.landing.description')}
                    </SectionDescription>
                    <SectionContent>
                        {!filter && (
                            <Box marginBottom={16}>
                                <FilteredSearchBox
                                    isLoading={inProgress}
                                    hint={t<string>('hint.search')}
                                    onSearch={handleSearch} />
                            </Box>
                        )}
                    </SectionContent>
                </Section>
                <Section
                    background='#fafafa'
                    layout='right'>
                    <SectionName
                        marginX={4}
                        marginTop={16}>
                        {t('section.overview.name')}
                    </SectionName>
                    <SectionTitle marginX={4}>{t('section.overview.title')}</SectionTitle>
                    <SectionDescription marginX={4}>{t('section.overview.description')}</SectionDescription>
                    <SectionForeground>
                        <Grid
                            container
                            marginY={8}
                            spacing={2}
                            alignItems='stretch'
                            justifyContent='flex-end'>
                            {features.map(feature => (
                                <Grid
                                    item
                                    key={feature.title}
                                    sm={12}
                                    md={4}>
                                    <Paper sx={{
                                        height   : '100%',
                                        ':hover' : {
                                            boxShadow : 4,
                                        },
                                    }}>
                                        <Box
                                            padding={2}
                                            display='flex'
                                            flexDirection='column'>
                                            <Avatar
                                                sx={{
                                                    width           : 48,
                                                    height          : 48,
                                                    backgroundColor : theme.palette.primary.light,
                                                }}
                                                alt={feature.title}>
                                                {feature.icon}
                                            </Avatar>
                                            <Typography
                                                gutterBottom
                                                marginTop={2}
                                                color='secondary'
                                                variant='h6'>
                                                {feature.title}
                                            </Typography>
                                            <Typography
                                                gutterBottom
                                                color='text.secondary'>
                                                {feature.description}
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </SectionForeground>
                </Section>
            </Screen>
            {filter && (
                <Box width='100%'>
                    <Container maxWidth='lg'>
                        <Box marginY={8}>
                            <FilteredSearchBox
                                isLoading={inProgress}
                                initialKeyword={filter}
                                hint={t<string>('hint.search')}
                                onSearch={handleSearch} />
                        </Box>
                        <Box
                            paddingX={2}
                            paddingBottom={8}>
                            <FilteredItemGrid
                                selectedOnly={showSelected}
                                filter={filter}
                                onStatusChange={handleStatusChange} />
                        </Box>
                    </Container>
                </Box>
            )}
        </Fragment>
    );
};

export { getServerSideProps, };

export default Home;
