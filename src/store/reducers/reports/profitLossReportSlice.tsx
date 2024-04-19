import { createSlice } from "@reduxjs/toolkit";
import {
  getBetProfitLoss,
  getCommissionBetPlaced,
  getCommissionMatch,
  getDomainProfitLoss,
  getSessionProfitLoss,
  getTotalProfitLoss,
  resetBetProfitLoss,
  resetDomainProfitLoss,
  resetSessionProfitLoss,
  updateUserSearchId,
} from "../../actions/reports";

interface InitialState {
  totalProfitLossList: any;
  domainProfitLossList: any;
  betProfitLossList: any;
  sessionProfitLossList: any;
  commissionMatchList: any;
  commissionBetPlacedList: any;
  loading: boolean;
  success: boolean;
  error: any;
  userData: any;
}

const initialState: InitialState = {
  totalProfitLossList: [],
  domainProfitLossList: [],
  betProfitLossList: [],
  sessionProfitLossList: [],
  commissionMatchList: [],
  commissionBetPlacedList: [],
  loading: false,
  success: false,
  error: null,
  userData: {},
};

const profitLossReportSlice = createSlice({
  name: "profitLossReport",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTotalProfitLoss.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getTotalProfitLoss.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.totalProfitLossList = action?.payload;
      })
      .addCase(getTotalProfitLoss.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getDomainProfitLoss.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getDomainProfitLoss.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.domainProfitLossList = action?.payload;
      })
      .addCase(getDomainProfitLoss.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getBetProfitLoss.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getBetProfitLoss.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.betProfitLossList = action?.payload;
      })
      .addCase(getBetProfitLoss.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getSessionProfitLoss.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getSessionProfitLoss.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.sessionProfitLossList = action?.payload;
      })
      .addCase(getSessionProfitLoss.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getCommissionMatch.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
        state.commissionMatchList = [];
      })
      .addCase(getCommissionMatch.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.commissionMatchList = action?.payload;
      })
      .addCase(getCommissionMatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getCommissionBetPlaced.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
        state.commissionBetPlacedList = [];
      })
      .addCase(getCommissionBetPlaced.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.commissionBetPlacedList = action?.payload;
      })
      .addCase(getCommissionBetPlaced.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(resetDomainProfitLoss, (state) => {
        state.domainProfitLossList = [];
      })
      .addCase(resetSessionProfitLoss, (state) => {
        state.sessionProfitLossList = [];
      })
      .addCase(resetBetProfitLoss, (state) => {
        state.betProfitLossList = [];
      })
      .addCase(updateUserSearchId.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.userData = action?.payload?.search;
      });
  },
});

export const profitLossReportReducer = profitLossReportSlice.reducer;
