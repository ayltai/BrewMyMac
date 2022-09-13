import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';

import type { HomebrewFormula, Item, } from '../models';

export const homebrewApi = createApi({
    reducerPath : 'homebrewApi',
    baseQuery   : fetchBaseQuery({
        baseUrl : 'https://formulae.brew.sh',
    }),
    endpoints   : build => ({
        formula : build.query<Item[], void>({
            query             : () => '/api/formula.json',
            transformResponse : (response : HomebrewFormula[]) => (response || []).map(formula => ({
                id          : String(formula.name),
                name        : String(formula.full_name || formula.name),
                description : formula.desc,
                source      : 'Homebrew',
            })),
        }),
        cask    : build.query<Item[], void>({
            query             : () => '/api/cask.json',
            transformResponse : (response : HomebrewFormula[]) => (response || []).map(formula => ({
                id          : String(formula.name),
                name        : String(formula.full_name || formula.name),
                description : formula.desc,
                source      : 'Homebrew-Cask',
            })),
        }),
    }),
});

export const { useCaskQuery, useFormulaQuery, } = homebrewApi;
