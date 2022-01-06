import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [{}],
};

export const topProductsSlice = createSlice({
  name: "topProducts",
  initialState,
  reducers: {
    setTopProducts: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setTopProducts } = topProductsSlice.actions;

export default topProductsSlice.reducer;
