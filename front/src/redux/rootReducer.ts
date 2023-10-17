import uiReducer from "./features/uiSlice";
import userReducer from "./features/userSlice";
import { combineReducers } from "@reduxjs/toolkit";
export const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
});
