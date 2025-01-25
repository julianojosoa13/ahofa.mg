import Button from "@/components/ui/Button";
import { hp, wp } from "@/utils/screensize";
import React, { FC } from "react";
import { Image, SafeAreaView, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import auth from "@react-native-firebase/auth";
import { useAppDispatch } from "@/store/store";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";

import { LinearGradient } from "expo-linear-gradient";
import COLORS from "@/utils/colors";

interface Props {}

const Onboarding: FC<Props> = (props) => {
  const { top } = useSafeAreaInsets();

  const router = useRouter();
  const dispatch = useAppDispatch();

  const user = auth().currentUser;
  return (
    <LinearGradient
      colors={[COLORS.bgColor, COLORS.mainColor]}
      style={[styles.container, { marginTop: top, paddingHorizontal: wp(4) }]}
    >
      <Image
        source={{ uri: user?.photoURL! }}
        style={{ width: wp(33), height: wp(33), borderRadius: wp(33 / 2) }}
      />
      <LottieView
        source={require("@/assets/animations/activityIndicator.json")}
        loop
        style={{ width: wp(25), height: wp(25) }}
        autoPlay
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Onboarding;
