import { Stack } from "expo-router";
import { I18nextProvider } from "react-i18next";
import { Provider, useSelector } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "@/store/store";
import { useEffect } from "react";
import { selectTranslationsLanguage } from "@/store/slices/translationsSlice";

import "expo-dev-client";

import i18n from "@/lib/i18n";
// import { clearPersistedState } from "@/utils/helpers";

const SyncLanguageWithI18n = () => {
  const language = useSelector(selectTranslationsLanguage);
  console.log("sync Language >>> ", language);

  useEffect(() => {
    // clearPersistedState();
    // Set i18n language based on Redux store
    i18n.changeLanguage(language);
  }, [language]);

  return null; // This component doesn't render anything
};

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} key={"root"}>
        <SyncLanguageWithI18n />
        <I18nextProvider i18n={i18n}>
          <Stack screenOptions={{ headerShown: false }} />
        </I18nextProvider>
      </PersistGate>
    </Provider>
  );
}
