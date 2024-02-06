import { createSlice } from "@reduxjs/toolkit";
import {
  analysisListReset,
  getAnalysisList,
  getMultipleMatchDetail,
  updateMultipleMatchDetail,
} from "../../actions/match/matchAction";

interface InitialState {
  analysisList: any;
  multipleMatchDetail: any;
  success: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  analysisList: [],
  multipleMatchDetail: [],
  loading: false,
  success: false,
  error: null,
};

const analysisListSlice = createSlice({
  name: "analysisList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnalysisList.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getAnalysisList.fulfilled, (state, action) => {
        state.analysisList = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getAnalysisList.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getMultipleMatchDetail.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getMultipleMatchDetail.fulfilled, (state, action) => {
        state.multipleMatchDetail = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getMultipleMatchDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(updateMultipleMatchDetail.fulfilled, (state, action) => {
        state.multipleMatchDetail = state.multipleMatchDetail.map(
          (match: any) => {
            if (match?.id === action.payload?.id) {
              const {
                apiSession,
                apiTiedMatch,
                bookmaker,
                manualTideMatch,
                marketCompleteMatch,
                matchOdd,
                quickbookmaker,
                sessionBettings,
              } = action.payload;
              return {
                ...match,
                apiSession: apiSession,
                apiTideMatch: apiTiedMatch,
                bookmaker: bookmaker,
                manualTiedMatch: manualTideMatch,
                marketCompleteMatch: marketCompleteMatch,
                matchOdd: matchOdd,
                quickBookmaker: quickbookmaker,
                sessionBettings: sessionBettings,
              };
            } else {
              return match;
            }
          }
        );
      })
      .addCase(analysisListReset, (state) => {
        return { ...state, success: false };
      });
  },
});

export const analysisListReducer = analysisListSlice.reducer;
