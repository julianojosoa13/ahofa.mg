import { combineReducers, configureStore } from "@reduxjs/toolkit";
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
import onboardingReducer from "@/store/slices/onboardingSlice";
import appReducer from "@/store/slices/appSlice";

// Import redux-logger
import logger from "redux-logger";
import { useDispatch } from "react-redux";

// Persist config
const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["translations", "onboarding"],
};

const rootReducer = combineReducers({
  app: appReducer,
  ads: adsReducer,
  posts: postsReducer,
  subscriptions: subscriptionsReducer,
  payments: paymentsReducer,
  translations: translationsReducer,
  onboarding: onboardingReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true, // Include thunk middleware (enabled by default)
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger), // Add redux-logger to middleware chain
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
