import Button from "@/components/ui/Button";
import { hp, wp } from "@/utils/screensize";
import React, { FC, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import auth from "@react-native-firebase/auth";
import { useAppDispatch } from "@/store/store";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";

import { LinearGradient } from "expo-linear-gradient";
import COLORS from "@/utils/colors";
import Animated, { FadeInDown } from "react-native-reanimated";
import { BlurView } from "@react-native-community/blur";

interface Props {}

const Onboarding: FC<Props> = (props) => {
  const { top } = useSafeAreaInsets();

  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/home");
    }, 2000);
  }, []);

  const user = auth().currentUser;
  return (
    <LinearGradient
      colors={[COLORS.bgColor, COLORS.mainColor]}
      style={[styles.container, { marginTop: top, paddingHorizontal: wp(4) }]}
    >
      <Image
        source={{ uri: user?.photoURL! }}
        style={{
          width: wp(33),
          height: wp(33),
          borderRadius: wp(33 / 2),
          borderWidth: 2.5,
          borderColor: COLORS.thirdColor,
          marginBottom: -hp(7),
          zIndex: 10,
        }}
      />
      <View
        style={{
          width: wp(45),
          height: hp(15),
          borderRadius: 16,
          backgroundColor: "rgba(255,255,255,0.5)",
          // elevation: 2,
        }}
      />

      <LottieView
        source={require("@/assets/animations/activityIndicator.json")}
        loop
        style={{ width: wp(25), height: wp(25), marginTop: -hp(10) }}
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
