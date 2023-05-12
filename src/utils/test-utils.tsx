import { createTheme, ThemeProvider, } from '@mui/material/styles';
import { configureStore, PreloadedState, Store, } from '@reduxjs/toolkit';
import '@testing-library/jest-dom/extend-expect';
import { act, render, } from '@testing-library/react';
import React, { ReactNode, } from 'react';
import { Provider, } from 'react-redux';

import { homebrewApi, } from '../apis';
import { preferencesReducer, shoppingCartReducer, store as reduxStore, } from '../states';
import { palette, } from '../styles';

import type { HomebrewFormula, } from '../types';

const INITIAL_FILTER = 'firefox';

export const mockApis = async () => {
    const HOMEBREW_API_RESPONSE : HomebrewFormula[] = [
        {
            token     : `${INITIAL_FILTER} homebrew token`,
            name      : [
                `${INITIAL_FILTER} homebrew name`,
            ],
            full_name : `${INITIAL_FILTER} homebrew full name`,
            bottle    : {},
        },
    ];

    const HOMEBREW_CAST_API_RESPONSE : HomebrewFormula[] = [
        {
            token     : `${INITIAL_FILTER} homebrew cask token`,
            name      : [
                `${INITIAL_FILTER} homebrew cask name`,
            ],
            full_name : `${INITIAL_FILTER} homebrew cask full name`,
            bottle    : {},
        },
    ];

    fetchMock.doMock(request => {
        if (request.url.startsWith('https://formulae.brew.sh/api/formula.json')) {
            return Promise.resolve({
                status : 200,
                body   : JSON.stringify(HOMEBREW_API_RESPONSE),
            });
        }

        if (request.url.startsWith('https://formulae.brew.sh/api/cask.json')) {
            return Promise.resolve({
                status : 200,
                body   : JSON.stringify(HOMEBREW_CAST_API_RESPONSE),
            });
        }

        return Promise.resolve({
            status : 404,
        });
    });

    await act(async () => {
        await reduxStore.dispatch(homebrewApi.endpoints.formula.initiate());
        await reduxStore.dispatch(homebrewApi.endpoints.cask.initiate());
    });
};

const createStore = (preloadedState? : Record<string, any>) => configureStore({
    reducer : {
        preferences  : preferencesReducer,
        shoppingCart : shoppingCartReducer,
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
