import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {}

const Announcement: FC<Props> = (props) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity style={styles.selectPostTypeButton}>
      <MaterialIcons name="arrow-drop-down" size={24} color="white" />
      <Text style={styles.selectPostTypeButtonLabel}>{t("announcement")}</Text>
      <Entypo name="megaphone" size={24} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    color: "white",
    fontSize: hp(1.5),
    textTransform: "capitalize",
  },
});

export default Announcement;
