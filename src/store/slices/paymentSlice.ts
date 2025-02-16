import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaymentState {
    service_code: string,
    service_icon : string,
    service_name :string,
    service_tariff : number
}

const initialState: PaymentState = {
    service_code: "",
    service_icon : "",
    service_name :"",
    service_tariff : 0
};


const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPayment: (state, action: PayloadAction<PaymentState>) => {
        state.service_code = action.payload.service_code;
        state.service_icon = action.payload.service_icon; 
        state.service_name = action.payload.service_name; 
        state.service_tariff = action.payload.service_tariff; 
    },
  },
});

export const { setPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
