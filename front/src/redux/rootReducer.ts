import uiReducer from "./features/uiSlice";
import userReducer from "./features/userSlice";
import modalReducer from "./features/modalSlice";
import trainingReducer from "./features/trainingSlice";
import { combineReducers } from "@reduxjs/toolkit";
import newsReducer from "./features/newsSlice";
import planReducer from "./features/planSlice";
export const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  modal: modalReducer,
  training: trainingReducer,
  news: newsReducer,
  plan: planReducer,
});
