import uiReducer from "./features/uiSlice";

import { combineReducers } from "@reduxjs/toolkit";
export const rootReducer = combineReducers({ ui: uiReducer });
