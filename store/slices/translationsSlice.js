import { createSlice } from "@reduxjs/toolkit";

const translationsSlice = createSlice({
  name: "translations",
  initialState: {
    language: "fr",
  },
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload;
    },
  },
});

// Selectors
export const selectTranslations = (state) => state.translations;
export const selectTranslationsLanguage = (state) =>
  state.translations.language;

export const { setLanguage } = translationsSlice.actions;
export default translationsSlice.reducer;
