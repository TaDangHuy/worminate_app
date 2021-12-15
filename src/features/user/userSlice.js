import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
      fullName: "",
      email: "",
      admin: false,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
