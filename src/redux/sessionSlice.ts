import { createSlice, PayloadAction, } from '@reduxjs/toolkit';

import type { Item, } from '../models';

type SessionState = {
    items : Item[],
};

const initialState : SessionState = {
    items : [],
};

const sessionSlice = createSlice({
    initialState,
    name     : 'session',
    reducers : {
        addItem    : (state, action : PayloadAction<Item>) => ({
            items : [
                ...state.items,
                action.payload,
            ].sort((left, right) => left.id.localeCompare(right.id)),
        }),
        removeItem : (state, action : PayloadAction<Item>) => ({
            items : state.items.filter(item => item.id !== action.payload.id),
        }),
        setItems   : (state, action : PayloadAction<Item[]>) => ({
            items : action.payload,
        }),
        reset      : () => initialState,
    },
});

export const { addItem, removeItem, reset, setItems, } = sessionSlice.actions;

export const sessionReducer = sessionSlice.reducer;
