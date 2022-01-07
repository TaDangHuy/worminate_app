import { baseApi } from "./base";

const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTopProducts: builder.query({
      query: (location) =>
        typeof location === "object" &&
        location[0] !== 105.8490039 &&
        location[1] !== 21.0085042
          ? `?location=[${location[0]}, ${location[1]}]`
          : location !== ""
          ? `?location=${location}`
          : "",
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
        (filter === "Newest" ? `&sortby=0` : "") +
        (filter === "Oldest" ? `&sortby=1` : "") +
        (filter === "Lowest price" ? `&sortby=2` : "") +
        (filter === "Highest price" ? `&sortby=3` : "") +
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
