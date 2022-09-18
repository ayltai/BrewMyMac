import { Backdrop, Button, createTheme, CssBaseline, ThemeProvider, Typography, } from '@mui/material';
import * as Sentry from '@sentry/react';
import { BrowserTracing, } from '@sentry/tracing';
import mixpanel from 'mixpanel-browser';
import React, { useMemo, } from 'react';
import { useTranslation, } from 'react-i18next';
import { Provider, } from 'react-redux';
import { PersistGate, } from 'redux-persist/integration/react';
import { useMediaQuery, } from 'usehooks-ts';
import '@fontsource/inconsolata/600.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { useAppDispatch, } from './hooks';
import { persistor, reset, store, } from './redux';
import { Home, } from './screens';
import { palette, } from './styles';

mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN!, {
    debug : process.env.NODE_ENV !== 'production',
});

Sentry.init({
    dsn          : process.env.REACT_APP_SENTRY_DSN,
    environment  : process.env.NODE_ENV,
    integrations : [
        new BrowserTracing(),
    ],
});

const ErrorFallback = ({
    error,
    resetError,
} : {
    error      : Error,
    resetError : () => void,
}) => {
    const dispatch = useAppDispatch();

    const { t, } = useTranslation();

    const handleReset = () => {
        dispatch(reset());

        resetError();
    };

    return (
        <Backdrop open>
            <Typography variant='body1'>{t('error')}</Typography>
            <pre>{error.message}</pre>
            <Button onClick={handleReset}>{t('action_try_again')}</Button>
        </Backdrop>
    );
};

const AppRoot = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme : dark)');

    const theme = useMemo(() => createTheme({
        palette : {
            ...palette,
            mode : prefersDarkMode ? 'dark' : 'light',
        },
    }), [ prefersDarkMode, ]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Sentry.ErrorBoundary
                showDialog
                fallback={ErrorFallback}>
                <Home />
            </Sentry.ErrorBoundary>
        </ThemeProvider>
    );
};

export const App = () => (
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <AppRoot />
        </PersistGate>
    </Provider>
);
