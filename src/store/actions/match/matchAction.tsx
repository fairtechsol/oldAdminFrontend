import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants, Constants } from "../../../utils/Constants";

export const getMatchListInplay = createAsyncThunk<any, any>(
  "matchList/inplay",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(ApiConstants.INPLAY.MATCHLIST, {
        params: {
          "match.matchType": requestData?.matchType,
          page: requestData?.currentPage,
          limit: Constants.pageLimit,
          sort: "match.startAt:ASC",
        },
      });
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getMatchDetail = createAsyncThunk<any, any>(
  "match/detail",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.GET}/${requestData}`
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getMatchDetailMarketAnalysis = createAsyncThunk<any, any>(
  "match/detailMarketAnalysis",
  async ({ matchId, userId }, thunkApi) => {
    try {
      const resp = await service.get(
        ApiConstants.MATCH.GET_MATCH_MARKET_ANALYSIS,
        {
          params: {
            matchId,
            userId,
          },
        }
      );
      if (resp) {
        return resp?.data?.[0];
      }
    } catch (error: any) {
      const err = error as AxiosError;
      throw thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getPlacedBets = createAsyncThunk<any, any>(
  "get/placedBets",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        ApiConstants.MATCH.GET_BETS + "/?matchId=" + requestData,
        {
          params: {
            result: `inArr${JSON.stringify(["PENDING", "UNDECLARE"])}`,
            sort: "betPlaced.createdAt:DESC",
          },
        }
      );
      if (resp?.data) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getSessionProLoss = createAsyncThunk<any, any>(
  "/getSessionProLoss",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.USER.RUN_AMOUNT}/${requestData?.id}?matchId=${requestData?.matchId}`
      );
      if (resp?.data && resp?.data?.profitLoss) {
        return {
          matchId: requestData?.matchId,
          id: requestData?.id,
          name: requestData?.name,
          type: requestData?.type,
          proLoss: resp?.data?.profitLoss,
        };
      } else {
        return {
          matchId: requestData?.matchId,
          id: requestData?.id,
          name: requestData?.name,
          type: requestData?.type,
          proLoss: [{ betPlaced: [] }],
        };
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const updateMultipleMatchDetail = createAsyncThunk<any, any>(
  "multipleMatch/update",
  async (data) => data
);

export const getCompetitionList = createAsyncThunk<any, any>(
  "competition/list",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.EXPERT.COMPETITIONLIST}${requestData}`
      );
      if (resp?.data) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getCompetitionDates = createAsyncThunk<any, any>(
  "competition/dates",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.EXPERT.COMPETITIONDATES}${requestData}`
      );
      if (resp?.data) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getCompetitionMatches = createAsyncThunk<any, any>(
  "competition/matches",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.EXPERT.COMPETITIONMATCHES}${requestData?.id}/${requestData?.date}`
      );
      if (resp?.data) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getUserProfitLoss = createAsyncThunk<any, any>(
  "get/userProfitLoss",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.USER.PROFIT_LOSS}/${requestData}`
      );
      if (resp?.data) {
        return resp?.data;
      }
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const AllBetDelete = createAsyncThunk<any, any>(
  "bet/allbet",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        ApiConstants.MATCH.BETDELETE,
        requestData
      );
      if (resp) {
        return resp?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const updateMatchRates = createAsyncThunk<any, any>(
  "/match/rates",
  async (matchDetails) => {
    return matchDetails;
  }
);
export const updateBetsPlaced = createAsyncThunk<any, any>(
  "/placed/bets",
  async (placedBets) => {
    return placedBets;
  }
);
export const updateMaxLossForBet = createAsyncThunk<any, any>(
  "/maxLoss/update",
  async (data) => {
    return data;
  }
);
export const updateMaxLossForDeleteBet = createAsyncThunk<any, any>(
  "/maxLossOnDelete/update",
  async (data) => {
    return data;
  }
);
export const amountupdate = createAsyncThunk<any, any>(
  "/maxLossOnDelete/amountupdate",
  async (data) => {
    return data;
  }
);

export const updateTeamRates = createAsyncThunk<any, any>(
  "/teamRates/update",
  async (data) => {
    return data;
  }
);
export const updateTeamRatesOnDelete = createAsyncThunk<any, any>(
  "/teamRates/updateOnDelete",
  async (data) => {
    return data;
  }
);
export const updateTeamRatesOnMarketUndeclare = createAsyncThunk<any, any>(
  "/teamRates/updateOnMarketUndeclare",
  async (data) => {
    return data;
  }
);
export const getSessionProfitLossMatchDetailFilter = createAsyncThunk<any, any>(
  "getSessionProfitLossMatchDetail/filter",
  async (requestData) => {
    return requestData;
  }
);
export const updateProfitLoss = createAsyncThunk<any, any>(
  "/placed/profitLoss",
  async (profitLoss) => {
    return profitLoss;
  }
);
export const addRunAmount = createAsyncThunk<any, any>(
  "/placed/addRunAmount",
  async (profitLoss) => {
    return profitLoss;
  }
);
export const removeRunAmount = createAsyncThunk<any, any>(
  "/remove/runAmount",
  async (profitLoss) => {
    return profitLoss;
  }
);

export const updateMaxLossForBetOnUndeclare = createAsyncThunk<any, any>(
  "/maxLoss/updateOnUndeclare",
  async (data) => {
    return data;
  }
);
export const updatePlacedbets = createAsyncThunk<any, any>(
  "/maxLoss/updatePlacedbets",
  async (data) => {
    return data;
  }
);

export const setCurrentOdd = createAsyncThunk<any, any>(
  "update/currentOdd",
  async (requestData) => {
    return requestData;
  }
);
export const updatePlacedbetsDeleteReason = createAsyncThunk<any, any>(
  "update/updatePlacedbetsDeleteReason",
  async (requestData) => {
    return requestData;
  }
);

export const updateMatchRatesFromApiOnList = createAsyncThunk<any, any>(
  "/updateMatchRatesFromApiOnList/rates",
  async (data) => {
    return data;
  }
);

export const matchListReset = createAction("matchList/reset");
export const analysisListReset = createAction("analysisList/reset");
export const resetcompetitionList = createAction("competitionList/reset");
export const resetCompetitionDates = createAction("competitionDates/reset");
export const resetCompetitionMatches = createAction("competitionMatches/reset");
export const resetUserProfitLoss = createAction("userProfitLoss/reset");
export const resetMarketAnalysys = createAction("marketAnalysis/reset");
export const resetBetSessionProfitLossGraph = createAction(
  "betSessionProfitLossGraph/reset"
);
export const matchListInplaySuccessReset = createAction(
  "matchListInplaySuccess/reset"
);
