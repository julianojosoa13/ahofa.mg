import { selectAppBusy } from "@/store/slices/appSlice";
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

  console.log("busy >> ", busy);
  return (
    <Modal style={styles.container} transparent visible={busy}>
      <StatusBar backgroundColor="rgba(255,255,255,0.75)" />
      <BlurView
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
        style={styles.contentContainer}
      >
        <View
          style={{
            alignSelf: "center",
            backgroundColor: "rgba(255,255,255,0.67)",
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
            style={{ width: wp(27.5), height: wp(27.5) }}
          />
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    flex: 1,
    width: wp(100),
    height: hp(100),
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BusyModal;
