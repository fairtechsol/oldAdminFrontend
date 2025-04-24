import { createSlice } from "@reduxjs/toolkit";
import {
  addRunAmount,
  getPlacedBets,
  getSessionProLoss,
  getSessionProfitLossMatchDetailFilter,
  removeRunAmount,
  resetBetSessionProfitLossGraph,
  updateBetsPlaced,
  updatePlacedbets,
  updatePlacedbetsDeleteReason,
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
        state.error = action.error?.message;
      })
      .addCase(updateBetsPlaced.fulfilled, (state, action) => {
        const { newBet, myStake, userName } = action.payload;
        const betId = action.payload?.betId;
        const user = {
          userName: userName,
        };
        if (!state?.placedBets?.find((item: any) => item?.id === betId)) {
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
        const { id } = action.payload;

        if (
          id &&
          !state?.sessionProLoss?.some((item: any) => item?.id === id)
        ) {
          state?.sessionProLoss?.push(action.payload);
        }
      })
      .addCase(getSessionProLoss.rejected, (state, action) => {
        state.loadingProLoss = false;
        state.error = action.error?.message;
      })
      .addCase(updateProfitLoss.fulfilled, (state, action) => {
        const { jobData, profitLoss } = action.payload;
        if (jobData?.betPlaceObject?.betPlacedData?.betId) {
          const updatedSessionProLoss = state?.sessionProLoss?.map(
            (item: any) =>
              item?.id === jobData?.betPlaceObject?.betPlacedData?.betId
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
      .addCase(addRunAmount.fulfilled, (state, action) => {
        const { id } = action.payload;
        if (
          id &&
          !state?.sessionProLoss?.find((item: any) => item?.id === id)
        ) {
          state?.sessionProLoss?.push(action?.payload);
        }
      })
      .addCase(removeRunAmount.fulfilled, (state, action) => {
        const { betId } = action.payload;
        state.sessionProLoss = state?.sessionProLoss?.filter(
          (item: any) => item?.id !== betId
        );
      })
      .addCase(
        getSessionProfitLossMatchDetailFilter.fulfilled,
        (state, action) => {
          const idToRemove = action.payload;
          state.sessionProLoss = state?.sessionProLoss?.filter(
            (item: any) => item?.id !== idToRemove
          );
        }
      )
      .addCase(updatePlacedbets.fulfilled, (state, action) => {
        const {
          betPlacedId,
          deleteReason,
          profitLoss,
          betId,
          isPermanentDelete,
        } = action.payload;

        const updateDeleteReason = (bet: any) => {
          if (betPlacedId?.includes(bet?.id)) {
            bet.deleteReason = deleteReason;
          }
          return bet;
        };
        if (isPermanentDelete) {
          const updatedBetPlaced = state?.placedBets?.filter(
            (item: any) => !betPlacedId?.includes(item?.id)
          );
          state.placedBets = Array.from(new Set(updatedBetPlaced));
        } else {
          const updatedBetPlaced = state?.placedBets?.map(updateDeleteReason);
          state.placedBets = Array.from(new Set(updatedBetPlaced));
        }
        if (betPlacedId) {
          const updatedSessionProLoss = state?.sessionProLoss?.map(
            (item: any) =>
              betId === item?.id
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
      .addCase(updatePlacedbetsDeleteReason.fulfilled, (state, action) => {
        const { betIds, deleteReason } = action.payload;
        const updateDeleteReason = (bet: any) => {
          if (betIds?.includes(bet?.id)) {
            bet.deleteReason = deleteReason;
          }
          return bet;
        };
        const updatedBetPlaced = state?.placedBets?.map(updateDeleteReason);
        state.placedBets = Array.from(new Set(updatedBetPlaced));
      })
      .addCase(resetBetSessionProfitLossGraph, (state) => {
        state.sessionProLoss = [];
      });
  },
});

export const betsReducer = betsSlice.reducer;
