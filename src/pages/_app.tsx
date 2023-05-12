import { CacheProvider, EmotionCache, } from '@emotion/react';
import { CssBaseline, } from '@mui/material';
import { createTheme, ThemeProvider, } from '@mui/material/styles';
import Head from 'next/head';
import { AppProps, } from 'next/app';
import { appWithTranslation, } from 'next-i18next';
import React from 'react';
import { Provider, } from 'react-redux';
import { PersistGate, } from 'redux-persist/integration/react';

import nextI18NextConfig from '../../next-i18next.config.js'
import { persistor, store, } from '../states';
import { components, palette, typography, } from '../styles';
import { createEmotionCache, } from '../utils';

const clientSideEmotionCache = createEmotionCache();

export interface CustomAppProps extends AppProps {
    emotionCache? : EmotionCache,
}

const App = ({
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
} : CustomAppProps) => {
    const theme = createTheme({
        palette : {
            ...palette,
            mode : 'light',
        },
        shape   : {
            borderRadius : 24,
        },
        components,
        typography,
    });

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <CacheProvider value={emotionCache}>
                    <Head>
                        <meta charSet='utf-8' />
                        <title>BrewMyMac</title>
                        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
                        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
                        <link rel='mask-icon' color='#5bbad5' href='/safari-pinned-tab.svg' />
                    </Head>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Component {...pageProps} />
                    </ThemeProvider>
                </CacheProvider>
            </PersistGate>
        </Provider>
    );
};

export default appWithTranslation(App, nextI18NextConfig);
