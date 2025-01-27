import { selectAppTheme, setAppTheme } from "@/store/slices/appSlice";
import { useAppDispatch } from "@/store/store";
import { wp } from "@/utils/screensize";
import LottieView from "lottie-react-native";
import React, { FC, useEffect, useRef } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

interface Props {}

const ThemeSwitcher: FC<Props> = (props) => {
  const ref = useRef<LottieView | null>(null);

  const theme = useSelector(selectAppTheme);

  const dispatch = useAppDispatch();

  const handlePress = () => {
    if (theme === "light") ref?.current?.play(0, 90);
    else ref?.current?.play(90, 0);
    setTimeout(() => {
      dispatch(setAppTheme(theme === "dark" ? "light" : "dark"));
    }, 400);
  };

  useEffect(() => {
    if (theme === "light") ref?.current?.play(90, 0);
    else ref?.current?.play(0, 90);
  }, []);

  return (
    <TouchableOpacity onPress={handlePress}>
      <LottieView
        ref={ref}
        source={require("@/assets/animations/themeSwitcher.json")}
        style={{ width: wp(12.5), height: wp(12.5) }}
        loop={false}
        speed={1.5}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ThemeSwitcher;
