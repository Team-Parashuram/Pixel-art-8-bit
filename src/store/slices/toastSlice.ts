import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Toast {
  id: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  duration?: number;
  timestamp: number;
}

export interface ToastState {
  toasts: Toast[];
  history: Toast[];
  maxToasts: number;
}

const initialState: ToastState = {
  toasts: [],
  history: [],
  maxToasts: 5,
};

let toastId = 0;

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (
      state,
      action: PayloadAction<Omit<Toast, "id" | "timestamp">>,
    ) => {
      const toast: Toast = {
        ...action.payload,
        id: `toast-${++toastId}`,
        timestamp: Date.now(),
      };

      state.toasts.push(toast);
      state.history.push(toast);

      // Limit active toasts
      if (state.toasts.length > state.maxToasts) {
        state.toasts.shift();
      }

      // Keep only last 50 in history
      if (state.history.length > 50) {
        state.history = state.history.slice(-50);
      }
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload,
      );
    },
    clearAllToasts: (state) => {
      state.toasts = [];
    },
    clearHistory: (state) => {
      state.history = [];
    },
    setMaxToasts: (state, action: PayloadAction<number>) => {
      state.maxToasts = action.payload;
    },
  },
});

export const {
  addToast,
  removeToast,
  clearAllToasts,
  clearHistory,
  setMaxToasts,
} = toastSlice.actions;

export default toastSlice.reducer;
