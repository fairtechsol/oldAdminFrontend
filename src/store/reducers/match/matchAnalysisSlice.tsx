import { createSlice } from "@reduxjs/toolkit";
import { convertData, updateSessionBettingsItem } from "../../../helper";
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
        state.analysisList = action?.payload;
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
        state.multipleMatchDetail = action?.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getMultipleMatchDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(updateMultipleMatchDetail.fulfilled, (state, action) => {
        state.multipleMatchDetail = state?.multipleMatchDetail?.map(
          (match: any) => {
            if (match?.id === action?.payload?.id) {
              const { apiSession, sessionBettings, tournament } =
                action?.payload;

              const parsedSessionBettings =
                match?.sessionBettings?.map(JSON.parse) || [];
              const apiParsedSessionBettings =
                sessionBettings?.map(JSON.parse) || [];

              apiParsedSessionBettings.forEach((apiItem: any) => {
                const index = parsedSessionBettings.findIndex(
                  (parsedItem: any) => parsedItem.id === apiItem.id
                );
                if (index !== -1) {
                  parsedSessionBettings[index] = {
                    ...parsedSessionBettings[index],
                    ...apiItem,
                  };
                } else {
                  parsedSessionBettings.push(apiItem);
                }
              });
              const stringifiedSessionBetting = parsedSessionBettings.map(
                JSON.stringify
              );
              return {
                ...match,
                apiSession: apiSession,
                sessionBettings: stringifiedSessionBetting,
                updatedSessionBettings: updateSessionBettingsItem(
                  convertData(parsedSessionBettings),
                  apiSession
                ),
                tournament: tournament?.sort((a: any, b: any) => {
                  if (a.sno !== b.sno) {
                    return a.sno - b.sno;
                  }
                  if (a.parentBetId === null && b.parentBetId !== null)
                    return -1;
                  if (a.parentBetId !== null && b.parentBetId === null)
                    return 1;
                  return 0;
                }),
              };
            } else {
              return match;
            }
          }
        );
      })
      .addCase(
        updateMaxLossForBetForMultipleMatch.fulfilled,
        (state, action) => {
          const { jobData, profitLoss } = action?.payload;

          state.multipleMatchDetail = state?.multipleMatchDetail?.map(
            (match: any) => {
              if (match?.id === jobData?.placedBet?.matchId) {
                const updatedProfitLossDataSession =
                  match?.profitLossDataSession?.map((item: any) => {
                    if (item?.betId === jobData?.placedBet?.betId) {
                      return {
                        ...item,
                        maxLoss: profitLoss?.maxLoss,
                        totalBet: profitLoss?.totalBet,
                        profitLoss: profitLoss?.betPlaced,
                      };
                    }
                    return item;
                  });

                const betIndex = updatedProfitLossDataSession?.findIndex(
                  (item: any) => item?.betId === jobData?.placedBet?.betId
                );
                if (betIndex === -1) {
                  updatedProfitLossDataSession?.push({
                    betId: jobData?.placedBet?.betId,
                    maxLoss: profitLoss?.maxLoss,
                    profitLoss: profitLoss?.betPlaced,
                    totalBet: 1,
                  });
                }

                return {
                  ...match,
                  profitLossDataSession: updatedProfitLossDataSession,
                };
              } else {
                return match;
              }
            }
          );
        }
      )
      .addCase(updateTeamRatesOfMultipleMatch.fulfilled, (state, action) => {
        const { userRedisObj, jobData } = action?.payload;
        state.multipleMatchDetail = state?.multipleMatchDetail.map(
          (match: any) => {
            if (match?.id === jobData?.newBet?.matchId) {
              if (jobData?.newBet?.marketType === "tournament") {
                return {
                  ...match,
                  profitLossDataMatch: {
                    ...match.profitLossDataMatch,
                    [jobData?.betId + "_" + "profitLoss" + "_" + match?.id]:
                      JSON.stringify(userRedisObj),
                  },
                };
              }
            } else return match;
          }
        );
      })
      .addCase(
        updateMaxLossForBetOnUndeclareForMultipleMatch.fulfilled,
        (state, action) => {
          const { betId, matchId, profitLossData } = action?.payload;
          state.multipleMatchDetail = state?.multipleMatchDetail?.map(
            (match: any) => {
              if (match?.id === matchId) {
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
              } else return match;
            }
          );
        }
      )
      .addCase(
        updateBetDataOnDeclareOfMultipleMatch.fulfilled,
        (state, action) => {
          const { betId, matchId } = action?.payload;
          state.multipleMatchDetail = state?.multipleMatchDetail?.map(
            (match: any) => {
              if (matchId === match?.id) {
                const updatedProfitLossDataSession =
                  match?.profitLossDataSession?.filter(
                    (item: any) => item?.betId !== betId
                  );

                return {
                  ...match,
                  profitLossDataSession: updatedProfitLossDataSession,
                };
              } else {
                return match;
              }
            }
          );
        }
      )
      .addCase(
        updateTeamRatesOnDeleteForMultiMatch.fulfilled,
        (state, action) => {
          const { betId, teamRate } = action?.payload;
          state.multipleMatchDetail = state?.multipleMatchDetail?.map(
            (match: any) => {
              if (match?.id === action?.payload?.matchId) {
                return {
                  ...match,
                  profitLossDataMatch: {
                    ...match?.profitLossDataMatch,
                    [betId + "_" + "profitLoss" + "_" + match?.id]:
                      JSON.stringify(teamRate),
                  },
                };
              } else return match;
            }
          );
        }
      )
      .addCase(
        updateMaxLossForDeleteBetForMultiMatch.fulfilled,
        (state, action) => {
          const { betId, matchId, profitLoss } = action?.payload;
          state.multipleMatchDetail = state?.multipleMatchDetail?.map(
            (match: any) => {
              if (match?.id === matchId) {
                const updatedProfitLossDataSession =
                  match?.profitLossDataSession?.map((item: any) => {
                    if (betId === item?.betId) {
                      return {
                        ...item,
                        maxLoss: profitLoss?.maxLoss,
                        totalBet: profitLoss?.totalBet,
                        profitLoss: profitLoss?.betPlaced,
                      };
                    }
                    return item;
                  });

                const betIndex = updatedProfitLossDataSession?.findIndex(
                  (item: any) => item?.betId === betId
                );
                if (betIndex === -1) {
                  updatedProfitLossDataSession?.push({
                    betId: betId,
                    maxLoss: profitLoss?.maxLoss,
                    profitLoss: profitLoss?.betPlaced,
                    totalBet: 1,
                  });
                }
                match = {
                  ...match,
                  profitLossDataSession: updatedProfitLossDataSession,
                };
              } else return match;
            }
          );
          // });
        }
      )
      .addCase(
        updateMatchRatesOnMarketUndeclareForMulti.fulfilled,
        (state, action) => {
          const { profitLossData, betId, matchId } = action?.payload;
          state.multipleMatchDetail = state?.multipleMatchDetail?.map(
            (match: any) => {
              if (match?.id === matchId) {
                return {
                  ...match,
                  profitLossDataMatch: {
                    ...match?.profitLossDataMatch,
                    [betId + "_" + "profitLoss" + "_" + match?.id]:
                      JSON.stringify(profitLossData),
                  },
                };
              } else return match;
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
