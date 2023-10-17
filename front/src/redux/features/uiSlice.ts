import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SliceState = {
  loading: boolean;
  error: { id: string; message: string }[];
};
const initialState: SliceState = {
  error: [],
  loading: false,
};
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    addError(state, action: PayloadAction<{ id: string; message: string }>) {
      if (
        state.error.findIndex((item) => item.id === action.payload.id) === -1
      ) {
        state.error.push({
          id: action.payload.id,
          message: action.payload.message,
        });
      }
    },
    removeError(state, action: PayloadAction<string>) {
      state.error = state.error.filter((error) => error?.id !== action.payload);
    },
    removeErrors(state) {
      state.error = [];
    },
  },
});
export const { addError, removeError, removeErrors } = uiSlice.actions;
export default uiSlice.reducer;
