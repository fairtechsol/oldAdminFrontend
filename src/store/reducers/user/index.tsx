import { combineReducers } from "@reduxjs/toolkit";
import { profileReducer } from "./profileSlice";
import { userListReducers } from "./userListSlice";
import { userUpdateReducer } from "./userUpdateSlice";
import { reportSliceReducers } from "./reportsSlice";

export const userReducer = combineReducers({
  profile: profileReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducers,
  reportList: reportSliceReducers,
});
