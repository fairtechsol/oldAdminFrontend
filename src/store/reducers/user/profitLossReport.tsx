import { createSlice } from "@reduxjs/toolkit";
import {
  getMatchWiseProfitLoss,
  getSessionProfitLoss,
  getTotalBetProfitLoss,
  getUserTotalProfitLoss,
} from "../../actions/user/userAction";

interface InitialState {
  matchWiseProfitLoss: [];
  userTotalProfitLoss: [];
  totalBetProfitLoss: [];
  totalSessionProfitLoss: [];
  success: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  matchWiseProfitLoss: [],
  userTotalProfitLoss: [],
  totalBetProfitLoss: [],
  totalSessionProfitLoss: [],
  loading: false,
  success: false,
  error: null,
};

const profitLossReportSlice = createSlice({
  name: "profitLossReport",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMatchWiseProfitLoss.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.matchWiseProfitLoss = [];
      })
      .addCase(getMatchWiseProfitLoss.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.matchWiseProfitLoss = action.payload;
      })
      .addCase(getMatchWiseProfitLoss.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getUserTotalProfitLoss.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.userTotalProfitLoss = [];
      })
      .addCase(getUserTotalProfitLoss.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userTotalProfitLoss = action.payload;
      })
      .addCase(getUserTotalProfitLoss.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getTotalBetProfitLoss.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.totalBetProfitLoss = [];
      })
      .addCase(getTotalBetProfitLoss.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.totalBetProfitLoss = action.payload;
      })
      .addCase(getTotalBetProfitLoss.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getSessionProfitLoss.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.totalSessionProfitLoss = [];
      })
      .addCase(getSessionProfitLoss.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.totalSessionProfitLoss = action.payload;
      })
      .addCase(getSessionProfitLoss.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const profitLossReportReducers = profitLossReportSlice.reducer;
