import { createSlice } from "@reduxjs/toolkit";
import {
  addReset,
  addUser,
  getUsersDetail,
  updateReset,
  updateUser,
  updateUserReset,
} from "../../actions/user/userAction";

interface InitialState {
  userDetail: any;
  success: boolean;
  addSuccess: boolean;
  editSuccess: boolean;
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  userDetail: null,
  loading: false,
  success: false,
  addSuccess: false,
  editSuccess: false,
  error: null,
};

const userUpdateSlice = createSlice({
  name: "userUpdate",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state) => {
        state.addSuccess = true;
        state.loading = false;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.editSuccess = true;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(getUsersDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.userDetail = null;
      })
      .addCase(getUsersDetail.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.userDetail = action.payload;
      })
      .addCase(getUsersDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(updateReset, (state) => {
        state.userDetail = null;
        state.loading = false;
        state.success = false;
        state.error = null;
      })
      .addCase(addReset, (state) => {
        state.addSuccess = false;
      })
      .addCase(updateUserReset, (state) => {
        state.editSuccess = false;
      });
  },
});

export const userUpdateReducer = userUpdateSlice.reducer;
