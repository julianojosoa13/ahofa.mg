import { onGoogleButtonPress } from "@/lib/firebase/googleSignIn";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

interface StateTypes {
  busy: boolean;
  firstStep: boolean;
  showLoginModal: boolean;
  error: any;
  selectedCategory:
    | "houses"
    | "electronic"
    | "sounds"
    | "terrain"
    | "vehicles"
    | "none";

  postType: "offer" | "annoucement";
  showCategorySelectModal: boolean;
}
const initialState: StateTypes = {
  busy: false,
  firstStep: false,
  showLoginModal: false,
  error: {},
  selectedCategory: "none",
  postType: "annoucement",
  showCategorySelectModal: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
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
    setAppPostType(state, action) {
      state.postType = action.payload;
    },
    setAppSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setShowCategorySelectModal(state, action) {
      state.showCategorySelectModal = action.payload;
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
        state.error = null;
      })
      .addCase(loginStart.rejected, (state, action) => {
        state.busy = false;
        state.error = action.payload;
      });
  },
});

export const loginStart = createAsyncThunk(
  "app/loginStart",
  async (_, thunkAPI) => {
    try {
      const response = await onGoogleButtonPress();
      if (!response) {
        throw new Error("Error signing User");
      }
      return true; // Fulfilled action payload
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message); // Rejected action payload
    }
  }
);

// Selectors
export const selectAppFirstStep = (state: RootState) => state.app.firstStep;
export const selectAppBusy = (state: RootState) => state.app.busy;
export const selectShowLoginModal = (state: RootState) =>
  state.app.showLoginModal;
export const selectAppError = (state: RootState) => state.app.error;

export const selectAppPostType = (state: RootState) => state.app.postType;

export const selectAppSelectedCategory = (state: RootState) =>
  state.app.selectedCategory;

export const selectAppShowCategorySelectModal = (state: RootState) =>
  state.app.showCategorySelectModal;

export const {
  setAppBusy,
  setAppFirstStep,
  setShowLoginModal,
  setAppError,
  setAppPostType,
  setAppSelectedCategory,
  setShowCategorySelectModal,
} = appSlice.actions;
export default appSlice.reducer;
