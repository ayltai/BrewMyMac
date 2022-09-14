import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';

import type { HomebrewFormula, Item, } from '../models';

const convert = (formula : HomebrewFormula) => ({
    id          : formula.token ? formula.token : Array.isArray(formula.name) ? formula.name[0] : formula.name || '',
    name        : formula.full_name ? formula.full_name : Array.isArray(formula.name) ? formula.name[0] : formula.name || formula.token || '',
    description : formula.desc,
});

export const homebrewApi = createApi({
    reducerPath : 'homebrewApi',
    baseQuery   : fetchBaseQuery({
        baseUrl : 'https://formulae.brew.sh',
    }),
    endpoints   : build => ({
        formula : build.query<Item[], void>({
            query             : () => '/api/formula.json',
            transformResponse : (response : HomebrewFormula[]) => (response || []).map(formula => ({
                ...convert(formula),
                source : 'Homebrew',
            })),
        }),
        cask    : build.query<Item[], void>({
            query             : () => '/api/cask.json',
            transformResponse : (response : HomebrewFormula[]) => (response || []).map(formula => ({
                ...convert(formula),
                source : 'Homebrew-Cask',
            })),
        }),
    }),
});

export const { useCaskQuery, useFormulaQuery, } = homebrewApi;
