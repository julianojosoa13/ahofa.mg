import { selectAppTheme } from "@/store/slices/appSlice";
import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

interface Props {
  onPress?: () => void;
}

const Announcement: FC<Props> = ({ onPress }) => {
  const theme = useSelector(selectAppTheme);
  const styles = createStyles(theme);
  const { t } = useTranslation();
  return (
    <TouchableOpacity style={styles.selectPostTypeButton} onPress={onPress}>
      <MaterialIcons
        name="arrow-drop-down"
        size={24}
        color={COLORS[theme].bgColor}
      />
      <Text style={styles.selectPostTypeButtonLabel}>{t("announcement")}</Text>
      <Entypo name="megaphone" size={24} color={COLORS[theme].bgColor} />
    </TouchableOpacity>
  );
};

const createStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    selectPostTypeButton: {
      marginVertical: hp(0.5),
      backgroundColor: "lightgrey",
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      borderRadius: 10,
      height: 30,
      paddingHorizontal: wp(2),
    },
    selectPostTypeButtonLabel: {
      fontWeight: "400",
      color: COLORS[theme].bgColor,
      fontSize: hp(1.5),
      textTransform: "capitalize",
    },
  });

export default Announcement;
