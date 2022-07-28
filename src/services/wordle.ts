import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IGetWordQuery } from "../interfaces/wordle";

export const wordleApiSlice = createApi({
  reducerPath: "wordle",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://random-word-api.herokuapp.com/",
  }),
  tagTypes: ["Words"],
  endpoints: (builder) => ({
    getWord: builder.query<string[], IGetWordQuery>({
      query: (query) => `word?length=${query.length}&lang=es&number=1`,
      providesTags: ["Words"],
    }),
  }),
});

export const { useGetWordQuery } = wordleApiSlice;
