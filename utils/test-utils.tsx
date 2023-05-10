import { createTheme, ThemeProvider, } from '@mui/material/styles';
import { configureStore, PreloadedState, Store, } from '@reduxjs/toolkit';
import '@testing-library/jest-dom/extend-expect';
import { render, } from '@testing-library/react';
import React, { ReactNode, } from 'react';
import { Provider, } from 'react-redux';

import { preferencesReducer, } from '../states';
import { palette, } from '../styles';

const createStore = (preloadedState? : Record<string, any>) => configureStore({
    reducer : {
        preferences : preferencesReducer,
    },
    preloadedState,
});

const defaultStore = createStore();

type RootState = ReturnType<typeof defaultStore.getState>;

const customRender = (ui : any, {
    preloadedState,
    store = createStore(preloadedState),
    ...rest
} : {
    preloadedState?   : PreloadedState<RootState>,
    store?            : Store<RootState>,
    [ rest : string ] : any,
} = {}) => render(ui, {
    wrapper : ({
        children,
    } : {
        children : ReactNode,
    }) => {
        const theme = createTheme({
            palette : {
                ...palette,
                mode : 'light',
            },
        });

        return (
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    {children}
                </ThemeProvider>
            </Provider>
        );
    },
    ...rest,
});

export * from '@testing-library/react';

export { customRender as render, };
