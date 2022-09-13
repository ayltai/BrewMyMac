import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';

import type { Session, } from '../models';

export const sessionApi = createApi({
    reducerPath : 'sessionApi',
    baseQuery   : fetchBaseQuery({
        baseUrl : 'https://x8ki-letl-twmt.n7.xano.io',
    }),
    endpoints   : build => ({
        getSession : build.query<Session, string>({
            query : sessionId => `/api:bt-93slL/sessions/${sessionId}`,
        }),
    }),
});

export const { useGetSessionQuery, } = sessionApi;
