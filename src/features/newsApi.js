import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const newsApiHeaders = {
  "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
  "X-RapidAPI-Host": "google-news13.p.rapidapi.com",
};

const baseUrl = "https://google-news13.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: newsApiHeaders });

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
      getCryptoNews: builder.query({
      query: (keyword) => createRequest(`/search?keyword=${keyword}&lr=en-US`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = newsApi;
