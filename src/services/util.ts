import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICountry } from "../interfaces/general";

export const utilSlice = createApi({
  reducerPath: "util",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),
  tagTypes: ["Countries"],
  endpoints: (builder) => ({
    getCountries: builder.query<ICountry[], void>({
      query: () => "https://restcountries.com/v2/all",
      providesTags: ["Countries"],
    }),
  }),
});

export const { useGetCountriesQuery, useLazyGetCountriesQuery } = utilSlice;
