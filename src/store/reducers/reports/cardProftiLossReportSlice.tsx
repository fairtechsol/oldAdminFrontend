import { createSlice } from "@reduxjs/toolkit";
import {
  getBetProfitLossCards,
  getMatchWiseProfitLossCards,
  getUserTotalProfitLossCards,
  getUserWiseProfitLossCards,
  resetBetProfitLossCard,
  resetDomainProfitLossCard,
  resetSessionProfitLossCard,
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
      })
      .addCase(getUserWiseProfitLossCards.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })

      .addCase(getUserWiseProfitLossCards.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.userWiseProfitLossListCards = action?.payload;
      })
      .addCase(getUserWiseProfitLossCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      // .addCase(getTotalBetProfitLossForModal.pending, (state) => {
      //   state.loading = true;
      //   state.success = false;
      //   state.totalBetProfitLossModalCard = [];
      // })
      // .addCase(getTotalBetProfitLossForModal.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.success = true;
      //   state.totalBetProfitLossModalCard = action?.payload;
      // })
      // .addCase(getSessionProfitLoss.pending, (state) => {
      //   state.loading = false;
      //   state.success = false;
      //   state.error = null;
      //   state.sessionProfitLossListCard = [];
      // })
      // .addCase(getSessionProfitLoss.fulfilled, (state, action) => {
      //   state.success = true;
      //   state.loading = false;
      //   state.sessionProfitLossListCard = action?.payload;
      // })
      // .addCase(getSessionProfitLoss.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action?.error?.message;
      // })
      // .addCase(getCommissionMatch.pending, (state) => {
      //   state.loading = false;
      //   state.success = false;
      //   state.error = null;
      //   state.commissionMatchListCard = [];
      // })
      // .addCase(getCommissionMatch.fulfilled, (state, action) => {
      //   state.success = true;
      //   state.loading = false;
      //   state.commissionMatchListCard = action?.payload;
      // })
      // .addCase(getCommissionMatch.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action?.error?.message;
      // })
      // .addCase(getCommissionBetPlaced.pending, (state) => {
      //   state.loading = false;
      //   state.success = false;
      //   state.error = null;
      //   state.commissionBetPlacedListCard = [];
      // })
      // .addCase(getCommissionBetPlaced.fulfilled, (state, action) => {
      //   state.success = true;
      //   state.loading = false;
      //   state.commissionBetPlacedListCard = action?.payload;
      // })
      // .addCase(getCommissionBetPlaced.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action?.error?.message;
      // })
      .addCase(resetDomainProfitLossCard, (state) => {
        return { ...state, domainProfitLossList: [] };
      })
      .addCase(resetSessionProfitLossCard, (state) => {
        return { ...state, sessionProfitLossList: [] };
      })
      .addCase(resetBetProfitLossCard, (state) => {
        return { ...state, betProfitLossList: [] };
      });
    // .addCase(updateUserSearchId.fulfilled, (state, action) => {
    //   state.success = true;
    //   state.loading = false;
    //   state.user = action?.payload?.search;
    // })
    // .addCase(resetUpdateUserSearchId, (state) => {
    //   return { ...state, user: {} };
    // });
  },
});

export const profitLossReportCardReducer = profitLossReportCardSlice.reducer;
