import { createSlice } from "@reduxjs/toolkit";

const paymentsSlice = createSlice({
  name: "payments",
  initialState: {
    paymentStatus: "idle", // 'success', 'failed'
    selectedMethod: null, // Stripe, Google Pay, etc.
  },
  reducers: {
    setPaymentMethod(state, action) {
      state.selectedMethod = action.payload;
    },
    setPaymentStatus(state, action) {
      state.paymentStatus = action.payload;
    },
  },
});

export const { setPaymentMethod, setPaymentStatus } = paymentsSlice.actions;
export default paymentsSlice.reducer;
