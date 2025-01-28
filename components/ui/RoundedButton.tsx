import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { AntDesign, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
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
} from "react-native-reanimated";
import LottieView from "lottie-react-native";
import { BlurView } from "@react-native-community/blur";

interface Props {
  onPress?: () => void;
  showModalOverlay?: boolean;
}

const RoundedButton = ({ onPress, showModalOverlay = false }: Props) => {
  const ref = useRef<LottieView | null>(null);
  const { t } = useTranslation();
  const theme = useSelector(selectAppTheme);

  const [expanded, setExpanded] = useState(false);
  const [hideButtons, setHideButton] = useState(true);

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

      if (newExpanded) {
        setHideButton(false);
      } else {
        setHideButton(true);
      }
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
    }));

  const buttonData = [
    {
      icon: <MaterialIcons name="photo" size={24} color="white" />,
      label: t("addPhotos"),
    },
    {
      icon: <FontAwesome5 name="dollar-sign" size={24} color="white" />,
      label: t("setPrice"),
    },
    {
      icon: <FontAwesome5 name="list" size={24} color="white" />,
      label: t("addDetails"),
    },
    {
      icon: <MaterialIcons name="location-on" size={24} color="white" />,
      label: t("setLocation"),
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
          {expanded && !hideButtons && (
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: COLORS[theme].imageTintColor },
              ]}
              activeOpacity={0.5}
              hitSlop={10}
            >
              {data.icon}
            </TouchableOpacity>
          )}
        </Animated.View>
      ))}

      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        style={[styles.container]}
      >
        <Text
          style={{
            color: COLORS[theme].imageTintColor,
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
          style={{ width: wp(25), height: wp(25) }}
          loop={true}
          speed={0.5}
          autoPlay
        />
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

    zIndex: 300,
  },
});

export default RoundedButton;
