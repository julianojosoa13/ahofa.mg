import {
  selectAppShowCategorySelectModal,
  setShowCategorySelectModal,
} from "@/store/slices/appSlice";
import { hp, wp } from "@/utils/screensize";
import { BlurView } from "@react-native-community/blur";
import React, { FC, useEffect } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import GoogleSignInButton from "../ui/GoogleSignInButton";
import { useTranslation } from "react-i18next";
import { AntDesign } from "@expo/vector-icons";

import COLORS from "@/utils/colors";
import Animated, { ZoomInDown } from "react-native-reanimated";

interface Props {}

const BaseModal: FC<Props> = (props) => {
  const showModal = useSelector(selectAppShowCategorySelectModal);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setShowCategorySelectModal(false));
  };

  useEffect(() => {
    return () => {
      dispatch(setShowCategorySelectModal(false));
    };
  }, []);

  return (
    <Modal transparent visible={showModal} style={styles.container}>
      <BlurView
        blurAmount={10}
        blurType="light"
        reducedTransparencyFallbackColor="white"
        style={styles.container}
      >
        <Animated.View
          style={styles.contentContainer}
          entering={ZoomInDown.duration(300).delay(50)}
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
          <Text style={styles.title}>{t("sign in")}</Text>
          <GoogleSignInButton />
          <View
            style={{
              borderBottomColor: "lightgrey",
              borderBottomWidth: 1.5,
              alignSelf: "center",
              width: wp(25),
              marginVertical: hp(2.5),
            }}
          />
          <Text style={styles.title}>{t("select a category")}</Text>
        </Animated.View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp(100),
    height: hp(100),
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    padding: 10,
    borderRadius: wp(5),
    backgroundColor: "white",
    height: hp(70),
    width: wp(85),
    elevation: 4,
    paddingBottom: 24,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: hp(2.2),
    color: COLORS.thirdColor,
  },
});

export default BaseModal;
