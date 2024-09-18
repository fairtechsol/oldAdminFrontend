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
import { convertData, updateSessionBettingsItem } from "../../../helper";
import { profitLossDataForMatchConstants } from "../../../utils/Constants";

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
              const {
                apiSession,
                apiTiedMatch,
                bookmaker,
                manualTideMatch,
                marketCompleteMatch,
                matchOdd,
                quickbookmaker,
                sessionBettings,
                completeManual,
              } = action?.payload;

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
                apiTideMatch: apiTiedMatch,
                bookmaker: bookmaker,
                manualTiedMatch: manualTideMatch,
                marketCompleteMatch: marketCompleteMatch,
                matchOdd: matchOdd,
                quickBookmaker: quickbookmaker,
                sessionBettings: stringifiedSessionBetting,
                manualCompleteMatch: completeManual,
                updatedSessionBettings: updateSessionBettingsItem(
                  convertData(parsedSessionBettings),
                  apiSession
                ),
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
              if (jobData?.newBet?.marketType === "other") {
                return {
                  ...match,
                  profitLossDataMatch: {
                    ...match.profitLossDataMatch,
                    [profitLossDataForMatchConstants[
                      jobData?.newBet?.marketType
                    ].A +
                    "_" +
                    jobData?.newBet?.betId +
                    "_" +
                    match?.id]: userRedisObj[jobData?.teamArateRedisKey],
                    [profitLossDataForMatchConstants[
                      jobData?.newBet?.marketType
                    ].B +
                    "_" +
                    jobData?.newBet?.betId +
                    "_" +
                    match?.id]: userRedisObj[jobData?.teamBrateRedisKey],
                    [profitLossDataForMatchConstants[
                      jobData?.newBet?.marketType
                    ].C +
                    "_" +
                    jobData?.newBet?.betId +
                    "_" +
                    match?.id]: userRedisObj[jobData?.teamCrateRedisKey],
                  },
                };
              } else {
                return {
                  ...match,
                  profitLossDataMatch: {
                    ...match.profitLossDataMatch,
                    [profitLossDataForMatchConstants[
                      jobData?.newBet?.marketType
                    ].A +
                    "_" +
                    match?.id]: userRedisObj[jobData?.teamArateRedisKey],
                    [profitLossDataForMatchConstants[
                      jobData?.newBet?.marketType
                    ].B +
                    "_" +
                    match?.id]: userRedisObj[jobData?.teamBrateRedisKey],
                    [profitLossDataForMatchConstants[
                      jobData?.newBet?.marketType
                    ].C +
                    "_" +
                    match?.id]: userRedisObj[jobData?.teamCrateRedisKey],
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
          const { redisObject, matchBetType } = action?.payload;
          state.multipleMatchDetail = state?.multipleMatchDetail?.map(
            (match: any) => {
              if (match?.id === action?.payload?.matchId) {
                if (["tiedMatch2", "tiedMatch1"].includes(matchBetType)) {
                  return {
                    ...match,
                    profitLossDataMatch: {
                      ...match.profitLossDataMatch,
                      yesRateTie:
                        redisObject[action?.payload?.teamArateRedisKey],
                      noRateTie:
                        redisObject[action?.payload?.teamBrateRedisKey],
                    },
                  };
                } else if (
                  ["completeMatch", "completeManual"].includes(matchBetType)
                ) {
                  return {
                    ...match,
                    profitLossDataMatch: {
                      ...match.profitLossDataMatch,
                      yesRateComplete:
                        redisObject[action?.payload?.teamArateRedisKey],
                      noRateComplete:
                        redisObject[action?.payload?.teamBrateRedisKey],
                    },
                  };
                } else {
                  return {
                    ...match,
                    profitLossDataMatch: {
                      ...match.profitLossDataMatch,
                      teamARate:
                        redisObject[action?.payload?.teamArateRedisKey],
                      teamBRate:
                        redisObject[action?.payload?.teamBrateRedisKey],
                      teamCRate:
                        redisObject[action?.payload?.teamCrateRedisKey] ?? "",
                    },
                  };
                }
              } else return match;
            }
          );
        }
      )
      .addCase(
        updateMaxLossForDeleteBetForMultiMatch.fulfilled,
        (state, action) => {
          const {
            redisObject,
            betId,
            matchBetType,
            teamArateRedisKey,
            teamBrateRedisKey,
            teamCrateRedisKey,
          } = action?.payload;
          state.multipleMatchDetail = state?.multipleMatchDetail?.map(
            (match: any) => {
              if (match?.id === action?.payload?.matchId) {
                if (matchBetType === "other") {
                  if (redisObject[teamCrateRedisKey]) {
                    return {
                      ...match,
                      profitLossDataMatch: {
                        ...match?.profitLossDataMatch,
                        [profitLossDataForMatchConstants[matchBetType].A +
                        "_" +
                        betId +
                        "_" +
                        match?.id]: redisObject[teamArateRedisKey],
                        [profitLossDataForMatchConstants[matchBetType].B +
                        "_" +
                        betId +
                        "_" +
                        match?.id]: redisObject[teamBrateRedisKey],
                        [profitLossDataForMatchConstants[matchBetType].C +
                        "_" +
                        betId +
                        "_" +
                        match?.id]: redisObject[teamCrateRedisKey],
                      },
                    };
                  } else {
                    return {
                      ...match,
                      profitLossDataMatch: {
                        ...match?.profitLossDataMatch,
                        [profitLossDataForMatchConstants[matchBetType].A +
                        "_" +
                        betId +
                        "_" +
                        match?.id]: redisObject[teamArateRedisKey],
                        [profitLossDataForMatchConstants[matchBetType].B +
                        "_" +
                        betId +
                        "_" +
                        match?.id]: redisObject[teamBrateRedisKey],
                      },
                    };
                  }
                } else {
                  if (redisObject[teamCrateRedisKey]) {
                    return {
                      ...match,
                      profitLossDataMatch: {
                        ...match?.profitLossDataMatch,
                        [profitLossDataForMatchConstants[matchBetType].A +
                        "_" +
                        match?.id]: redisObject[teamArateRedisKey],
                        [profitLossDataForMatchConstants[matchBetType].B +
                        "_" +
                        match?.id]: redisObject[teamBrateRedisKey],
                        [profitLossDataForMatchConstants[matchBetType].C +
                        "_" +
                        match?.id]: redisObject[teamCrateRedisKey],
                      },
                    };
                  } else {
                    return {
                      ...match,
                      profitLossDataMatch: {
                        ...match?.profitLossDataMatch,
                        [profitLossDataForMatchConstants[matchBetType].A +
                        "_" +
                        match?.id]: redisObject[teamArateRedisKey],
                        [profitLossDataForMatchConstants[matchBetType].B +
                        "_" +
                        match?.id]: redisObject[teamBrateRedisKey],
                      },
                    };
                  }
                }
              } else return match;
            }
          );
        // });
        }
      )
      .addCase(analysisListReset, (state) => {
        state.success = false;
      });
  },
});

export const analysisListReducer = analysisListSlice.reducer;
