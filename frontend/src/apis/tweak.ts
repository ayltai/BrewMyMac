import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';

import type { Item, Tweak, } from '../models';

export const tweakApi = createApi({
    reducerPath : 'tweakApi',
    baseQuery   : fetchBaseQuery({
        baseUrl : 'https://raw.githubusercontent.com',
    }),
    endpoints   : build => ({
        getTweaks   : build.query<Item[], void>({
            query             : () => '/ayltai/ansible-macos-tweaks/master/tweaks.json',
            transformResponse : (response : Tweak[]) => (response || []).map(tweak => ({
                id          : `${tweak.id}`,
                name        : tweak.name,
                description : tweak.description,
                author      : tweak.author,
                parameter   : tweak.defaultValue,
                source      : 'Tweak',
            })),
        }),
        getPlaybook : build.query<string, void>({
            query : () => '/ayltai/ansible-macos-tweaks/master/playbook.yml',
        }),
    }),
});

export const { useGetPlaybookQuery, useGetTweaksQuery, } = tweakApi;
