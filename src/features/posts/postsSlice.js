import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
    {
      _id: {},
      properties: {},
      reviews: [],
      avgRating: 5,
      title: "",
      description: "",
      location: "",
      geometry: {},
      price: 0,
      author: {},
      images: [],
      __v: 0,
    },
  ],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setPosts } = postsSlice.actions;

export default postsSlice.reducer;
