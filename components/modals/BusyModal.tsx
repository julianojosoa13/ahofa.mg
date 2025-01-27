import { selectAppBusy, selectAppTheme } from "@/store/slices/appSlice";
import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import { BlurView } from "@react-native-community/blur";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import React, { FC } from "react";
import { Modal, SafeAreaView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

interface Props {}

const BusyModal: FC<Props> = (props) => {
  const busy = useSelector(selectAppBusy);

  const theme = useSelector(selectAppTheme);

  const styles = createStyles(theme);

  console.log("busy >> ", busy);
  return (
    <Modal style={styles.container} transparent visible={busy}>
      <StatusBar
        // backgroundColor={COLORS[theme].bgColor}
        style={theme === "light" ? "dark" : "light"}
      />
      <BlurView
        blurType={theme}
        blurAmount={10}
        reducedTransparencyFallbackColor={theme === "light" ? "white" : "dark"}
        style={styles.contentContainer}
      >
        <View
          style={{
            alignSelf: "center",
            // backgroundColor: "rgba(255,255,255,0.67)",
            borderRadius: wp(5),
            // borderWidth: 1,
            borderColor: "white",
          }}
        >
          <LottieView
            source={require("@/assets/animations/activityIndicator.json")}
            autoPlay
            loop
            speed={1.25}
            style={{ width: wp(20), height: wp(20) }}
          />
        </View>
      </BlurView>
    </Modal>
  );
};

const createStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    container: { zIndex: 10 },
    contentContainer: {
      flex: 1,
      width: wp(100),
      height: hp(100),
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default BusyModal;
