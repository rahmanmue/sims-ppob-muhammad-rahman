import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlertState {
  status : "success" | "error" | null;
  message: string | null
}

const initialState: AlertState = {
  status : null,
  message: null,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<{message:string; status: AlertState["status"]}>) => {
        state.message = action.payload.message;
        state.status = action.payload.status
    },
    hideAlert: (state) => {
        state.message = null;
        state.status = null;
    }
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
