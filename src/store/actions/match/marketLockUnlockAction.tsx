import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";

export const updateUserMatchLock = createAsyncThunk<any, any>(
  "/userMatchLock",
  async (requestData, thunkApi) => {
    try {
      const resp = await service.post(
        ApiConstants.USER.USER_MATCH_LOCK,
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
export const getUserDetailsOfLock = createAsyncThunk<any, any>(
  "/userDetails_ForLock",
  async (id, thunkApi) => {
    try {
      const resp = await service.get(
        ApiConstants.USER.USER_CHECK_CHILD_DEACTIVATE,
        {
          params: { matchId: id },
        }
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
