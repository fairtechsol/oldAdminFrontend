import { createReducer } from "@reduxjs/toolkit";
import { authReset, login } from "../../actions/auth/authAction";

interface InitialState {
  success: boolean;
  loading: boolean;
  forceChangePassword: boolean;
  isTransPasswordCreated: boolean;
  userRole: string;
  error: any;
}

const initialState: InitialState = {
  success: false,
  loading: false,
  forceChangePassword: false,
  isTransPasswordCreated: false,
  userRole: "",
  error: null,
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
      state.userRole = action.payload.roleName;
      state.forceChangePassword = action?.payload?.forceChangePassword;
      state.isTransPasswordCreated = action?.payload?.isTransPasswordCreated;
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error?.message;
    })
    .addCase(authReset, (state) => {
      return { ...state, success: false, forceChangePassword: false };
    });
});
