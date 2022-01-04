import { baseApi } from "./base";

const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (pageIndex) => `/posts?page=${pageIndex}`,
    }),
    getTopProduct: builder.query({
      query: (pageIndex) => `/posts?page=${pageIndex}`,
    }),
    searchPosts: builder.query({
      query: (content) => `/posts?search=${content}`,
    }),
    getCategory: builder.query({
      query: () => `/posts/new`,
    }),
    getPost: builder.query({
      query: (postId) => `${postId}`,
    }),
    takePosts: builder.query({
      query: ({
        pageIndex,
        searchContent,
        avgRating,
        minPrice,
        maxPrice,
        location,
        distance,
      }) =>
        `/posts?page=${pageIndex}` + searchContent !== "" &&
        `&search=${searchContent}` + avgRating !== 0 &&
        `&avgRating[]=${avgRating}` + minPrice !== 0 &&
        `&price[min]=${minPrice}` + maxPrice !== 10000 &&
        `&price[max]=${maxPrice}` + location !== "" &&
        `&location=${location}` + distance !== 50 &&
        `&distance=${distance}`,
    }),
  }),
});

export const {
  useGetPostsQuery,
  useSearchPostsQuery,
  useGetPostQuery,
  useGetCategoryQuery,
  useTakePostsQuery,
} = postsApi;
