import { Slot, Stack } from "expo-router";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { persistor, store } from "@/store/store";

import { createNotifications } from "react-native-notificated";

import "expo-dev-client";
import i18n from "@/lib/i18n";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import AppWrapper from "@/components/AppWrapper";

const FIREBASE_WEB_CLIENT_CLIENT_ID =
  process.env.EXPO_PUBLIC_FIREBASE_WEB_CLIENT_CLIENT_ID;

GoogleSignin.configure({
  webClientId: FIREBASE_WEB_CLIENT_CLIENT_ID,
});

export default function RootLayout() {
  const { NotificationsProvider, useNotifications, ...events } =
    createNotifications();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <GestureHandlerRootView>
            <NotificationsProvider>
              <BottomSheetModalProvider>
                <AppWrapper />
              </BottomSheetModalProvider>
            </NotificationsProvider>
          </GestureHandlerRootView>
        </I18nextProvider>
      </PersistGate>
    </Provider>
  );
}
