import { Backdrop, Button, createTheme, CssBaseline, ThemeProvider, Typography, } from '@mui/material';
import { GA4React, } from 'ga-4-react';
import React, { useEffect, useMemo, } from 'react';
import { ErrorBoundary, } from 'react-error-boundary';
import { useTranslation, } from 'react-i18next';
import { Provider, } from 'react-redux';
import { PersistGate, } from 'redux-persist/integration/react';
import { useMediaQuery, } from 'usehooks-ts';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { useAppDispatch, } from './hooks';
import { persistor, reset, store, } from './redux';
import { Home, } from './screens';
import { palette, } from './styles';

const ErrorFallback = ({
    error,
    resetErrorBoundary,
} : {
    error              : Error,
    resetErrorBoundary : () => void,
}) => {
    const { t, } = useTranslation();

    return (
        <Backdrop open>
            <Typography variant='body1'>{t('error')}</Typography>
            <pre>{error.message}</pre>
            <Button onClick={resetErrorBoundary}>{t('action_try_again')}</Button>
        </Backdrop>
    );
};

const AppRoot = () => {
    const dispatch        = useAppDispatch();
    const ga              = process.env.REACT_APP_GA_TAG ? new GA4React(process.env.REACT_APP_GA_TAG) : undefined;
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme : dark)');

    const theme = useMemo(() => createTheme({
        palette : {
            ...palette,
            mode : prefersDarkMode ? 'dark' : 'light',
        },
    }), [ prefersDarkMode, ]);

    const handleError = (error : Error) => {
        if (ga) ga.event('Error', JSON.stringify(error), 'Error');
    };

    const handleReset = () => dispatch(reset());

    useEffect(() => {
        if (ga) ga.initialize().catch(handleError);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onError={handleError}
                onReset={handleReset}>
                <Home />
            </ErrorBoundary>
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
