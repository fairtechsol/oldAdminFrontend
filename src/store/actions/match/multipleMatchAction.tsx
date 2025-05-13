import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants, Constants } from "../../../utils/Constants";

export const getAnalysisList = createAsyncThunk<any, any>(
  "analysis/list",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.get(ApiConstants.INPLAY.MATCHLIST, {
        params: {
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

export const updateMaxLossForBetForMultipleMatch = createAsyncThunk<any, any>(
  "/maxLoss/updateMultiMatch",
  async (data) => {
    return data;
  }
);
export const updateBetDataOnDeclareOfMultipleMatch = createAsyncThunk<any, any>(
  "/maxLoss/updateBetDataOnDeclareOfMultipleMatch",
  async (data) => {
    return data;
  }
);
export const updateTeamRatesOfMultipleMatch = createAsyncThunk<any, any>(
  "/maxLoss/updateTeamRatesOfMultipleMatch",
  async (data) => {
    return data;
  }
);
export const updateMaxLossForBetOnUndeclareForMultipleMatch = createAsyncThunk<
  any,
  any
>("/maxLoss/updateMaxLossForBetOnUndeclareForMultipleMatch", async (data) => {
  return data;
});

export const updateTeamRatesOnDeleteForMultiMatch = createAsyncThunk<any, any>(
  "/maxLoss/updateTeamRatesOnDeleteForMultiMatch",
  async (data) => {
    return data;
  }
);
export const updateMaxLossForDeleteBetForMultiMatch = createAsyncThunk<
  any,
  any
>("/maxLoss/updateMaxLossForDeleteBetForMultiMatch", async (data) => {
  return data;
});

export const updateMatchRatesOnMarketUndeclareForMulti = createAsyncThunk<
  any,
  any
>("/maxLoss/updateMatchRatesOnMarketUndeclareForMulti", async (data) => {
  return data;
});
