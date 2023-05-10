import { createSlice, PayloadAction, } from '@reduxjs/toolkit';
import { i18n, } from 'next-i18next';

import { handleError, } from '../utils';

type PreferencesState = {
    locale : string,
};

const initialState : PreferencesState = {
    locale : i18n?.language || 'en',
};

export const preferencesSlice = createSlice({
    initialState,
    name     : 'preferences',
    reducers : {
        setLocale : (state, action : PayloadAction<string>) => {
            state.locale = action.payload;

            i18n?.changeLanguage(action.payload).catch(handleError);
        },
    },
});

export const { setLocale, } = preferencesSlice.actions;

export const preferencesReducer = preferencesSlice.reducer;
