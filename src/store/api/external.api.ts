import { OmdbGetItemResponse, OmdbSearchResponse, OmdbSearchResponseItem } from '../../models/external.model';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const externalApi = createApi({
  reducerPath: "externalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.omdbapi.com",
  }),
  endpoints: (builder) => ({
    search: builder.query<OmdbSearchResponseItem[], { search: string, page?: number }>({
      query: ({ search, page }) => ({
        url: '/',
        method: "GET",
        params: {
          apiKey: "310f8d44",
          s: search,
          p: page ?? 1,
        },
      }),
      transformResponse: (response: OmdbSearchResponse) => {
        return response.Search;
      }
    }),
    getItemById: builder.query<OmdbGetItemResponse, { id: string} >({
      query: ({ id }) => ({
        url: '/',
        method: "GET",
        params: {
          apiKey: "310f8d44",
          i: id,
        },
      })
    }),
  }),
});

export const { 
  useSearchQuery,
  useLazySearchQuery,
  useGetItemByIdQuery,
  useLazyGetItemByIdQuery,
} = externalApi;


