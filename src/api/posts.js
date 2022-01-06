import { baseApi } from "./base";

const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTopProducts: builder.query({
      query: ({ longitude, latitude }) =>
        `` +
        (longitude !== 105.8490039 && latitude !== 21.0085042
          ? `?location=[${longitude}, ${latitude}]`
          : ""),
    }),
    getCategory: builder.query({
      query: () => `/posts/new`,
    }),
    getPost: builder.query({
      query: (postId) => `${postId}`,
    }),
    getPosts: builder.query({
      query: ({
        pageIndex,
        searchContent,
        filter,
        category,
        avgRating,
        minPrice,
        maxPrice,
        location,
        distance,
      }) =>
        `/posts?page=${pageIndex}` +
        (searchContent !== "" ? `&search=${searchContent}` : "") +
        (filter !== "No filter" ? `&filter=${filter}` : "") +
        (category !== "All categories" ? `&category=${category}` : "") +
        (avgRating !== null ? `&avgRating[]=${avgRating}` : "") +
        (minPrice !== "" ? `&price[min]=${minPrice}` : "") +
        (maxPrice !== "" ? `&price[max]=${maxPrice}` : "") +
        (location !== "" ? `&location=${location}` : "") +
        (location !== "" && distance !== 50 ? `&distance=${distance}` : ""),
    }),
  }),
});

export const {
  useGetTopProductsQuery,
  useGetPostsQuery,
  useGetPostQuery,
  useGetCategoryQuery,
} = postsApi;
