import { createSlice } from "@reduxjs/toolkit";
import {
  getMatchLockAllChild,
  getUserDetailsForParent,
  getUserDetailsOfLock,
  updateUserMatchLock,
} from "../../actions/match/marketLockUnlockAction";

interface InitialState {
  childStatus: any;
  userMatchLock: any;
  matchLockAllChild: any;
  userDetailsForParent: any;
  success: boolean;
  statusSuccess: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  childStatus: {},
  userMatchLock: [],
  matchLockAllChild: [],
  userDetailsForParent: [],
  loading: false,
  success: false,
  statusSuccess: false,
  error: null,
};

const lockUnlockSlice = createSlice({
  name: "lockUnlock",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetailsOfLock.pending, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(getUserDetailsOfLock.fulfilled, (state, action) => {
        state.success = true;
        state.childStatus = action.payload;
        state.loading = false;
      })
      .addCase(getUserDetailsOfLock.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(updateUserMatchLock.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.statusSuccess = false;
      })
      .addCase(updateUserMatchLock.fulfilled, (state, action) => {
        state.loading = false;
        state.statusSuccess = true;
        state.userMatchLock = action.payload;
      })
      .addCase(updateUserMatchLock.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getMatchLockAllChild.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getMatchLockAllChild.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.matchLockAllChild = action.payload;
      })
      .addCase(getMatchLockAllChild.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getUserDetailsForParent.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getUserDetailsForParent.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userDetailsForParent = action.payload;
      })
      .addCase(getUserDetailsForParent.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      });
  },
});

export const lockUnlockReducer = lockUnlockSlice.reducer;
