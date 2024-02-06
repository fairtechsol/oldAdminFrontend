import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../../../service";
import { AxiosError } from "axios";
import { ApiConstants, Constants } from "../../../utils/Constants";

export const getMatchListInplay = createAsyncThunk<any, any>(
  "matchList/inplay",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.INPLAY.MATCHLIST}?page=${requestData?.currentPage}&limit=${Constants.pageLimit}&sort=match.startAt:ASC`
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
export const getAnalysisList = createAsyncThunk<any, any>(
  "analysis/list",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.INPLAY.MATCHLIST}?page=${requestData?.currentPage}&limit=${Constants.pageLimit}&sort=match.startAt:ASC`
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

export const getPlacedBets = createAsyncThunk<any, any>(
  "get/placedBets",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${
          ApiConstants.MATCH.GET_BETS
        }?betPlaced.matchId=${requestData}&result=inArr${JSON.stringify([
          "PENDING",
          "UNDECLARE",
        ])}`
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

export const getMultipleMatchDetail = createAsyncThunk<any, any>(
  "multipleMatch/detail",
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

export const AllBetDelete = createAsyncThunk<any, any>(
  "bet/allbet",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.MATCH.BETDELETE}`,
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

export const updateMatchListRates = createAsyncThunk<any, any>(
  "/matchList/rates",
  async (matchList) => {
    return matchList;
  }
);
export const updateMatchRates = createAsyncThunk<any, any>(
  "/match/rates",
  async (matchDetails) => {
    return matchDetails;
  }
);

export const matchListReset = createAction("matchList/reset");
export const analysisListReset = createAction("analysisList/reset");
