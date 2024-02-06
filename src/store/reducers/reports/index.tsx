import { combineReducers } from "@reduxjs/toolkit";
import { profitLossReportReducer } from "./profitLossReportSlice";

export const reportReducer = combineReducers({
    reportList: profitLossReportReducer
});
