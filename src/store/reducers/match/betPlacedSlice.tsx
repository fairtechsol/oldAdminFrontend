import { createSlice } from "@reduxjs/toolkit";
import { getPlacedBets } from "../../actions/match/matchAction";

interface InitialState {
  placedBets: Array<object>;
  loading: boolean;
  success: boolean;
  error: any;
}

const initialState: InitialState = {
  placedBets: [],
  loading: false,
  success: false,
  error: null,
};

const betsSlice = createSlice({
  name: "bets",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlacedBets.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getPlacedBets.fulfilled, (state, action) => {
        state.success = true;
        state.placedBets = action.payload;
        state.loading = false;
      })
      .addCase(getPlacedBets.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const betsReducer = betsSlice.reducer;
