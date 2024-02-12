import { createSlice } from "@reduxjs/toolkit";
import {
  getPlacedBets,
  updateBetsPlaced,
} from "../../actions/match/matchAction";

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
        state.placedBets = action.payload?.rows;
        state.loading = false;
      })
      .addCase(getPlacedBets.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(updateBetsPlaced.fulfilled, (state, action) => {
        const { newBet, myStake, userName } = action.payload;
        const betId = action.payload.betId;
        const user = {
          userName: userName,
        };
        if (!state.placedBets.some((item: any) => item.id === betId)) {
          newBet.myStake = myStake;
          newBet.user = user;

          state.placedBets = [newBet, ...state.placedBets];
        }
      });
  },
});

export const betsReducer = betsSlice.reducer;
