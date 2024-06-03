import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseUrl = "https://newsapi.org/v2/everything";

//GET https://newsapi.org/v2/everything?q=Apple&from=2024-05-22&sortBy=popularity&apiKey=API_KEY

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        `/?q=${newsCategory}&pageSize=${count}&excludeDomains=yahoo.com&language=en&apikey=${import.meta.env.VITE_NEWSAPI_KEY}`,
    }),
  }),
});

export const { useGetCryptoNewsQuery } = newsApi;
