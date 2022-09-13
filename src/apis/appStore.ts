import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';

import type { AppStoreSearchResults, Item, } from '../models';

export const appStoreApi = createApi({
    reducerPath : 'appStoreApi',
    baseQuery   : fetchBaseQuery({
        baseUrl : 'https://search-itunes.vercel.app',
    }),
    endpoints   : build => ({
        search : build.query<Item[], string>({
            query             : keyword => `/?media=software&entity=macSoftware&term=${keyword}`,
            transformResponse : (response : AppStoreSearchResults) => (response?.results || []).map(result => ({
                id          : String(result.trackId),
                name        : String(result.trackName),
                description : result.description,
                imageUrl    : result.artworkUrl512 || result.artworkUrl100 || result.artworkUrl60,
                author      : result.artistName,
                source      : 'App Store',
            })),
        }),
    }),
});

export const { useSearchQuery, } = appStoreApi;
