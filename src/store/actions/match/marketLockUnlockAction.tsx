import { createAsyncThunk } from "@reduxjs/toolkit";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";
import { AxiosError } from "axios";

export const updateUserMatchLock = createAsyncThunk<any, any>(
  "/userMatchLock",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        `${ApiConstants.USER.USER_MATCH_LOCK}`,
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
export const getMatchLockAllChild = createAsyncThunk<any, any>(
  "/matchLockAllChild",
  async (_, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.USER.USER_MATCH_LOCK_ALL_CHILD}`
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
export const getUserDetailsForParent = createAsyncThunk<any, any>(
  "/userDetails_ForParent",
  async (id, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.USER.USER_DETAIL_FOR_PARENT}?userId=${id}`
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

export const getUserDetailsOfLock = createAsyncThunk<any, any>(
  "/userDetails_ForLock",
  async (id, thunkApi) => {
    try {
      const resp = await service.get(
        `${ApiConstants.USER.USER_CHECK_CHILD_DEACTIVATE}?matchId=${id}`
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
