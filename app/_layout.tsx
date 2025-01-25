import { Slot, Stack } from "expo-router";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
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
    function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
      setCurrentUser(user);
      setInitializing(false);
    }

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // Unsubscribe on unmount
  }, []);

  if (initializing) {
    return (
      <Stack initialRouteName="index" screenOptions={{ headerShown: false }} />
    ); // Optionally add a splash screen or loading indicator here
  }

  // Conditionally return layouts
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            {currentUser ? (
              <I18nextProvider i18n={i18n}>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="home" />
                  {/* Add other connected routes */}
                </Stack>
              </I18nextProvider>
            ) : (
              <I18nextProvider i18n={i18n}>
                <Stack
                  screenOptions={{ headerShown: false }}
                  initialRouteName="Onboarding"
                >
                  <Stack.Screen name="Onboarding" />
                </Stack>
              </I18nextProvider>
            )}
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}
