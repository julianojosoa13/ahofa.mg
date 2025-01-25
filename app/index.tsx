import { hp, wp } from "@/utils/screensize";
import { BlurView } from "@react-native-community/blur";
import LottieView from "lottie-react-native";
import React, { FC } from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";

interface Props {}

const Index: FC<Props> = (props) => {
  return (
    <View style={styles.contentContainer}>
      <BlurView
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
        style={styles.contentContainer}
      >
        <View
          style={{
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("@/assets/images/brand/trans_bg.png")}
            style={{
              width: wp(27.5),
              height: hp(27.5),
              marginBottom: -hp(7.5),
            }}
            resizeMode={"contain"}
          />

          <LottieView
            source={require("@/assets/animations/activityIndicator.json")}
            autoPlay
            loop
            speed={1.25}
            style={{ width: wp(20), height: wp(20) }}
          />
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    width: wp(100),
    height: hp(100),
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Index;
