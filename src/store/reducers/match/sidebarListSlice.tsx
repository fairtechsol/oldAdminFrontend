import { createSlice } from "@reduxjs/toolkit";
import {
  AllBetDelete,
  getCompetitionDates,
  getCompetitionList,
  getCompetitionMatches,
  resetCompetitionDates,
  resetCompetitionMatches,
  resetcompetitionList,
} from "../../actions/match/matchAction";

interface InitialState {
  competitionList: Array<object>;
  competitionDates: Array<object>;
  betDeleteAll: Array<object>;
  competitionMatches: Array<object>;
  loading: boolean;
  success: boolean;
  error: any;
}

const initialState: InitialState = {
  competitionList: [],
  competitionDates: [],
  betDeleteAll: [],
  competitionMatches: [],
  loading: false,
  success: false,
  error: null,
};

const sidebarListSlice = createSlice({
  name: "sidebar",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCompetitionList.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getCompetitionList.fulfilled, (state, action) => {
        state.success = true;
        state.competitionList = action.payload;
        state.loading = false;
      })
      .addCase(getCompetitionList.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getCompetitionDates.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getCompetitionDates.fulfilled, (state, action) => {
        state.success = true;
        state.competitionDates = action.payload;
        state.loading = false;
      })
      .addCase(getCompetitionDates.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(AllBetDelete.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(AllBetDelete.fulfilled, (state, action) => {
        state.success = true;
        state.betDeleteAll = action.payload;
        state.loading = false;
      })
      .addCase(AllBetDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getCompetitionMatches.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getCompetitionMatches.fulfilled, (state, action) => {
        state.success = true;
        state.competitionMatches = action.payload;
        state.loading = false;
      })
      .addCase(getCompetitionMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(resetcompetitionList, (state) => {
        return { ...state, competitionList: [] };
      })
      .addCase(resetCompetitionDates, (state) => {
        return { ...state, competitionDates: [] };
      })
      .addCase(resetCompetitionMatches, (state) => {
        return { ...state, competitionMatches: [] };
      });
  },
});

export const sidebarListReducer = sidebarListSlice.reducer;
