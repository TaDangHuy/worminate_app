import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shielded-sands-12116.herokuapp.com/api/",
  }),
  endpoints: () => ({}),
});
