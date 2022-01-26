import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shrouded-taiga-91101.herokuapp.com/api/",
  }),
  endpoints: () => ({}),
});
