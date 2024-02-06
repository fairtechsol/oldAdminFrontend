import { combineReducers } from "@reduxjs/toolkit";
import { matchListReducer } from "./matchListSlice";
import { analysisListReducer } from "./matchAnalysisSlice";
import { sidebarListReducer } from "./sidebarListSlice";
import { betsReducer } from "./betPlacedSlice";

export const matchReducer = combineReducers({
  matchList: matchListReducer,
  analysisList: analysisListReducer,
  sideBarList: sidebarListReducer,
  bets: betsReducer,
});
