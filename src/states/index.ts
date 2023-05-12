import { combineReducers, configureStore, } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE, } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import { homebrewApi, } from '../apis';
import { preferencesSlice, } from './preferencesSlice';
import { shoppingCartSlice, } from './shoppingCartSlice';

const createNoopStorage = () => ({
    getItem    : () => Promise.resolve(null),
    setItem    : (_key : string, value : any) => Promise.resolve(value),
    removeItem : () => Promise.resolve(),
});

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const makeStore = () => configureStore({
    reducer    : persistReducer({
        storage,
        key       : 'root',
        blacklist : [
            homebrewApi.reducerPath,
        ],
        whitelist : [
            preferencesSlice.name,
            shoppingCartSlice.name,
        ],
    }, combineReducers({
        [preferencesSlice.name]   : preferencesSlice.reducer,
        [shoppingCartSlice.name]  : shoppingCartSlice.reducer,
        [homebrewApi.reducerPath] : homebrewApi.reducer,
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
    }).concat(homebrewApi.middleware),
    devTools   : process.env.NODE_ENV !== 'production',
});

export const store     = makeStore();
export const persistor = persistStore(store);

export type AppState    = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type { ShoppingCartState, } from './shoppingCartSlice';

export { preferencesReducer, setLocale, } from './preferencesSlice';
export { addItem, removeItem, reset, setItems, shoppingCartReducer, } from './shoppingCartSlice';
