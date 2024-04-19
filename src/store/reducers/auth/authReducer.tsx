import { createReducer } from "@reduxjs/toolkit";
import { authReset, checkOldPass, login } from "../../actions/auth/authAction";

interface InitialState {
  success: boolean;
  loading: boolean;
  forceChangePassword: boolean;
  isTransPasswordCreated: boolean;
  userRole: string;
  error: any;
  oldPasswordMatched:boolean;
}

const initialState: InitialState = {
  success: false,
  loading: false,
  forceChangePassword: false,
  isTransPasswordCreated: false,
  userRole: "",
  error: null,
  oldPasswordMatched: false,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.userRole = action?.payload?.roleName;
      state.forceChangePassword = action?.payload?.forceChangePassword;
      state.isTransPasswordCreated = action?.payload?.isTransPasswordCreated;
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error?.message;
    })
    .addCase(authReset, (state) => {
      state.success = false;
      state.forceChangePassword = false;
    })
    .addCase(checkOldPass.pending, (state) => {
      state.loading = true;
      state.oldPasswordMatched = false;
    })
    .addCase(checkOldPass.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.oldPasswordMatched = action?.payload
    })
    .addCase(checkOldPass.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error?.message;
    });
});
