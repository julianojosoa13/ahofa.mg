import { selectAppTheme } from "@/store/slices/appSlice";
import COLORS from "@/utils/colors";
import { hp } from "@/utils/screensize";
import React, { FC, ReactNode } from "react";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useSelector } from "react-redux";

interface Props {
  focused: boolean;
  children: ReactNode;
  delay: number;
}
const mbValue = hp(2.75);
const IconContainer: FC<Props> = ({ focused, children, delay }) => {
  const theme = useSelector(selectAppTheme);
  // Animated style for marginBottom
  const animatedStyle = useAnimatedStyle(() => {
    return {
      marginBottom: withTiming(focused ? mbValue : 0.5, { duration: 300 }),
    };
  }, [focused]);

  return (
    <Animated.View
      entering={FadeInDown.duration(300).delay(delay)}
      style={[
        animatedStyle,
        {
          backgroundColor: focused ? COLORS[theme].mainColor : "transparent",
          height: hp(6),
          width: hp(6),
          borderRadius: hp(3),
          justifyContent: "center",
          alignItems: "center",
          elevation: focused ? 5 : 0,
          borderWidth: focused ? 0.33 : 0,
          borderColor: COLORS[theme].mainColor,
          zIndex: 300,
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default IconContainer;
