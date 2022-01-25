import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { baseApi } from "../api/base";
import postSlice from "../features/posts/postSlice";
import postsSlice from "../features/posts/postsSlice";
import searchSlice from "../features/search/searchSlice";
import ICOSlice from "../features/ICO/ICOSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    posts: postsSlice,
    post: postSlice,
    // user: userSlice,
    search: searchSlice,
    ICO: ICOSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);
