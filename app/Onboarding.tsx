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
    }, 750);
  }, []);

  const user = auth().currentUser;
  return (
    <View
      style={[styles.container, { marginTop: top, paddingHorizontal: wp(4) }]}
    >
      <Image
        source={{ uri: user?.photoURL! }}
        style={{
          width: wp(20),
          height: wp(20),
          borderRadius: wp(10),
          borderWidth: 3.5,
          borderColor: "white",
          marginBottom: -hp(5),
          zIndex: 10,
        }}
      />
      <View
        style={{
          width: wp(45),
          height: hp(10),
          borderRadius: 22,
          backgroundColor: "rgba(255,255,255,0.95)",
          elevation: 4,
          zIndex: -1,
        }}
      />

      <LottieView
        source={require("@/assets/animations/activityIndicator.json")}
        loop
        style={{ width: wp(20), height: wp(20), marginTop: -hp(7.25) }}
        autoPlay
      />
    </View>
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
