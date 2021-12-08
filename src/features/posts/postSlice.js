import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducer: {
    setPost: (state, action) => {
      console.log(action.payload);
      //   state.value = action.payload;
    },
    deletePost: (state, action) => {
      return state.map((post) => post["_id"] !== action.payload);
    },
  },
});

const { reducer, actions } = postSlice;
export const { setPost, deletePost } = actions;

export default reducer;
