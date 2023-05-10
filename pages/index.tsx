import { RocketLaunch as RocketLaunchIcon, } from '@mui/icons-material';
import { Box, Typography, } from '@mui/material';
import { Inconsolata, } from 'next/font/google';
import Image from 'next/image';
import { useRouter, } from 'next/router';
import { i18n, useTranslation, } from 'next-i18next';
import React from 'react';

import { Branding, CallToAction, FilteredSearchBox, LanguageChoice, Screen, Section, SectionContent, SectionDescription, SectionForeground, SectionName, SectionTitle, Shortcut, TopBar, } from '../components';
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
            <Section background='linear-gradient(145deg, rgba(255,224,130,0.3), rgba(255,224,130,0) 55%), linear-gradient(200deg, rgba(255,87,34,0.2), rgba(251,233,231,0) 45%), linear-gradient(315deg, rgba(0,150,136,0.2), rgba(178,223,219,0) 35%)'>
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
                    <Box marginBottom={16}>
                        <FilteredSearchBox
                            hint={t<string>('hint.search')} />
                    </Box>
                </SectionContent>
            </Section>
        </Screen>
    );
};

export { getServerSideProps, };

export default Home;
