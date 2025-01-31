import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState: {
    acceptedToS: false,
  },
  reducers: {
    setAcceptedToS(state, action) {
      state.acceptedToS = action.payload;
    },
  },
});

// Selectors
export const selectAcceptedToS = (state: RootState) =>
  state.onboarding.acceptedToS;

export const { setAcceptedToS } = onboardingSlice.actions;
export default onboardingSlice.reducer;
