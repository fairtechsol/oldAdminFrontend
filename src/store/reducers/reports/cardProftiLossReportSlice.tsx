import { createSlice } from "@reduxjs/toolkit";
import {
  getBetProfitLossCards,
  getMatchWiseProfitLossCards,
  getUserTotalProfitLossCards,
} from "../../actions/reports";

interface InitialState {
  totalProfitLossListCard: any;
  domainProfitLossListCard: any;
  betProfitLossListCards: any;
  sessionProfitLossListCard: any;
  totalBetProfitLossModalCard: any;
  commissionMatchListCard: any;
  commissionBetPlacedListCard: any;
  loading: boolean;
  success: boolean;
  error: any;
  user: any;
  matchWiseProfitLossCard: any;
  matchWiseProfitLossCountCard: any;
  userWiseProfitLossListCards: any;
}

const initialState: InitialState = {
  totalProfitLossListCard: [],
  domainProfitLossListCard: [],
  betProfitLossListCards: [],
  sessionProfitLossListCard: [],
  totalBetProfitLossModalCard: [],
  commissionMatchListCard: [],
  commissionBetPlacedListCard: [],
  loading: false,
  success: false,
  error: null,
  user: {},
  matchWiseProfitLossCard: [],
  matchWiseProfitLossCountCard: 0,
  userWiseProfitLossListCards: [],
};

const profitLossReportCardSlice = createSlice({
  name: "profitLossReportCard",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserTotalProfitLossCards.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.totalProfitLossListCard = [];
        state.error = null;
      })
      .addCase(getUserTotalProfitLossCards.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.totalProfitLossListCard = action?.payload;
      })
      .addCase(getUserTotalProfitLossCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getMatchWiseProfitLossCards.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.matchWiseProfitLossCard = [];
        state.matchWiseProfitLossCountCard = 0;
      })
      .addCase(getMatchWiseProfitLossCards.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.matchWiseProfitLossCard = action?.payload?.result;
        state.matchWiseProfitLossCountCard = action?.payload?.count;
      })
      .addCase(getMatchWiseProfitLossCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getBetProfitLossCards.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.betProfitLossListCards = [];
        state.error = null;
      })
      .addCase(getBetProfitLossCards.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.betProfitLossListCards = action?.payload;
      })
      .addCase(getBetProfitLossCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const profitLossReportCardReducer = profitLossReportCardSlice.reducer;
