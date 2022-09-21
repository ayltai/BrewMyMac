import { combineReducers, configureStore, } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE, } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';

import { appStoreApi, homebrewApi, tweakApi, } from '../apis';

import { sessionReducer, } from './sessionSlice';

export const store = configureStore({
    reducer    : persistReducer({
        key       : 'root',
        blacklist : [
            appStoreApi.reducerPath,
            homebrewApi.reducerPath,
            tweakApi.reducerPath,
        ],
        storage   : sessionStorage,
    }, combineReducers({
        session                     : sessionReducer,
        [ appStoreApi.reducerPath ] : appStoreApi.reducer,
        [ homebrewApi.reducerPath ] : homebrewApi.reducer,
        [ tweakApi.reducerPath    ] : tweakApi.reducer,
    })),
    middleware : getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck : {
            ignoredActions : [
                FLUSH,
                PAUSE,
                PERSIST,
                PURGE,
                REGISTER,
                REHYDRATE,
            ],
        },
    }).concat(appStoreApi.middleware, homebrewApi.middleware, tweakApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export { addItem, removeItem, reset, setItems, sessionReducer, } from './sessionSlice';
