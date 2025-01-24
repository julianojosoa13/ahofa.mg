import { selectAppBusy } from "@/store/slices/appSlice";
import { hp, wp } from "@/utils/screensize";
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
      <StatusBar backgroundColor="rgba(0,0,0,0.75)" />
      <View style={styles.contentContainer}>
        <View style={{ alignSelf: "center" }}>
          <LottieView
            source={require("@/assets/animations/activityIndicator.json")}
            autoPlay
            loop
            speed={1.25}
            style={{ width: wp(25), height: wp(25) }}
          />
        </View>
      </View>
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
    backgroundColor: "rgba(0,0,0,0.75)",
  },
});

export default BusyModal;
