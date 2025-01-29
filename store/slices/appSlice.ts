import { onGoogleButtonPress } from "@/lib/firebase/googleSignIn";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore, {
  doc,
  getDoc,
  setDoc,
} from "@react-native-firebase/firestore";

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
  theme: "light" | "dark";
  userRegistered: boolean; // Nouvel état
  showYesNoDialog: boolean;
}

const initialState: StateTypes = {
  busy: false,
  firstStep: false,
  showLoginModal: false,
  error: {},
  selectedCategory: "houses",
  postType: "annoucement",
  showCategorySelectModal: false,
  theme: "light",
  userRegistered: false, // Initialisé à false
  showYesNoDialog: false,
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
    setAppTheme(state, aciton) {
      state.theme = aciton.payload;
    },
    setUserRegistered(state, action) {
      state.userRegistered = action.payload; // Nouveau reducer
    },
    setShowYesNoDialog(state, action) {
      state.showYesNoDialog = action.payload;
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

export const selectAppTheme = (state: RootState) => state.app.theme;

export const selectUserRegistered = (state: RootState) =>
  state.app.userRegistered;

export const selectShoYesNoDialog = (state: RootState) =>
  state.app.showYesNoDialog;

export const {
  setAppBusy,
  setAppFirstStep,
  setShowLoginModal,
  setAppError,
  setAppPostType,
  setAppSelectedCategory,
  setShowCategorySelectModal,
  setAppTheme,
  setUserRegistered,
  setShowYesNoDialog,
} = appSlice.actions;
export default appSlice.reducer;

export const loginStart = createAsyncThunk(
  "app/loginStart",
  async (_, thunkAPI) => {
    try {
      const response = await onGoogleButtonPress();
      if (!response) {
        throw new Error("Error signing User");
      }

      // Vérifier si l'utilisateur·rice est déjà enregistré·e dans Firestore
      const userId = response.uid;
      const userDocRef = firestore().collection("users").doc(userId);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists) {
        // Enregistrer l'utilisateur·rice dans Firestore
        await setDoc(userDocRef, {
          uid: userId,
          email: response?.email,
          displayName: response.displayName || "",
          photoURL: response.photoURL || "",
          createdAt: new Date().toISOString(),
        });
      }

      // Mettre à jour l'état userRegistered dans Redux
      thunkAPI.dispatch(setUserRegistered(true));

      return true; // Fulfilled action payload
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message); // Rejected action payload
    }
  }
);
