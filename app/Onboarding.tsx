import Button from "@/components/ui/Button";
import { wp } from "@/utils/screensize";
import React, { FC } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useAppDispatch } from "@/store/store";
import { setAppBusy, setShowLoginModal } from "@/store/slices/appSlice";
import BusyModal from "@/components/modals/BusyModal";
import { router } from "expo-router";

interface Props {}

const Onboarding: FC<Props> = (props) => {
  const { top } = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  return (
    <SafeAreaView
      style={[styles.container, { marginTop: top, paddingHorizontal: wp(4) }]}
    >
      <Text>onBoarding</Text>
      <Button
        style={{ backgroundColor: "red" }}
        title="Se Deconnecter"
        action={async () => {
          dispatch(setAppBusy(true));
          await GoogleSignin.signOut();
          await auth().signOut();
          router.dismissTo("/");
          dispatch(setAppBusy(false));
          dispatch(setShowLoginModal(true));
        }}
      />
      <BusyModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Onboarding;
