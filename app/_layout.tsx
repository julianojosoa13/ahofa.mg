import { router, Slot, Stack } from "expo-router";
import { I18nextProvider } from "react-i18next";
import { Provider, useDispatch, useSelector } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { persistor, store } from "@/store/store";

import "expo-dev-client";

import i18n from "@/lib/i18n";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

const FIREBASE_WEB_CLIENT_CLIENT_ID =
  process.env.EXPO_PUBLIC_FIREBASE_WEB_CLIENT_CLIENT_ID;

GoogleSignin.configure({
  webClientId: FIREBASE_WEB_CLIENT_CLIENT_ID,
});

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [currentUser, setCurrentUser] = useState(
    {} as FirebaseAuthTypes.User | null
  );

  useEffect(() => {
    console.log("Current User >>> ", currentUser);
    if (currentUser?.email) router.navigate("/Onboarding");
  }, [currentUser]);

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setCurrentUser(user);
    if (initializing) {
      setInitializing(false);
    }
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
              {initializing ? (
                <Slot />
              ) : (
                <Stack
                  screenOptions={{ headerShown: false }}
                  initialRouteName="index"
                />
              )}
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </I18nextProvider>
      </PersistGate>
    </Provider>
  );
}
