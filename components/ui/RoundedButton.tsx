import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectAppTheme } from "@/store/slices/appSlice";
import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  SharedValue,
  SlideInUp,
  FadeInUp,
  FadeInDown,
  ZoomInEasyUp,
  ZoomInUp,
  ZoomIn,
  ZoomOut,
  ZoomOutEasyDown,
  BounceIn,
  BounceOut,
  BounceInUp,
  FadeIn,
} from "react-native-reanimated";
import LottieView from "lottie-react-native";
import { BlurView } from "@react-native-community/blur";
import { ZoomInZoomOut } from "react-native-notificated";

interface Props {
  onPress?: () => void;
  showModalOverlay?: boolean;
}

const RoundedButton = ({ onPress, showModalOverlay = false }: Props) => {
  const ref = useRef<LottieView | null>(null);
  const { t } = useTranslation();
  const theme = useSelector(selectAppTheme);

  const [expanded, setExpanded] = useState(false);

  // Animation values
  const offsets = [0, 1, 2, 3].map(() => useSharedValue(0));

  const toggleButtons = () => {
    setExpanded((prev) => {
      const newExpanded = !prev;
      offsets.forEach((offset, index) => {
        offset.value = withTiming(
          newExpanded ? (index + 1) * (wp(12) + hp(5)) : 0,
          {
            duration: 300,
            easing: Easing.out(Easing.quad),
          }
        );
      });
      return newExpanded;
    });
  };

  const handlePress = () => {
    ref.current?.play();
    if (onPress) onPress();

    toggleButtons();
  };

  const buttonStyles = (offset: SharedValue<number>) =>
    useAnimatedStyle(() => ({
      transform: [{ translateY: -offset.value }],
      opacity: offset.value > 0 ? 1 : 0, // Hide buttons when not expanded
    }));

  const buttonData = [
    {
      icon: <MaterialIcons name="photo" size={24} color="white" />,
      label: t("addPhotos"),
      onPress: () => console.log("Add Photos Pressed"),
    },
    {
      icon: <FontAwesome5 name="dollar-sign" size={24} color="white" />,
      label: t("setPrice"),
      onPress: () => console.log("Set Price Pressed"),
    },
    {
      icon: <FontAwesome5 name="list" size={24} color="white" />,
      label: t("addDetails"),
      onPress: () => console.log("Add Details Pressed"),
    },
    {
      icon: <MaterialIcons name="location-on" size={24} color="white" />,
      label: t("setLocation"),
      onPress: () => console.log("Set Location Pressed"),
    },
  ];

  useEffect(() => {
    if (!showModalOverlay && expanded) toggleButtons();
  }, [showModalOverlay]);

  return (
    <View style={styles.floatingContainer}>
      {buttonData.map((data, index) => (
        <Animated.View
          key={index}
          style={[styles.hiddenButton, buttonStyles(offsets[index])]}
        >
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: COLORS[theme].imageTintColor },
            ]}
            activeOpacity={0.5}
            hitSlop={10}
            onPress={data.onPress}
            disabled={false}
          >
            {data.icon}
          </TouchableOpacity>
        </Animated.View>
      ))}

      <TouchableOpacity onPress={handlePress} style={[styles.container]}>
        <Text
          style={{
            color: COLORS[theme].imageTintColor,
            fontWeight: "bold",
            fontSize: hp(2),
            textTransform: "capitalize",
            marginBottom: -hp(1.5),
          }}
        >
          {t(expanded ? "" : "add")}
        </Text>
        {!expanded ? (
          <LottieView
            ref={ref}
            source={require("@/assets/animations/addButton.json")}
            style={{ width: wp(25), height: wp(25) }}
            loop={true}
            speed={0.5}
            autoPlay
          />
        ) : (
          <Animated.View
            entering={BounceIn}
            style={{
              width: wp(16),
              height: wp(16),
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#720e9e",
              borderRadius: wp(8),
              marginTop: wp(4),
              marginBottom: wp(4),
              elevation: 1,
            }}
          >
            <Animated.View entering={BounceIn.delay(150)}>
              <Entypo name="cross" color={"white"} size={25} />
            </Animated.View>
          </Animated.View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    position: "absolute",
    bottom: hp(5),
    right: wp(2.5),
    alignItems: "center",
  },
  container: {
    borderRadius: wp(9.5),
    width: wp(19),
    height: wp(19),
    justifyContent: "center",
    alignItems: "center",
  },
  hiddenButton: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(7.5),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default RoundedButton;
