import { createSlice, PayloadAction, } from '@reduxjs/toolkit';

import type { Item, } from '../types';

export type ShoppingCartState = {
    items : Item[],
};

const initialState : ShoppingCartState = {
    items : [],
};

export const shoppingCartSlice = createSlice({
    initialState,
    name     : 'shoppingCart',
    reducers : {
        addItem    : (state, action : PayloadAction<Item>) => ({
            ...state,
            items : [
                ...state.items,
                action.payload,
            ].sort((a, b) => a.id.localeCompare(b.id)),
        }),
        removeItem : (state, action : PayloadAction<Item>) => ({
            ...state,
            items : state.items.filter((item) => item.id !== action.payload.id),
        }),
        setItems  : (state, action : PayloadAction<Item[]>) => ({
            ...state,
            items : action.payload,
        }),
        reset     : () => initialState,
    },
});

export const { addItem, removeItem, reset, setItems, } = shoppingCartSlice.actions;

export const shoppingCartReducer = shoppingCartSlice.reducer;
