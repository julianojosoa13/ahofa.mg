import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Stack, useRouter } from "expo-router";
import React, { FC, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

interface Props {}

const AppWrapper: FC<Props> = (props) => {
  const router = useRouter();
  const [initializing, setInitializing] = useState(true);
  const [currentUser, setCurrentUser] = useState(
    {} as FirebaseAuthTypes.User | null
  );

  useEffect(() => {
    console.log("Current User >>> ", currentUser);
    if (currentUser?.email) router.replace("/Onboarding");
  }, [currentUser]);

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setCurrentUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const user = auth().currentUser;
    console.log("Current user >> ", user);

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="Onboarding" />
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AppWrapper;
