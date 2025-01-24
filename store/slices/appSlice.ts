import { onGoogleButtonPress } from "@/lib/firebase/googleSignIn";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

const appSlice = createSlice({
  name: "app",
  initialState: {
    user: null,
    busy: true,
    firstStep: false,
    showLoginModal: false,
    error: null,
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
    setShowLoginModal(state, action) {
      state.showLoginModal = action.payload;
    },
    setAppError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginStart.pending, (state) => {
        state.busy = true;
        state.error = null;
      })
      .addCase(loginStart.fulfilled, (state, action) => {
        state.busy = false;
        state.user = action.payload;
      })
      .addCase(loginStart.rejected, (state, action) => {
        state.busy = false;
        state.error = action.payload;
      });
  },
});

export const loginStart = createAsyncThunk(
  "app/loginStart", // Action type prefix
  async (thunkAPI) => {
    try {
      const response = await onGoogleButtonPress();
      if (!response) {
        throw new Error("Error signing User");
      }

      return response; // Fulfilled action payload
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Rejected action payload
    }
  }
);

// Selectors
export const selectAppUser = (state: RootState) => state.app.user;
export const selectAppFirstStep = (state: RootState) => state.app.firstStep;
export const selectAppBusy = (state: RootState) => state.app.busy;
export const selectShowLoginModal = (state: RootState) =>
  state.app.showLoginModal;
export const selectAppError = (state: RootState) => state.app.error;

export const {
  setAppUser,
  setAppBusy,
  setAppFirstStep,
  setShowLoginModal,
  setAppError,
} = appSlice.actions;
export default appSlice.reducer;
