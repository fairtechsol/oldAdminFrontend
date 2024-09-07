import { createSlice } from "@reduxjs/toolkit";
import {
  amountupdate,
  betDataFromSocket,
  getMatchDetail,
  getMatchListInplay,
  matchListReset,
  updateBalance,
  updateMatchListRates,
  updateMatchRates,
  updateMaxLossForBet,
  updateMaxLossForBetOnUndeclare,
  updateMaxLossForDeleteBet,
  updateTeamRates,
  updateTeamRatesOnDelete,
  setCurrentOdd,
} from "../../actions/match/matchAction";
import { convertData, updateSessionBettingsItem } from "../../../helper";

interface InitialState {
  matchListInplay: any;
  matchDetail: any;
  success: boolean;
  loading: boolean;
  error: any;
  getProfile: any;
  matchDetails: any;
  betPlaceData: any;
  currentOdd: any;
}

const initialState: InitialState = {
  matchListInplay: null,
  matchDetail: null,
  loading: false,
  success: false,
  error: null,
  matchDetails: null,
  betPlaceData: [],
  getProfile: null,
  currentOdd: null,
};

const matchListSlice = createSlice({
  name: "matchListInplay",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMatchListInplay.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.matchListInplay = null;
      })
      .addCase(getMatchListInplay.fulfilled, (state, action) => {
        state.matchListInplay = action?.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getMatchListInplay.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getMatchDetail.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.matchDetail = null;
      })
      .addCase(getMatchDetail.fulfilled, (state, action) => {
        state.matchDetail = action?.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getMatchDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(updateMatchListRates.fulfilled, (state, action) => {
        const { id, matchOdd } = action?.payload;
        if (matchOdd) {
          const matchListIndex = state?.matchListInplay?.matches?.findIndex(
            (match: any) => match?.id === id
          );
          if (matchListIndex !== -1) {
            const updatedMatchlist = [...state.matchListInplay.matches];

            let matchOdds =
              state?.matchListInplay?.matches[matchListIndex]?.matchOdds &&
              state?.matchListInplay?.matches[matchListIndex]?.matchOdds
                ?.length > 0
                ? state?.matchListInplay?.matches[matchListIndex]?.matchOdds[0]
                : state?.matchListInplay?.matches[matchListIndex]?.matchOdds;

            updatedMatchlist[matchListIndex] = {
              ...updatedMatchlist[matchListIndex],
              matchOdds: [
                {
                  ...matchOdds,
                  ...matchOdd,
                },
              ],
            };

            state.matchListInplay = {
              ...state.matchListInplay,
              matches: updatedMatchlist,
            };
          }
        }
      })
      .addCase(updateMatchRates.fulfilled, (state, action) => {
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

        // let parsedSessionBettings = state?.matchDetail?.sessionBettings?.map(
        //   (item: any) => JSON.parse(item)
        // );

        // let apiParsedSessionBettings = sessionBettings?.map((item: any) =>
        //   JSON.parse(item)
        // );

        // apiParsedSessionBettings.forEach((apiItem: any) => {
        //   const index = parsedSessionBettings.findIndex(
        //     (parsedItem: any) => parsedItem.id === apiItem.id
        //   );
        //   if (index !== -1) {
        //     parsedSessionBettings[index] = {
        //       ...parsedSessionBettings[index],
        //       ...apiItem,
        //     };
        //   } else parsedSessionBettings?.push(apiItem);
        // });

        // let stringifiedSessionBetting = parsedSessionBettings?.map(
        //   (item: any) => JSON.stringify(item)
        // );

        // let updatedFormat = convertData(parsedSessionBettings);

        // let updatedSessionBettings = updateSessionBettingsItem(
        //   updatedFormat,
        //   apiSession
        // );

        const parsedSessionBettings =
          state.matchDetail?.sessionBettings?.map(JSON.parse) || [];
        const apiParsedSessionBettings = sessionBettings?.map(JSON.parse) || [];

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

        state.matchDetail = {
          ...state.matchDetail,
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
      })
      .addCase(matchListReset, (state) => {
        state.success = false;
      })
      .addCase(updateBalance.fulfilled, (state, action) => {
        state.getProfile = {
          ...state.getProfile,
          userBal: {
            ...state?.getProfile?.userBal,
            exposure:
              action?.payload?.newUserExposure ?? action?.payload?.exposure,
          },
        };
      })
      .addCase(updateMaxLossForBet.fulfilled, (state, action) => {
        const { jobData, profitLoss } = action?.payload;
        if (state?.matchDetail?.id === jobData?.placedBet?.matchId) {
          const updatedProfitLossDataSession =
            state?.matchDetail?.profitLossDataSession?.map((item: any) => {
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

          state.matchDetail = {
            ...state.matchDetail,
            profitLossDataSession: updatedProfitLossDataSession,
          };
        }
      })
      .addCase(updateMaxLossForDeleteBet.fulfilled, (state, action) => {
        const { bets, betId, profitLoss } = action?.payload;
        if (bets?.length > 0 && state?.matchDetail?.id === bets[0]?.matchId) {
          const updatedProfitLossDataSession =
            state?.matchDetail?.profitLossDataSession?.map((item: any) => {
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
          state.matchDetail = {
            ...state.matchDetail,
            profitLossDataSession: updatedProfitLossDataSession,
          };
        }
      })
      .addCase(updateMaxLossForBetOnUndeclare.fulfilled, (state, action) => {
        const { betId, matchId, profitLossData } = action?.payload;
        if (state?.matchDetail?.id === matchId) {
          state.matchDetail = {
            ...state.matchDetail,
            profitLossDataSession: Array.from(
              new Set([
                ...state.matchDetail?.profitLossDataSession,
                {
                  betId: betId,
                  maxLoss: profitLossData?.maxLoss,
                  totalBet: profitLossData?.totalBet,
                  profitLoss: profitLossData?.betPlaced,
                },
              ])
            ),
          };
        }
      })
      .addCase(betDataFromSocket.fulfilled, (state, action) => {
        const betId = action?.payload?.betPlaced?.placedBet?.betId;

        if (
          !state.betPlaceData.some(
            (item: any) => item?.betPlaced?.placedBet?.betId === betId
          )
        ) {
          state.betPlaceData = [...state.betPlaceData, action?.payload];
        } else {
          const existingIndex = state?.betPlaceData?.findIndex(
            (item: any) => item?.betPlaced?.placedBet?.betId === betId
          );
          if (existingIndex !== -1) {
            let updatedSlice = state?.betPlaceData?.splice(existingIndex, 1);
            state.betPlaceData = [...updatedSlice, action?.payload];
          }
        }
      })
      .addCase(updateTeamRates.fulfilled, (state, action) => {
        const { userRedisObj, jobData } = action?.payload;
        if (
          ["tiedMatch2", "tiedMatch1"].includes(jobData?.newBet?.marketType)
        ) {
          state.matchDetail.profitLossDataMatch = {
            ...state.matchDetail.profitLossDataMatch,
            yesRateTie: userRedisObj[jobData?.teamArateRedisKey],
            noRateTie: userRedisObj[jobData?.teamBrateRedisKey],
          };
        } else if (
          ["completeMatch", "completeManual"].includes(
            jobData?.newBet?.marketType
          )
        ) {
          state.matchDetail.profitLossDataMatch = {
            ...state.matchDetail.profitLossDataMatch,
            yesRateComplete: userRedisObj[jobData?.teamArateRedisKey],
            noRateComplete: userRedisObj[jobData?.teamBrateRedisKey],
          };
        } else {
          state.matchDetail.profitLossDataMatch = {
            ...state.matchDetail.profitLossDataMatch,
            teamARate: userRedisObj[jobData?.teamArateRedisKey],
            teamBRate: userRedisObj[jobData?.teamBrateRedisKey],
            teamCRate: userRedisObj[jobData?.teamCrateRedisKey] ?? "",
          };
        }
      })
      .addCase(updateTeamRatesOnDelete.fulfilled, (state, action) => {
        const { redisObject, matchBetType } = action?.payload;
        if (matchBetType === "tiedMatch2" || matchBetType === "tiedMatch1") {
          state.matchDetail.profitLossDataMatch = {
            ...state.matchDetail.profitLossDataMatch,
            yesRateTie: redisObject[action?.payload?.teamArateRedisKey],
            noRateTie: redisObject[action?.payload?.teamBrateRedisKey],
          };
        } else if (
          matchBetType === "completeMatch" ||
          matchBetType === "completeManual"
        ) {
          state.matchDetail.profitLossDataMatch = {
            ...state.matchDetail.profitLossDataMatch,
            yesRateComplete: redisObject[action?.payload?.teamArateRedisKey],
            noRateComplete: redisObject[action?.payload?.teamBrateRedisKey],
          };
        } else {
          state.matchDetail.profitLossDataMatch = {
            ...state.matchDetail.profitLossDataMatch,
            teamARate: redisObject[action?.payload?.teamArateRedisKey],
            teamBRate: redisObject[action?.payload?.teamBrateRedisKey],
            teamCRate: redisObject[action?.payload?.teamCrateRedisKey] ?? "",
          };
        }
      })
      .addCase(amountupdate.fulfilled, (state, action) => {
        const { matchId, betId } = action?.payload;
        if (state?.matchDetail?.id === matchId) {
          const updatedProfitLossDataSession =
            state?.matchDetail?.profitLossDataSession?.filter(
              (item: any) => betId !== item?.betId
            );

          state.matchDetail = {
            ...state.matchDetail,
            profitLossDataSession: updatedProfitLossDataSession,
          };
        }
      })
      .addCase(setCurrentOdd.fulfilled, (state, action) => {
        state.currentOdd = action?.payload;
      });
  },
});

export const matchListReducer = matchListSlice.reducer;
