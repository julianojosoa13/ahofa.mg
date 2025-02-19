import { selectAppTheme } from "@/store/slices/appSlice";
import COLORS from "@/utils/colors";
import { hp } from "@/utils/screensize";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { openBrowserAsync } from "expo-web-browser";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

interface Props {}

const ToSButton: FC<Props> = (props) => {
  const theme = useSelector(selectAppTheme);
  const { t } = useTranslation();

  const handleLinkPress = async () => {
    await openBrowserAsync("https://ahofamg.web.app/tos");
  };

  return (
    <TouchableOpacity
      style={{
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
      }}
      hitSlop={8}
      onPress={handleLinkPress}
    >
      <Text
        style={{
          color: COLORS[theme].secondaryColor,
          textDecorationLine: "underline",
          fontWeight: "300",
          fontSize: hp(1.5),
        }}
      >
        {t("see tos")}
      </Text>
      <MaterialCommunityIcons
        name="arrow-top-right"
        size={18}
        color={COLORS[theme].secondaryColor}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ToSButton;
