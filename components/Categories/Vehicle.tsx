import {
  setAppSelectedCategory,
  setShowCategorySelectModal,
} from "@/store/slices/appSlice";
import { useAppDispatch } from "@/store/store";
import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  disabled?: boolean;
}

const Vehicle: FC<Props> = ({ disabled = false }) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const handlePress = () => {
    dispatch(setAppSelectedCategory("vehicles"));
    dispatch(setShowCategorySelectModal(false));
  };
  return (
    <TouchableOpacity
      style={styles.selectCategoryButton}
      disabled={disabled}
      onPress={handlePress}
    >
      <AntDesign name="car" size={20} color={"rgb(0,100,0)"} />
      <Text style={styles.selectCategoryButtonLabel}>{t("vehicles")}</Text>
      <MaterialIcons name="arrow-drop-down" size={24} color="rgb(0,100,0)" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  selectCategoryButton: {
    marginVertical: hp(0.5),
    backgroundColor: "rgb(158, 219, 158)",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 10,
    height: 30,
    paddingHorizontal: wp(2),
  },
  selectCategoryButtonLabel: {
    fontWeight: "500",
    color: "rgb(0,100,0)",
  },
});

export default Vehicle;
