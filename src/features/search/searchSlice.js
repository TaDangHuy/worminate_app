import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageIndex: 1,
  searchContent: "",
  filter: "No filter",
  category: "All categories",
  avgRating: null,
  minPrice: "",
  maxPrice: "",
  location: "",
  distance: 50,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setPageIndex: (state, action) => {
      state.pageIndex = action.payload;
    },
    setSearchContent: (state, action) => {
      state.searchContent = action.payload;
    },
    setOtherFilters: (state, action) => {
      state.pageIndex = 1;
      state.avgRating = action.payload.avgRating;
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
      state.location = action.payload.location;
      state.distance = action.payload.distance;
    },
    setFilter: (state, action) => {
      state.pageIndex = 1;
      state.filter = action.payload;
    },
    setCategory: (state, action) => {
      state.pageIndex = 1;
      state.category = action.payload;
    },
  },
});

export const {
  setSearchContent,
  setPageIndex,
  setFilter,
  setCategory,
  setOtherFilters,
} = searchSlice.actions;

export default searchSlice.reducer;
