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

const Sound: FC<Props> = ({ disabled = false }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handlePress = () => {
    dispatch(setAppSelectedCategory("sounds"));
    dispatch(setShowCategorySelectModal(false));
  };

  return (
    <TouchableOpacity
      style={styles.selectCategoryButton}
      disabled={disabled}
      onPress={handlePress}
    >
      <MaterialIcons name="music-note" size={20} color={"rgb(200,100,100)"} />
      <Text style={styles.selectCategoryButtonLabel}>{t("sound")}</Text>
      <MaterialIcons
        name="arrow-drop-down"
        size={24}
        color="rgb(200,100,100)"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  selectCategoryButton: {
    marginVertical: hp(0.5),
    backgroundColor: "rgb(243, 220, 220)",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 10,
    height: 30,
    paddingHorizontal: wp(2),
  },
  selectCategoryButtonLabel: {
    fontWeight: "500",
    color: "rgb(200,100,100)",
  },
});

export default Sound;
