import {
  selectAppShowCategorySelectModal,
  selectAppTheme,
  selectShoYesNoDialog,
  setShowCategorySelectModal,
  setShowYesNoDialog,
} from "@/store/slices/appSlice";
import { hp, wp } from "@/utils/screensize";
import { BlurView } from "@react-native-community/blur";
import React, { FC, ReactNode, useEffect } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import GoogleSignInButton from "../ui/GoogleSignInButton";
import { useTranslation } from "react-i18next";
import { AntDesign } from "@expo/vector-icons";

import COLORS from "@/utils/colors";
import Animated, { ZoomInDown } from "react-native-reanimated";
import Button from "../ui/Button";

interface Props {
  yesAction?: () => void;
  noAction?: () => void;
  title?: string;
  children?: ReactNode;
}

const YesNoDialog: FC<Props> = ({
  yesAction,
  noAction,
  title,
  children = null,
}) => {
  const showModal = useSelector(selectShoYesNoDialog);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setShowYesNoDialog(false));
  };

  const theme = useSelector(selectAppTheme);
  const styles = createStyles(theme);

  useEffect(() => {
    return () => {
      dispatch(setShowYesNoDialog(false));
    };
  }, []);

  return (
    <Modal transparent visible={showModal} style={styles.container}>
      <BlurView
        blurAmount={10}
        blurType={theme}
        reducedTransparencyFallbackColor={theme == "light" ? "white" : "black"}
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
            <AntDesign name="close" size={25} color={COLORS[theme].textColor} />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>

          {children}

          <View style={styles.buttonsContainer}>
            <Button
              title={t("yes")}
              action={yesAction}
              textStyle={{ color: COLORS[theme].green }}
              style={{
                backgroundColor: COLORS[theme].miniGreen,
                width: wp(25),
                marginVertical: 0,
              }}
            />
            <Button
              title={t("no")}
              action={noAction}
              textStyle={{ color: "red" }}
              style={{
                backgroundColor: "pink",
                width: wp(25),
                marginVertical: 0,
              }}
            />
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
      paddingTop: hp(5),
      padding: 10,
      borderRadius: wp(5),
      backgroundColor: COLORS[theme].bgColor,
      justifyContent: "space-around",
      alignItems: "center",
      height: hp(33),
      width: wp(85),
      elevation: 4,
      paddingBottom: 24,
    },
    title: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: hp(2.1),
      color: COLORS[theme].thirdColor,
      fontFamily: "Oswald_700Bold",
    },
    buttonsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      width: wp(80),
    },
  });

export default YesNoDialog;
