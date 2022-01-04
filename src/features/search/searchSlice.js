import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageIndex: 0,
  searchContent: "",
  avgRating: 0,
  minPrice: 0,
  maxPrice: 10000,
  location: "",
  distance: 50,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state = action.payload;
    },
  },
});

export const { setSearch } = searchSlice.actions;

export default searchSlice.reducer;
