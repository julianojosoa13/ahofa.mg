import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    user: null,
    busy: true,
    firstStep: false,
  },
  reducers: {
    setAppUser(state, action) {
      state.user = action.payload;
    },
    setAppBusy(state, action) {
      state.busy = action.payload;
    },
    setAppFirstStep(state, action) {
      state.firstStep = action.payload;
    },
  },
});

// Selectors
export const selectAppUser = (state) => state.app.user;
export const selectAppFirstStep = (state) => state.app.firstStep;
export const selectAppBusy = (state) => state.app.busy;

export const { setAppUser, setAppBusy, setAppFirstStep } = appSlice.actions;
export default appSlice.reducer;
