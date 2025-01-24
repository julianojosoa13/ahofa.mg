import { hp, wp } from "@/utils/screensize";
import { BlurView } from "@react-native-community/blur";
import React, { FC } from "react";
import { Modal, SafeAreaView, StyleSheet, View } from "react-native";

interface Props {}

const LoginModal: FC<Props> = (props) => {
  return (
    <Modal transparent visible={true} style={styles.container}>
      <BlurView
        blurAmount={10}
        blurType="light"
        reducedTransparencyFallbackColor="white"
        style={styles.container}
      >
        <View style={styles.contentContainer}></View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, width: wp(100), height: hp(100) },
  contentContainer: {
    borderRadius: wp(5),
    backgroundColor: "white",
    flex: 1,
    marginVertical: hp(15),
    marginHorizontal: wp(7.5),
    elevation: 4,
  },
});

export default LoginModal;
