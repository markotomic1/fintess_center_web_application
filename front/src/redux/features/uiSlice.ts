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
    addError: (
      state,
      action: PayloadAction<{ id: string; message: string }>
    ) => {
      state.error.push({
        id: action.payload.id,
        message: action.payload.message,
      });
    },
    removeError: (state, action: PayloadAction<string>) => {
      state.error = state.error.filter((error) => error?.id !== action.payload);
    },
  },
});
export const { addError, removeError } = uiSlice.actions;
export default uiSlice.reducer;
