import { createSlice } from "@reduxjs/toolkit";
import {
  changePassword,
  changePasswordReset,
  getMyAccountDetails,
  getUsersProfile,
  marqueeNotification,
  profileReset,
} from "../../actions/user/userAction";

interface InitialState {
  transactionPassword: any;
  myAccountDetails: any;
  profileDetail: any;
  success: boolean;
  loading: boolean;
  error: any;
  marqueeNotification: any;
}

const initialState: InitialState = {
  marqueeNotification: null,
  myAccountDetails: null,
  transactionPassword: "",
  profileDetail: null,
  loading: false,
  success: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.transactionPassword = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getUsersProfile.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getUsersProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.profileDetail = action.payload;
      })
      .addCase(getUsersProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(getMyAccountDetails.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getMyAccountDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.myAccountDetails = action.payload;
      })
      .addCase(getMyAccountDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(marqueeNotification.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(marqueeNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.marqueeNotification = action.payload;
      })
      .addCase(marqueeNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(profileReset, (state) => {
        return { ...state, success: false };
      })
      .addCase(changePasswordReset, (state) => {
        return { ...state, success: false, transactionPassword: "" };
      });
  },
});

export const profileReducer = profileSlice.reducer;
