import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface GlobalState {
  alert: {
    message: string;
    isShown: boolean;
    status: string;
    title: string;
  };
  isModalOpen: {
    isOpen: boolean;
    message: string;
  };
}

const initialState: GlobalState = {
  alert: {
    message: '',
    isShown: false,
    status: 'success',
    title: '',
  },
  modal: {
    isOpen: false,
    message: '',
  },
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    updateAlert: (
      state,
      action: PayloadAction<{
        message: string;
        isShown: boolean;
        status: 'error' | 'success' | 'info' | 'warning';
        title: 'Error' | 'Success' | 'Info' | 'Warning';
      }>
    ) => {
      state.alert = action.payload;
    },
    toggleModal: (
      state,
      action: PayloadAction<{
        isOpen: boolean;
        message: string;
      }>
    ) => {
      state.isModalOpen = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateAlert, toggleModal } = globalSlice.actions;

export default globalSlice.reducer;
