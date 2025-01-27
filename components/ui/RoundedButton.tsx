import React, { useRef } from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons"; // Importing the 'plus' icon from @expo/vector-icons
import LottieView from "lottie-react-native";
import { hp, wp } from "@/utils/screensize";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectAppTheme } from "@/store/slices/appSlice";
import COLORS from "@/utils/colors";

interface Props {
  onPress?: () => void;
}

const RoundedButton = ({ onPress }: Props) => {
  const ref = useRef<LottieView | null>(null);
  const { t } = useTranslation();

  const theme = useSelector(selectAppTheme);

  const handlePress = () => {
    ref.current?.play();
    setTimeout(() => {
      if (onPress) onPress();
    }, 2000);
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      style={styles.container}
    >
      <Text
        style={{
          color: COLORS[theme].thirdColor,
          fontWeight: "bold",
          fontSize: hp(2),
          textTransform: "capitalize",
          marginBottom: -hp(1.5),
        }}
      >
        {t("add")}
      </Text>
      <LottieView
        ref={ref}
        source={require("@/assets/animations/addButton.json")}
        style={{
          width: wp(25),
          height: wp(25),
        }}
        loop={true}
        speed={0.5}
        autoPlay
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: wp(9.5),
    width: wp(19),
    height: wp(19),
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RoundedButton;
