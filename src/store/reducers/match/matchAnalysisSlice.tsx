import { createSlice } from "@reduxjs/toolkit";
import {
  analysisListReset,
  updateMultipleMatchDetail,
} from "../../actions/match/matchAction";
import {
  getAnalysisList,
  getMultipleMatchDetail,
  updateBetDataOnDeclareOfMultipleMatch,
  updateMatchRatesOnMarketUndeclareForMulti,
  updateMaxLossForBetForMultipleMatch,
  updateMaxLossForBetOnUndeclareForMultipleMatch,
  updateMaxLossForDeleteBetForMultiMatch,
  updateTeamRatesOfMultipleMatch,
  updateTeamRatesOnDeleteForMultiMatch,
} from "../../actions/match/multipleMatchAction";

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
        state.error = action.error?.message;
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
        state.error = action.error?.message;
      })
      .addCase(updateMultipleMatchDetail.fulfilled, (state, action) => {
        const { apiSession, sessionBettings, tournament, id } = action.payload;
        state.multipleMatchDetail = state?.multipleMatchDetail?.map(
          (match: any) => {
            if (match?.id !== id) return match;

            const parsedSessionBettings = new Map(
              (match?.sessionBettings || []).map((item: any) => {
                const parsed = JSON.parse(item);
                return [parsed.id, parsed];
              })
            );

            (sessionBettings || []).forEach((item: any) => {
              const parsed = JSON.parse(item);
              const existing = parsedSessionBettings.get(parsed.id);
              parsedSessionBettings.set(
                parsed.id,
                existing ? { ...existing, ...parsed } : parsed
              );
            });

            const stringifiedSessionBetting = Array.from(
              parsedSessionBettings.values()
            ).map((item) => JSON.stringify(item));

            return {
              ...match,
              apiSession: apiSession,
              sessionBettings: stringifiedSessionBetting,
              tournament: tournament?.sort((a: any, b: any) => {
                if (a.sno !== b.sno) {
                  return a.sno - b.sno;
                }
                if (a.parentBetId === null && b.parentBetId !== null) return -1;
                if (a.parentBetId !== null && b.parentBetId === null) return 1;
                return 0;
              }),
            };
          }
        );
      })
      .addCase(
        updateMaxLossForBetForMultipleMatch.fulfilled,
        (state, action) => {
          const { jobData, profitLoss } = action.payload;
          const placedBet = jobData?.placedBet;
          if (!placedBet) return;
          state.multipleMatchDetail = state?.multipleMatchDetail?.map(
            (match: any) => {
              if (match?.id !== placedBet?.matchId) return match;
              const existingData = match?.profitLossDataSession || [];
              let found = false;
              const updatedProfitLossDataSession = existingData.map(
                (item: any) => {
                  if (item?.betId !== placedBet?.betId) return item;
                  found = true;
                  return {
                    ...item,
                    maxLoss: profitLoss?.maxLoss,
                    totalBet: profitLoss?.totalBet,
                    profitLoss: profitLoss?.betPlaced,
                  };
                }
              );
              if (!found) {
                updatedProfitLossDataSession.push({
                  betId: placedBet?.betId,
                  maxLoss: profitLoss?.maxLoss,
                  profitLoss: profitLoss?.betPlaced,
                  totalBet: 1,
                });
              }
              return {
                ...match,
                profitLossDataSession: updatedProfitLossDataSession,
              };
            }
          );
        }
      )
      .addCase(updateTeamRatesOfMultipleMatch.fulfilled, (state, action) => {
        const { userRedisObj, jobData } = action.payload;
        state.multipleMatchDetail = state?.multipleMatchDetail.map(
          (match: any) => {
            if (match?.id !== jobData?.newBet?.matchId) return match;
            return {
              ...match,
              profitLossDataMatch: {
                ...match.profitLossDataMatch,
                [jobData?.betId + "_" + "profitLoss" + "_" + match?.id]:
                  JSON.stringify(userRedisObj),
              },
            };
          }
        );
      })
      .addCase(
        updateMaxLossForBetOnUndeclareForMultipleMatch.fulfilled,
        (state, action) => {
          const { betId, matchId, profitLossData } = action.payload;
          state.multipleMatchDetail = state?.multipleMatchDetail?.map(
            (match: any) => {
              if (match?.id !== matchId) return match;
              const updatedProfitLoss = Array.from(
                new Set([
                  ...match.profitLossDataSession,
                  {
                    betId: betId,
                    maxLoss: profitLossData?.maxLoss,
                    totalBet: profitLossData?.totalBet,
                    profitLoss: profitLossData?.betPlaced,
                  },
                ])
              );
              return {
                ...match,
                profitLossDataSession: updatedProfitLoss,
              };
            }
          );
        }
      )
      .addCase(
        updateBetDataOnDeclareOfMultipleMatch.fulfilled,
        (state, action) => {
          const { betId, matchId } = action.payload;
          state.multipleMatchDetail = state?.multipleMatchDetail?.map(
            (match: any) => {
              if (match?.id !== matchId) return match;
              const updatedProfitLossDataSession =
                match?.profitLossDataSession?.filter(
                  (item: any) => item?.betId !== betId
                );
              return {
                ...match,
                profitLossDataSession: updatedProfitLossDataSession,
              };
            }
          );
        }
      )
      .addCase(
        updateTeamRatesOnDeleteForMultiMatch.fulfilled,
        (state, action) => {
          const { betId, teamRate, matchId } = action.payload;
          state.multipleMatchDetail = state?.multipleMatchDetail?.map(
            (match: any) => {
              if (match?.id !== matchId) return match;
              return {
                ...match,
                profitLossDataMatch: {
                  ...match?.profitLossDataMatch,
                  [betId + "_" + "profitLoss" + "_" + match?.id]:
                    JSON.stringify(teamRate),
                },
              };
            }
          );
        }
      )
      .addCase(
        updateMaxLossForDeleteBetForMultiMatch.fulfilled,
        (state, action) => {
          const { betId, matchId, profitLoss } = action.payload;
          state.multipleMatchDetail = state.multipleMatchDetail?.map(
            (match: any) => {
              if (match.id !== matchId) return match;
              let updated = false;
              const updatedProfitLossDataSession =
                match.profitLossDataSession?.map((item: any) => {
                  if (item.betId !== betId) return item;
                  updated = true;
                  return {
                    ...item,
                    maxLoss: profitLoss?.maxLoss,
                    totalBet: profitLoss?.totalBet,
                    profitLoss: profitLoss?.betPlaced,
                  };
                }) || [];
              if (!updated) {
                updatedProfitLossDataSession.push({
                  betId,
                  maxLoss: profitLoss?.maxLoss,
                  profitLoss: profitLoss?.betPlaced,
                  totalBet: 1,
                });
              }
              return {
                ...match,
                profitLossDataSession: updatedProfitLossDataSession,
              };
            }
          );
        }
      )
      .addCase(
        updateMatchRatesOnMarketUndeclareForMulti.fulfilled,
        (state, action) => {
          const { profitLossData, betId, matchId } = action.payload;
          state.multipleMatchDetail = state?.multipleMatchDetail?.map(
            (match: any) => {
              if (match?.id !== matchId) return match;
              return {
                ...match,
                profitLossDataMatch: {
                  ...match?.profitLossDataMatch,
                  [betId + "_" + "profitLoss" + "_" + match?.id]:
                    JSON.stringify(profitLossData),
                },
              };
            }
          );
        }
      )
      .addCase(analysisListReset, (state) => {
        state.success = false;
      });
  },
});

export const analysisListReducer = analysisListSlice.reducer;
