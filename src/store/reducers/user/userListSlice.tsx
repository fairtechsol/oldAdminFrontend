import { createSlice } from "@reduxjs/toolkit";
import {
  changeAmmountUser,
  changePasswordRow,
  getAlreadyUserExist,
  getSearchClientList,
  getTotalBalance,
  getUserList,
  getUserWiseExposure,
  handleDeleteUser,
  handleExport,
  handleSettleCommission,
  resetUserWiseExposureList,
  setCreditRefference,
  setExposureLimit,
  setLockUnlockUser,
  userListSuccessReset,
} from "../../actions/user/userAction";

interface InitialState {
  userDetail: any;
  userAlreadyExist: boolean;
  userList: any;
  success: boolean;
  loading: boolean;
  error: any;
  totalBalance: any;
  userModalList: any;
  openModal: boolean;
  userElement: any;
  searchUserList: any;
  userWiseExposureList: any;
}

const initialState: InitialState = {
  userDetail: null,
  userAlreadyExist: false,
  userList: null,
  success: false,
  loading: false,
  error: null,
  searchUserList: [],
  totalBalance: null,
  userModalList: null,
  openModal: false,
  userElement: null,
  userWiseExposureList: {},
};

export const userList = createSlice({
  name: "userList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleExport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleExport.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(handleExport.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getUserList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.userList = action?.payload;
        state.loading = false;
      })
      .addCase(getUserList.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(changeAmmountUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeAmmountUser.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(changeAmmountUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(setCreditRefference.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setCreditRefference.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(setCreditRefference.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(setExposureLimit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setExposureLimit.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(setExposureLimit.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(setLockUnlockUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setLockUnlockUser.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(setLockUnlockUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(changePasswordRow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePasswordRow.fulfilled, (state) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(changePasswordRow.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(handleSettleCommission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleSettleCommission.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(handleSettleCommission.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(handleDeleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleDeleteUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(handleDeleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getAlreadyUserExist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAlreadyUserExist.fulfilled, (state, action) => {
        state.loading = false;
        state.userAlreadyExist = action?.payload;
      })
      .addCase(getAlreadyUserExist.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(userListSuccessReset, (state) => {
        state.success = false;
      })
      .addCase(getTotalBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTotalBalance.fulfilled, (state, action) => {
        state.totalBalance = action?.payload;
        state.loading = false;
      })
      .addCase(getTotalBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getSearchClientList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSearchClientList.fulfilled, (state, action) => {
        state.loading = false;
        state.searchUserList = action?.payload;
      })
      .addCase(getSearchClientList.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getUserWiseExposure.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserWiseExposure.fulfilled, (state, action) => {
        state.loading = false;
        state.userWiseExposureList = action?.payload;
      })
      .addCase(getUserWiseExposure.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(resetUserWiseExposureList, (state) => {
        state.userWiseExposureList = {};
      });
  },
});

export const userListReducers = userList.reducer;
