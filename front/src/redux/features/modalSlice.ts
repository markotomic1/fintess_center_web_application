import { ModalState } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ModalState = {
  modalType: "closed",
};
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<ModalState>) {
      state.modalType = action.payload.modalType;
    },
    closeModal(state) {
      state.modalType = "closed";
    },
  },
});
export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
