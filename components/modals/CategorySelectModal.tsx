import {
  selectAppShowCategorySelectModal,
  selectAppTheme,
  selectShowLoginModal,
  setShowCategorySelectModal,
  setShowLoginModal,
} from "@/store/slices/appSlice";
import { hp, wp } from "@/utils/screensize";
import { BlurView } from "@react-native-community/blur";
import React, { FC, useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import GoogleSignInButton from "../ui/GoogleSignInButton";
import { useTranslation } from "react-i18next";
import { AntDesign } from "@expo/vector-icons";
import FormInput from "../ui/FormInput";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "../ui/Button";
import COLORS from "@/utils/colors";
import Animated, {
  FadeInDown,
  FadeInUp,
  SlideInDown,
  ZoomInDown,
} from "react-native-reanimated";
import Electronics from "../Categories/Eletronics";
import Vehicle from "../Categories/Vehicle";
import Houses from "../Categories/Houses";
import Terrain from "../Categories/Terrrain";
import Sound from "../Categories/Sound";

interface Props {}

const CategorySelectModal: FC<Props> = (props) => {
  const showModal = useSelector(selectAppShowCategorySelectModal);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const theme = useSelector(selectAppTheme);

  const styles = createStyles(theme);

  const closeModal = () => {
    dispatch(setShowCategorySelectModal(false));
  };

  useEffect(() => {
    return () => {
      dispatch(setShowCategorySelectModal(false));
    };
  }, []);

  return (
    <Modal
      transparent
      visible={showModal}
      style={styles.container}
      onRequestClose={closeModal}
    >
      <BlurView
        blurAmount={10}
        blurType="light"
        reducedTransparencyFallbackColor="white"
        style={styles.container}
      >
        <Animated.View
          style={styles.contentContainer}
          entering={FadeInUp.duration(300).delay(50)}
        >
          <TouchableOpacity
            hitSlop={8}
            style={{
              position: "absolute",
              top: hp(2),
              right: wp(4),
              zIndex: 10,
            }}
            onPress={closeModal}
          >
            <AntDesign name="close" size={25} />
          </TouchableOpacity>

          <Text style={styles.title}>{t("select a category")}</Text>
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-around",
              flex: 1,
              marginTop: hp(3),
            }}
          >
            <Electronics />
            <Vehicle />
            <Houses />
            <Terrain />
            <Sound />
          </View>
        </Animated.View>
      </BlurView>
    </Modal>
  );
};

const createStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: wp(100),
      height: hp(100),
      justifyContent: "center",
      alignItems: "center",
    },
    contentContainer: {
      padding: 10,
      paddingTop: hp(4.5),
      borderRadius: wp(5),
      backgroundColor: "white",
      height: hp(40),
      width: wp(85),
      elevation: 4,
      paddingBottom: 24,
    },
    title: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: hp(2.2),
      color: COLORS[theme].thirdColor,
    },
  });

export default CategorySelectModal;
