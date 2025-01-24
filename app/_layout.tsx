import { Stack } from "expo-router";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { persistor, store } from "@/store/store";

import "expo-dev-client";

import i18n from "@/lib/i18n";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { useEffect, useState } from "react";

const FIREBASE_WEB_CLIENT_CLIENT_ID =
  process.env.EXPO_PUBLIC_FIREBASE_WEB_CLIENT_CLIENT_ID;

GoogleSignin.configure({
  webClientId: FIREBASE_WEB_CLIENT_CLIENT_ID,
});

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

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
