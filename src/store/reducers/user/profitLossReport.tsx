import { createSlice } from "@reduxjs/toolkit";
import {
  getMatchWiseProfitLoss,
  getTotalBetProfitLoss,
  getTotalBetProfitLossForModal,
  getUserTotalProfitLoss,
} from "../../actions/user/userAction";

interface InitialState {
  matchWiseProfitLoss: any;
  matchWiseProfitLossCount: any;
  userTotalProfitLoss: any;
  totalBetProfitLoss: any;
  totalSessionProfitLoss: any;
  totalBetProfitLossModal: any;
  success: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  matchWiseProfitLoss: [],
  matchWiseProfitLossCount: 0,
  userTotalProfitLoss: [],
  totalBetProfitLoss: [],
  totalBetProfitLossModal: [],
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
        state.matchWiseProfitLossCount = 0;
      })
      .addCase(getMatchWiseProfitLoss.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.matchWiseProfitLoss = action.payload?.result;
        state.matchWiseProfitLossCount = action.payload?.count;
      })
      .addCase(getMatchWiseProfitLoss.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
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
        state.error = action.error?.message;
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
        state.error = action.error?.message;
      })
      .addCase(getTotalBetProfitLossForModal.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.totalBetProfitLossModal = [];
      })
      .addCase(getTotalBetProfitLossForModal.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.totalBetProfitLossModal = action.payload;
      })
      .addCase(getTotalBetProfitLossForModal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      });
  },
});

export const profitLossReportReducers = profitLossReportSlice.reducer;
