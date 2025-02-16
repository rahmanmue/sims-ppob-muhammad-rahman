import { configureStore } from "@reduxjs/toolkit";
import topUpReducer from "@/store/slices/topUpSlice";
import paymentReducer from "@/store/slices/paymentSlice";
import alertReducer from "@/store/slices/alertSlice";
import profileReducer from "@/store/slices/profileSlice"

export const store = configureStore({
  reducer: {
    topUpState: topUpReducer, // Menggunakan nama "topUpState"
    paymentState: paymentReducer,
    alertState: alertReducer,
    profile: profileReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
