import { createSlice } from "@reduxjs/toolkit";
import {
  getUserProfitLoss,
  resetUserProfitLoss,
} from "../../actions/match/matchAction";

interface InitialState {
  userProfitLossData: any;
  loading: boolean;
  success: boolean;
  error: any;
}

const initialState: InitialState = {
  userProfitLossData: [],
  loading: false,
  success: false,
  error: null,
};

const userProfitLoss = createSlice({
  name: "userProfitLoss",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfitLoss.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getUserProfitLoss.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.userProfitLossData = action.payload;
      })
      .addCase(getUserProfitLoss.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(resetUserProfitLoss, (state) => {
        state.userProfitLossData = [];
      });
  },
});

export const userProfitLossReducer = userProfitLoss.reducer;
