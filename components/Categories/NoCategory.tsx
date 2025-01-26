import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import { MaterialIcons } from "@expo/vector-icons";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  disabled?: boolean;
}

const NoCategory: FC<Props> = ({ disabled = false }) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity style={styles.selectCategoryButton} disabled={disabled}>
      <MaterialIcons name="public" size={20} color={"darkorange"} />
      <Text style={styles.selectCategoryButtonLabel}>{t("category")}</Text>
      <MaterialIcons name="arrow-drop-down" size={24} color="darkorange" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  selectCategoryButton: {
    marginVertical: hp(0.5),
    backgroundColor: "#E8D2CF",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 10,
    height: 30,
    paddingHorizontal: wp(2),
  },
  selectCategoryButtonLabel: {
    fontWeight: "500",
    color: COLORS.mainColor,
  },
});

export default NoCategory;
