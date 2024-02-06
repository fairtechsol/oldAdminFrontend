import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../../../service";
import { ApiConstants, Constants } from "../../../utils/Constants";
import { AxiosError } from "axios";

interface AccountStatement {
  id: string;
  searchBy?: any;
  page: number;
  keyword?: any;
  filter?: any;
  pageLimit?: any;
}
interface currentBets {
  searchBy?: any;
  keyword?: any;
  filter?: any;
}

export const getAccountStatement = createAsyncThunk<any, AccountStatement>(
  "accountStatement/list",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.WALLET.REPORTS.GETACCOUNTSTATEMENT}/${
          requestData?.id
        }?page=${requestData?.page ? requestData?.page : 1}&limit=${
          requestData.pageLimit ? requestData.pageLimit : Constants.pageLimit
        }&searchBy=${requestData?.searchBy || ""}&keyword=${
          requestData?.keyword || ""
        }${requestData?.filter || ""}&sort=transaction.createdAt:DESC`
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
export const getCurrentBets = createAsyncThunk<any, currentBets>(
  "currentBets/list",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.WALLET.REPORTS.CURRENT_BETS}?&searchBy=${
          requestData?.searchBy || ""
        }&keyword=${requestData?.keyword || ""}`
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

export const getTotalProfitLoss = createAsyncThunk<any, any>(
  "totalProfitLoss/list",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.TOTAL_PROFIT_LOSS}?${requestData.filter}`
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
export const getDomainProfitLoss = createAsyncThunk<any, any>(
  "domainProfitLoss/list",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.DOMAIN_PROFIT_LOSS}?url=${requestData.url}&type=${requestData.type}${requestData.filter}`
      );
      if (resp) {
        return resp?.data?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getBetProfitLoss = createAsyncThunk<any, any>(
  "bet/list",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.BET_PROFIT_LOSS}?matchId=${requestData.matchId}${
          requestData.betId ? `&betId=${requestData.betId}` : ""
        }&isSession=${requestData.isSession}&url=${requestData.url}`
      );
      if (resp) {
        return resp?.data?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);
export const getSessionProfitLoss = createAsyncThunk<any, any>(
  "session/list",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.MATCH.SESSION_PROFIT_LOSS}?matchId=${requestData.matchId}&url=${requestData.url}`
      );
      if (resp) {
        return resp?.data?.data;
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const resetAccountStatement = createAction("statement/reset");
export const resetSessionProfitLoss = createAction("sessionProfitLoss/reset");
export const resetBetProfitLoss = createAction("betProfitLoss/reset");
export const resetDomainProfitLoss = createAction("domainProfitLoss/reset");
