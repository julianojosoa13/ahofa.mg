import { Stack } from "expo-router";
import { I18nextProvider } from "react-i18next";
import { Provider, useDispatch, useSelector } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { persistor, store } from "@/store/store";

import "expo-dev-client";

import i18n from "@/lib/i18n";

import { GoogleSignin } from "@react-native-google-signin/google-signin";

const FIREBASE_WEB_CLIENT_CLIENT_ID =
  process.env.EXPO_PUBLIC_FIREBASE_WEB_CLIENT_CLIENT_ID;

GoogleSignin.configure({
  webClientId: FIREBASE_WEB_CLIENT_CLIENT_ID,
});

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <GestureHandlerRootView>
            <BottomSheetModalProvider>
              <Stack
                screenOptions={{ headerShown: false }}
                initialRouteName="index"
              />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </I18nextProvider>
      </PersistGate>
    </Provider>
  );
}
