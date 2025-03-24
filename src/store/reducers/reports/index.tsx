import { combineReducers } from "@reduxjs/toolkit";
import { profitLossReportReducer } from "./profitLossReportSlice";
import { profitLossReportCardReducer } from "./cardProftiLossReportSlice";

export const reportReducer = combineReducers({
  reportList: profitLossReportReducer,
  cardReport: profitLossReportCardReducer,
});
