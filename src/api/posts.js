import { baseApi } from "./base";

const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (pageIndex) => `/posts?page=${pageIndex}`,
    }),
    getPost: builder.query({
      query: (postId) => `${postId}`,
    }),
  }),
});

export const { useGetPostsQuery, useGetPostQuery } = postsApi;
