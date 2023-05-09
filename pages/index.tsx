import { ArrowForwardIos as ArrowIcon, RocketLaunch as RocketLaunchIcon, } from '@mui/icons-material';
import { Box, Button, Typography, } from '@mui/material';
import { Inconsolata, } from 'next/font/google';
import Image from 'next/image';
import { useRouter, } from 'next/router';
import { i18n, useTranslation, } from 'next-i18next';
import React from 'react';

import { Branding, CallToAction, LanguageChoice, Screen, Section, SectionContent, SectionDescription, SectionForeground, SectionName, SectionTitle, Shortcut, TopBar, } from '../components';
import { useAppDispatch, useAppSelector, } from '../hooks';
import { setLocale, } from '../states';
import { handleError, } from '../utils';
import getServerSideProps from '../utils/getServerSideProps';

const inconsolata = Inconsolata({
    display : 'swap',
    subsets : [
        'latin',
    ],
});

const Home = () => {
    const { locale, } = useAppSelector(state => state.preferences);
    const dispatch = useAppDispatch();

    const router = useRouter();

    const { t, } = useTranslation();

    const locales : Record<string, string> = t('app.locales', {
        returnObjects : true,
    });

    const handleLanguageChange = (language : string) => dispatch(setLocale(Object.keys(locales).find(key => locales[key] === language) || 'en'));

    const handleClick = () => {
        router.push('/packages').catch(handleError);
    };

    return (
        <Screen>
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
            <Section background='linear-gradient(145deg, rgba(230,81,0,0.3), rgba(255,152,0,0) 55%), linear-gradient(200deg, rgba(2,136,209,0.2), rgba(79,195,247,0) 45%), linear-gradient(315deg, rgba(38,50,56,0.2), rgba(96,125,139,0) 35%)'>
                <SectionTitle
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
                    <Typography
                        marginBottom={2}
                        color='text.secondary'>
                        {t('section.landing.get-started')}
                    </Typography>
                    <Box marginBottom={16}>
                        <Button
                            color='primary'
                            variant='contained'
                            endIcon={<ArrowIcon />}>
                            <Typography fontWeight='bold'>
                                {t('action.get-started')}
                            </Typography>
                        </Button>
                    </Box>
                </SectionContent>
            </Section>
        </Screen>
    );
};

export { getServerSideProps, };

export default Home;
