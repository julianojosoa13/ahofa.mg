import DynamicHeader from "@/components/DynamicHeader";
import DynamicStatusBar from "@/components/DynamicStatusBar";
import BusyModal from "@/components/modals/BusyModal";
import { selectAppTheme } from "@/store/slices/appSlice";
import COLORS from "@/utils/colors";
import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { FC, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";

interface Props {}

const Create: FC<Props> = (props) => {
  const theme = useSelector(selectAppTheme);
  const styles = createStyles(theme);
  const router = useRouter();

  const isFocused = useIsFocused();

  useEffect(() => {
    router.navigate("/CreatePost");
  }, [isFocused]);
  return (
    <LinearGradient
      colors={[
        "rgba(0,0,150,0.5)",
        theme == "light" ? "rgba(255,250,250,0.5)" : "rgba(0,0,0,0.5)",
      ]}
      start={{ x: 0.6, y: 0.15 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <BusyModal />
      <DynamicStatusBar />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LottieView
          source={require("@/assets/animations/activityIndicator.json")}
          style={{ width: 100, height: 100 }}
          autoPlay
        />
      </View>
    </LinearGradient>
  );
};

const createStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS[theme].softBgColor,
    },
  });

export default Create;
