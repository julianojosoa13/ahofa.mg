import { Stack } from "expo-router";
import { I18nextProvider } from "react-i18next";
import { Provider, useSelector } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "@/store/store";

import "expo-dev-client";

import i18n from "@/lib/i18n";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <Stack
            screenOptions={{ headerShown: false }}
            initialRouteName="index"
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="Onboarding" />
          </Stack>
        </I18nextProvider>
      </PersistGate>
    </Provider>
  );
}
