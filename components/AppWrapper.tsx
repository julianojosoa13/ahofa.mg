import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Stack, useRouter } from "expo-router";
import React, { FC, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useSelector } from "react-redux";
import {
  selectAppBusy,
  selectShoYesNoDialog,
  setAppBusy,
  setShowYesNoDialog,
} from "@/store/slices/appSlice";
import { useAppDispatch } from "@/store/store";
import i18n from "@/lib/i18n";
import { selectTranslationsLanguage } from "@/store/slices/translationsSlice";

interface Props {}

const AppWrapper: FC<Props> = (props) => {
  const router = useRouter();
  const [initializing, setInitializing] = useState(true);
  const [currentUser, setCurrentUser] = useState(
    {} as FirebaseAuthTypes.User | null
  );
  const busy = useSelector(selectAppBusy);
  const confirmDialog = useSelector(selectShoYesNoDialog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("Current User >>> ", currentUser);
    if (currentUser?.email) router.replace("/home");
  }, [currentUser]);

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setCurrentUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }
  const language = useSelector(selectTranslationsLanguage);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    const user = auth().currentUser;
    if (busy) dispatch(setAppBusy(false));
    if (confirmDialog) dispatch(setShowYesNoDialog(false));
    console.log("Current user >> ", user);

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
      <Stack.Screen name="index" />
      <Stack.Screen name="HomePage" />
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AppWrapper;
