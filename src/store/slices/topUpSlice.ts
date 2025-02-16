import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TopUpState {
  top_up_amount: number;
}

const initialState: TopUpState = {
  top_up_amount: 0,
};

const topUpSlice = createSlice({
  name: "topUp",
  initialState,
  reducers: {
    setTopUpAmount: (state, action: PayloadAction<number>) => {
      state.top_up_amount = action.payload;
    },
  },
});

export const { setTopUpAmount } = topUpSlice.actions;
export default topUpSlice.reducer;
