import { createTheme, ThemeProvider, } from '@mui/material';
import { configureStore, PreloadedState, Store, } from '@reduxjs/toolkit';
import '@testing-library/jest-dom/extend-expect';
import { act, render, } from '@testing-library/react';
import React, { ReactNode, } from 'react';
import { Provider, } from 'react-redux';

import { appStoreApi, homebrewApi, tweakApi, } from '../apis';
import type { AppStoreSearchResults, HomebrewFormula, Tweak, } from '../models';
import { sessionReducer, store as reduxStore, } from '../redux';
import { palette, } from '../styles';

const INITIAL_FILTER = 'firefox';

export const mockApis = async () => {
    const HOMEBREW_API_RESPONSE : HomebrewFormula[] = [
        {
            token     : `${INITIAL_FILTER} homebrew token`,
            name      : [
                `${INITIAL_FILTER} homebrew name`,
            ],
            full_name : `${INITIAL_FILTER} homebrew full name`,
        },
    ];

    const HOMEBREW_CAST_API_RESPONSE : HomebrewFormula[] = [
        {
            token     : `${INITIAL_FILTER} homebrew cask token`,
            name      : [
                `${INITIAL_FILTER} homebrew cask name`,
            ],
            full_name : `${INITIAL_FILTER} homebrew cask full name`,
        },
    ];

    const TWEAKS_API_RESPONSE : Tweak[] = [
        {
            id   : '2',
            name : `${INITIAL_FILTER} tweak name`,
        },
    ];

    const APP_STORE_API_RESPONSE : AppStoreSearchResults = {
        resultCount : 1,
        results     : [
            {
                trackId   : '1',
                trackName : `${INITIAL_FILTER} app store name`,
            },
        ],
    };

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

        if (request.url.startsWith('https://raw.githubusercontent.com')) {
            return Promise.resolve({
                status : 200,
                body   : JSON.stringify(TWEAKS_API_RESPONSE),
            });
        }

        if (request.url.startsWith('https://search-itunes.vercel.app')) {
            return Promise.resolve({
                status : 200,
                body   : JSON.stringify(APP_STORE_API_RESPONSE),
            });
        }

        return Promise.resolve({
            status : 404,
        });
    });

    await act(async () => {
        await reduxStore.dispatch(homebrewApi.endpoints.formula.initiate());
        await reduxStore.dispatch(homebrewApi.endpoints.cask.initiate());
        await reduxStore.dispatch(tweakApi.endpoints.getTweaks.initiate());
        await reduxStore.dispatch(appStoreApi.endpoints.search.initiate(`${INITIAL_FILTER} app store name`));
    });
};

const createStore = (preloadedState? : Record<string, any>) => configureStore({
    reducer : {
        session : sessionReducer,
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
