import { selectAppTheme } from "@/store/slices/appSlice";
import COLORS from "@/utils/colors";
import { wp } from "@/utils/screensize";
import LottieView from "lottie-react-native";
import React, { FC, useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import auth from "@react-native-firebase/auth";
import { Image } from "expo-image";
import ThemedLogo from "@/components/ui/ThemedLogo";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

interface Props {}

const Loading: FC<Props> = (props) => {
  const theme = useSelector(selectAppTheme);
  const styles = createStyles(theme);
  const user = auth().currentUser;
  const router = useRouter();

  useEffect(() => {
    if (!user) setTimeout(() => router.replace("/HomePage"), 2000);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={theme == "light" ? "dark" : "light"} />
      <ThemedLogo style={styles.logo} entering={null} />

      <LottieView
        source={require("@/assets/animations/activityIndicator.json")}
        autoPlay
        loop
        style={styles.anim}
      />
      {/* {user && (
        <Image source={{ uri: user?.photoURL }} style={styles.userAvatar} />
      )} */}
    </SafeAreaView>
  );
};

const createStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS[theme].softBgColor,
    },
    anim: {
      width: wp(25),
      height: wp(25),
    },
    userAvatar: {
      width: wp(20),
      height: wp(20),
      borderRadius: wp(10),
      borderWidth: 4,
      borderColor: COLORS[theme].thirdColor,
    },
    logo: {
      width: wp(35),
      height: wp(35),
    },
  });

export default Loading;
