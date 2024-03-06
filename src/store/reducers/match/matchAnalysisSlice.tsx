import { createSlice } from "@reduxjs/toolkit";
import {
  analysisListReset,
  updateMultipleMatchDetail,
} from "../../actions/match/matchAction";
import {
  getAnalysisList,
  getMultipleMatchDetail,
  updateBetDataOnDeclareOfMultipleMatch,
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
      .addCase(
        updateMaxLossForBetForMultipleMatch.fulfilled,
        (state, action) => {
          const { jobData, profitLoss } = action.payload;

          state.multipleMatchDetail = state.multipleMatchDetail.map(
            (match: any) => {
              if (match?.id === jobData?.placedBet?.matchId) {
                const updatedProfitLossDataSession =
                  match?.profitLossDataSession.map((item: any) => {
                    if (item?.betId === jobData?.placedBet?.betId) {
                      return {
                        ...item,
                        maxLoss: profitLoss?.maxLoss,
                        totalBet: profitLoss?.totalBet,
                      };
                    }
                    return item;
                  });

                const betIndex = updatedProfitLossDataSession.findIndex(
                  (item: any) => item?.betId === jobData?.placedBet?.betId
                );
                if (betIndex === -1) {
                  updatedProfitLossDataSession.push({
                    betId: jobData?.placedBet?.betId,
                    maxLoss: profitLoss?.maxLoss,
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
        const { userRedisObj, jobData } = action.payload;

        state.multipleMatchDetail = state.multipleMatchDetail.map(
          (match: any) => {
            if (
              ["tiedMatch2", "tiedMatch"].includes(jobData?.newBet?.marketType)
            ) {
              return {
                ...match,
                profitLossDataMatch: {
                  ...match.profitLossDataMatch,
                  yesRateTie: userRedisObj[jobData?.teamArateRedisKey],
                  noRateTie: userRedisObj[jobData?.teamBrateRedisKey],
                },
              };
            } else if (
              ["completeMatch"].includes(jobData?.newBet?.marketType)
            ) {
              return {
                ...match,
                profitLossDataMatch: {
                  ...match.profitLossDataMatch,
                  yesRateComplete: userRedisObj[jobData?.teamArateRedisKey],
                  noRateComplete: userRedisObj[jobData?.teamBrateRedisKey],
                },
              };
            } else {
              return {
                ...match,
                profitLossDataMatch: {
                  ...match.profitLossDataMatch,
                  teamARate: userRedisObj[jobData?.teamArateRedisKey],
                  teamBRate: userRedisObj[jobData?.teamBrateRedisKey],
                  teamCRate: userRedisObj[jobData?.teamCrateRedisKey] ?? "",
                },
              };
            }
          }
        );
      })
      .addCase(
        updateMaxLossForBetOnUndeclareForMultipleMatch.fulfilled,
        (state, action) => {
          const { betId, matchId, parentRedisUpdateObj } = action.payload;
          state.multipleMatchDetail = state.multipleMatchDetail.map(
            (match: any) => {
              if (match?.id === matchId) {
                const updatedProfitLoss = Array.from(
                  new Set([
                    ...match.profitLossDataSession,
                    {
                      betId: betId,
                      maxLoss: JSON.parse(
                        parentRedisUpdateObj[`${betId}_profitLoss`]
                      ).maxLoss,
                      totalBet: JSON.parse(
                        parentRedisUpdateObj[`${betId}_profitLoss`]
                      ).totalBet,
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
          const { betId, matchId } = action.payload;
          state.multipleMatchDetail = state.multipleMatchDetail.map(
            (match: any) => {
              if (matchId === match?.id) {
                const updatedProfitLossDataSession =
                  match?.profitLossDataSession.filter(
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
          const { redisObject, matchBetType } = action.payload;
          state.multipleMatchDetail = state.multipleMatchDetail.map(
            (match: any) => {
              if (["tiedMatch2", "tiedMatch"].includes(matchBetType)) {
                return {
                  ...match,
                  profitLossDataMatch: {
                    ...match.profitLossDataMatch,
                    yesRateTie: redisObject[action.payload?.teamArateRedisKey],
                    noRateTie: redisObject[action.payload?.teamBrateRedisKey],
                  },
                };
              } else if (["completeMatch"].includes(matchBetType)) {
                return {
                  ...match,
                  profitLossDataMatch: {
                    ...match.profitLossDataMatch,
                    yesRateComplete:
                      redisObject[action.payload?.teamArateRedisKey],
                    noRateComplete:
                      redisObject[action.payload?.teamBrateRedisKey],
                  },
                };
              } else {
                return {
                  ...match,
                  profitLossDataMatch: {
                    ...match.profitLossDataMatch,
                    teamARate: redisObject[action.payload?.teamArateRedisKey],
                    teamBRate: redisObject[action.payload?.teamBrateRedisKey],
                    teamCRate:
                      redisObject[action.payload?.teamCrateRedisKey] ?? "",
                  },
                };
              }
            }
          );
        }
      )
      .addCase(
        updateMaxLossForDeleteBetForMultiMatch.fulfilled,
        (state, action) => {
          const { matchId, betId, profitLoss } = action.payload;
          state.multipleMatchDetail = state.multipleMatchDetail.map(
            (match: any) => {
              if (match === matchId) {
                const updatedProfitLossDataSession =
                  match?.profitLossDataSession.map((item: any) => {
                    if (betId === item?.betId) {
                      return {
                        ...item,
                        maxLoss: profitLoss?.maxLoss,
                        totalBet: profitLoss?.totalBet,
                      };
                    }
                    return item;
                  });

                const betIndex = updatedProfitLossDataSession.findIndex(
                  (item: any) => item?.betId === betId
                );
                if (betIndex === -1) {
                  updatedProfitLossDataSession.push({
                    betId: betId,
                    maxLoss: profitLoss?.maxLoss,
                    totalBet: 1,
                  });
                }
                match = {
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
      .addCase(analysisListReset, (state) => {
        return { ...state, success: false };
      });
  },
});

export const analysisListReducer = analysisListSlice.reducer;
