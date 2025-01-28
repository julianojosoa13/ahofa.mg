import React, { FC } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Button from "./Button";
import { hp, wp } from "@/utils/screensize";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/store/store";
import { setAppBusy, setShowLoginModal } from "@/store/slices/appSlice";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";

interface Props {}

const LogOutButton: FC<Props> = (props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = auth().currentUser;

  const handleSignOut = async () => {
    // dispatch(setAppBusy(true));
    try {
      await GoogleSignin.signOut();
      if (user?.email) await auth().signOut();
      console.log("Router >> ", router);
      dispatch(setAppBusy(true));
      setTimeout(() => {
        dispatch(setAppBusy(false));
        router.dismissTo("/HomePage");
      }, 1200);
      setTimeout(() => {
        dispatch(setShowLoginModal(true));
      }, 3500);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button
      title={t("sign out")}
      action={handleSignOut}
      style={{
        backgroundColor: "rgba(255,0,0,0.2)",
        marginHorizontal: wp(4),
        height: hp(5),
        elevation: 0,
      }}
      textStyle={{
        color: "rgba(255,0,0,01)",
        fontWeight: "600",
        fontSize: hp(1.6),
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default LogOutButton;
