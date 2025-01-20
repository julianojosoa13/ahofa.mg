import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "@react-native-async-storage/async-storage";
// import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web, AsyncStorage for React Native

import adsReducer from "@/store/slices/adsSlice";
import postsReducer from "@/store/slices/postsSlice";
import subscriptionsReducer from "@/store/slices/subscriptionsSlice";
import paymentsReducer from "@/store/slices/paymentsSlice";
import translationsReducer from "@/store/slices/translationsSlice";

// Import redux-logger
import logger from "redux-logger";

// Persist config
const persistConfig = {
  key: "persistedState",
  storage,
  whitelist: ["translations"], // Persist only translations state
};

const persistedTranslationsReducer = persistReducer(
  persistConfig,
  translationsReducer
);

export const store = configureStore({
  reducer: {
    ads: adsReducer,
    posts: postsReducer,
    subscriptions: subscriptionsReducer,
    payments: paymentsReducer,
    translations: persistedTranslationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true, // Include thunk middleware (enabled by default)
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger), // Add redux-logger to middleware chain
});

export const persistor = persistStore(store);
