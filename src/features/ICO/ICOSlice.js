import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contracts: {},
  tokenPrice: "1000000000000000",
  tokensSold: 0,
  tokensAvailable: 10000000,
  admin: "",
  currentAccount: "",
  currentBalance: 0,
};

export const ICOSlice = createSlice({
  name: "ICO",
  initialState,
  reducers: {
    setContracts: (state, action) => {
      state.contracts = action.payload;
    },
    setTokenPrice: (state, action) => {
      state.tokenPrice = action.payload;
    },
    setTokensSold: (state, action) => {
      state.tokensSold = action.payload;
    },
    setTokensAvailable: (state, action) => {
      state.tokensAvailable = action.payload;
    },
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    setCurrentAccount: (state, action) => {
      state.currentAccount = action.payload;
    },
    setCurrentBalance: (state, action) => {
      state.currentBalance = action.payload;
    },
  },
});

export const {
  setContracts,
  setTokenPrice,
  setTokensSold,
  setTokensAvailable,
  setAdmin,
  setCurrentAccount,
  setCurrentBalance,
} = ICOSlice.actions;

export default ICOSlice.reducer;
