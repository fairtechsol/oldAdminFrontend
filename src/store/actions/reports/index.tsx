import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";

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
          requestData.pageLimit
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
        `${ApiConstants.WALLET.REPORTS.CURRENT_BETS}?status=PENDING&searchBy=${
          requestData?.searchBy || ""
        }&keyword=${requestData?.keyword || ""}&sort=betPlaced.createdAt:DESC`
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

export const getCommissionMatch = createAsyncThunk<any, any>(
  "commissionMatch/list",
  async (userId, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.USER.COMMISSION_MATCH}/${userId}`
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
export const getCommissionBetPlaced = createAsyncThunk<any, any>(
  "commissionBetPlaced/list",
  async ({ userId, matchId }, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.USER.COMMISSION_BET_PLACED}/${userId}?matchId=${matchId}`
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
export const getUserTotalProfitLossCards = createAsyncThunk<any, any>(
  "/usrTotalProfitLossCards",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.CARD.GET_TOTAL_PROFIT_LOSS}`,
        requestData?.filter ? requestData?.filter : requestData
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

export const getMatchWiseProfitLossCards = createAsyncThunk<any, any>(
  "/matchWiseProfitLossCards",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.CARD.GET_GAME_WISE_PROFIT_LOSS}`,
        requestData
      );
      if (resp) {
        return { result: resp?.data?.result, count: resp?.data?.count };
      }
    } catch (error: any) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.response?.status);
    }
  }
);

export const getBetProfitLossCards = createAsyncThunk<any, any>(
  "bet/list/cards",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.CARD.GET_TOTAL_BET_PROFIT_LOSS}`,
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
export const updateUserSearchId = createAsyncThunk<any, any>(
  "/maxLoss/updateUserSearchId",
  async (data) => {
    return data;
  }
);
export const resetSessionProfitLoss = createAction("sessionProfitLoss/reset");
export const resetBetProfitLoss = createAction("betProfitLoss/reset");
export const resetDomainProfitLoss = createAction("domainProfitLoss/reset");

