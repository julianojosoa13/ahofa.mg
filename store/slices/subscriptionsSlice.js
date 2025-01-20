import { createSlice } from "@reduxjs/toolkit";

const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState: {
    currentPlan: null,
    premiumFeatures: false,
  },
  reducers: {
    setSubscription(state, action) {
      state.currentPlan = action.payload;
      state.premiumFeatures = action.payload !== "free";
    },
  },
});

export const { setSubscription } = subscriptionsSlice.actions;
export default subscriptionsSlice.reducer;
