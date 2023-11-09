import uiReducer from "./features/uiSlice";
import userReducer from "./features/userSlice";
import modalReducer from "./features/modalSlice";
import trainingReducer from "./features/trainingSlice";
import { combineReducers } from "@reduxjs/toolkit";
export const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  modal: modalReducer,
  training: trainingReducer,
});
