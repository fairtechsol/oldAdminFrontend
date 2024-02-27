import { createSlice } from "@reduxjs/toolkit";
import {
  getPlacedBets,
  getSessionProLoss,
  getSessionProfitLossMatchDetailFilter,
  updateBetsPlaced,
  updateProfitLoss,
} from "../../actions/match/matchAction";

interface InitialState {
  placedBets: Array<object>;
  sessionProLoss: Array<object>;
  loadingProLoss: boolean;
  successProLoss: boolean;
  loading: boolean;
  success: boolean;
  error: any;
}

const initialState: InitialState = {
  placedBets: [],
  sessionProLoss: [],
  loadingProLoss: false,
  successProLoss: false,
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
      })
      .addCase(getSessionProLoss.pending, (state) => {
        state.loadingProLoss = true;
        state.successProLoss = false;
        state.error = null;
      })
      .addCase(getSessionProLoss.fulfilled, (state, action) => {
        state.loadingProLoss = false;
        state.successProLoss = true;
        const idToAdd = action.payload?.id;

        if (
          idToAdd &&
          !state.sessionProLoss.some((item: any) => item.id === idToAdd)
        ) {
          state.sessionProLoss.push(action.payload);
        }
      })
      .addCase(getSessionProLoss.rejected, (state, action) => {
        state.loadingProLoss = false;
        state.error = action?.error?.message;
      })
      .addCase(updateProfitLoss.fulfilled, (state, action) => {
        const { jobData, profitLoss } = action.payload;
        if (jobData?.betPlaceObject?.betPlacedData?.betId) {
          const updatedSessionProLoss = state.sessionProLoss.map((item: any) =>
            item?.id === jobData.betPlaceObject.betPlacedData.betId
              ? {
                  ...item,

                  proLoss: [
                    JSON.stringify(profitLoss),
                    ...item.proLoss.slice(1),
                  ],
                }
              : item
          );

          state.sessionProLoss = updatedSessionProLoss;
        }
      })
      .addCase(
        getSessionProfitLossMatchDetailFilter.fulfilled,
        (state, action) => {
          const idToRemove = action.payload;
          state.sessionProLoss = state.sessionProLoss.filter(
            (item: any) => item?.id !== idToRemove
          );
        }
      );
  },
});

export const betsReducer = betsSlice.reducer;
