import { createSlice } from "@reduxjs/toolkit";
import {
  amountupdate,
  getMatchDetail,
  getMatchDetailMarketAnalysis,
  getMatchListInplay,
  matchListInplaySuccessReset,
  matchListReset,
  resetMarketAnalysys,
  setCurrentOdd,
  updateMatchRates,
  updateMatchRatesFromApiOnList,
  updateMaxLossForBet,
  updateMaxLossForBetOnUndeclare,
  updateMaxLossForDeleteBet,
  updateTeamRates,
  updateTeamRatesOnDelete,
  updateTeamRatesOnMarketUndeclare,
} from "../../actions/match/matchAction";

interface InitialState {
  matchListInplay: any;
  matchListInplaySuccess: boolean;
  matchDetail: any;
  success: boolean;
  loading: boolean;
  error: any;
  matchDetails: any;
  betPlaceData: any;
  currentOdd: any;
  marketAnalysis: any;
}

const initialState: InitialState = {
  matchListInplay: null,
  matchListInplaySuccess: false,
  matchDetail: null,
  loading: false,
  success: false,
  error: null,
  matchDetails: null,
  betPlaceData: [],
  currentOdd: null,
  marketAnalysis: null,
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
        state.matchListInplay = action.payload;
        state.loading = false;
        state.matchListInplaySuccess = true;
        state.success = true;
      })
      .addCase(getMatchListInplay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(matchListInplaySuccessReset, (state) => {
        state.matchListInplaySuccess = false;
      })
      .addCase(getMatchDetail.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.matchDetail = null;
      })
      .addCase(getMatchDetail.fulfilled, (state, action) => {
        state.matchDetail = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(getMatchDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getMatchDetailMarketAnalysis.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.marketAnalysis = null;
      })
      .addCase(getMatchDetailMarketAnalysis.fulfilled, (state, action) => {
        state.loading = false;
        state.marketAnalysis = action.payload;
      })
      .addCase(getMatchDetailMarketAnalysis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(resetMarketAnalysys, (state) => {
        state.marketAnalysis = null;
      })
      .addCase(updateMatchRates.fulfilled, (state, action) => {
        const { apiSession, sessionBettings, tournament } = action.payload;

        const parsedSessionBettings = new Map(
          (state.matchDetail?.sessionBettings || []).map((item: any) => {
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

        state.matchDetail = {
          ...state.matchDetail,
          manualSessionActive: sessionBettings?.length >= 0 ? true : false,
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
      })
      .addCase(matchListReset, (state) => {
        state.success = false;
      })
      .addCase(updateMaxLossForBet.fulfilled, (state, action) => {
        const { jobData, profitLoss } = action.payload;
        const match = state?.matchDetail;
        const placedBet = jobData?.placedBet;
        if (match?.id !== placedBet?.matchId) return;
        let updated = false;
        const updatedProfitLossDataSession =
          match.profitLossDataSession?.map((item: any) => {
            if (item.betId !== placedBet.betId) return item;
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
            betId: placedBet.betId,
            maxLoss: profitLoss?.maxLoss,
            profitLoss: profitLoss?.betPlaced,
            totalBet: 1,
          });
        }
        state.matchDetail = {
          ...match,
          profitLossDataSession: updatedProfitLossDataSession,
        };
      })
      .addCase(updateMaxLossForDeleteBet.fulfilled, (state, action) => {
        const { bets, betId, profitLoss } = action.payload;
        const match = state?.matchDetail;
        if (!bets?.length || match?.id !== bets?.[0]?.matchId) return;
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
        state.matchDetail = {
          ...match,
          profitLossDataSession: updatedProfitLossDataSession,
        };
      })
      .addCase(updateMaxLossForBetOnUndeclare.fulfilled, (state, action) => {
        const { betId, matchId, profitLossData } = action.payload;
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
      .addCase(updateTeamRates.fulfilled, (state, action) => {
        const { userRedisObj, jobData } = action.payload;
        state.matchDetail.profitLossDataMatch = {
          ...state.matchDetail.profitLossDataMatch,
          [jobData?.betId + "_profitLoss_" + state.matchDetail?.id]:
            userRedisObj,
        };
      })
      .addCase(updateTeamRatesOnDelete.fulfilled, (state, action) => {
        const { betId, teamRate } = action.payload;
        state.matchDetail.profitLossDataMatch = {
          ...state.matchDetail.profitLossDataMatch,
          [betId + "_profitLoss_" + state.matchDetail?.id]: teamRate,
        };
      })
      .addCase(updateTeamRatesOnMarketUndeclare.fulfilled, (state, action) => {
        const { betId, profitLossData } = action.payload;
        state.matchDetail.profitLossDataMatch = {
          ...state.matchDetail.profitLossDataMatch,
          [betId + "_profitLoss_" + state.matchDetail?.id]:
            profitLossData?.[betId + "_profitLoss_" + state.matchDetail?.id],
        };
      })
      .addCase(updateMatchRatesFromApiOnList.fulfilled, (state, action) => {
        const matchListFromApi = action.payload;
        if (
          state.matchListInplay?.matches?.length &&
          matchListFromApi?.length
        ) {
          const apiMatchMap = new Map();
          matchListFromApi.forEach((item: any) => {
            const id = Number(item.beventId || item.gmid);
            apiMatchMap.set(id, item);
          });
          state.matchListInplay.matches = state.matchListInplay.matches.map(
            (match: any) => {
              const matchFromApi = apiMatchMap.get(+match.eventId);
              if (matchFromApi) {
                return { ...match, ...matchFromApi };
              } else {
                delete match?.section;
                return match;
              }
            }
          );
        }
      })
      .addCase(amountupdate.fulfilled, (state, action) => {
        const { matchId, betId } = action.payload;
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
