import { selectAppTheme } from "@/store/slices/appSlice";
import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import { ImageStyle } from "expo-image";
import React, { FC, Fragment } from "react";
import { View, StyleProp, StyleSheet } from "react-native";
import Animated, {
  AnimatedStyle,
  EntryAnimationsValues,
  EntryExitAnimationFunction,
  FadeInDown,
} from "react-native-reanimated";
import { useSelector } from "react-redux";

interface Props {
  style: StyleProp<AnimatedStyle<StyleProp<ImageStyle>>>;
  entering: any;
}

const ThemedLogo: FC<Props> = ({ style, entering }) => {
  const theme = useSelector(selectAppTheme);

  const switchTheme = () => {
    if (theme === "dark")
      return (
        <Animated.Image
          entering={entering}
          source={require("@/assets/images/brand/trans_bg.png")}
          style={[
            style,
            theme == "dark" && { tintColor: COLORS[theme].secondaryColor },
          ]}
          resizeMode={"contain"}
        />
      );

    return (
      <Animated.Image
        entering={entering}
        source={require("@/assets/images/brand/trans_bg.png")}
        style={style}
        resizeMode={"contain"}
      />
    );
  };
  return (
    <View style={{ backgroundColor: "transparent" }}>{switchTheme()}</View>
  );
};

export default ThemedLogo;
