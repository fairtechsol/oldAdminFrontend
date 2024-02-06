import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/auth/authReducer";
import { userReducer } from "./reducers/user";
import { matchReducer } from "./reducers/match";
import { reportReducer } from "./reducers/reports";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    match: matchReducer,
    report: reportReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
