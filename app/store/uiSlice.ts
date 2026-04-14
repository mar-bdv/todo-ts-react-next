import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../types/task";

type UiState = {
  modalTask: Task | null;
  isModalOpen: boolean;
};

const initialState: UiState = {
  modalTask: null,
  isModalOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<Task>) => {
      state.modalTask = action.payload;
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalTask = null;
    },
  },
});

export const { openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;