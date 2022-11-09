import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

const cryptoApiHeaders = {
    'X-RapidAPI-Key': '9cd7400355mshd0a6982b9663453p136d71jsn01c26fc73bb1',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders});

export const createApi= ({
    reducerPath: 'crypto',
    baseQuery: fetchBaseQuery({ baseUrl  }),
    endpoints: (builder) => ({
        getStats: builder.query({
            query: () => createRequest('/coins')
        })
    })
})