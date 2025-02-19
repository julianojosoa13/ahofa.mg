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
import { StatusBar } from "expo-status-bar";

interface Props {
  yesAction?: () => void;
  noAction?: () => void;
  title?: string;
  children?: ReactNode;
  yesLabel?: string;
  noLabel?: string;
  inverted?: boolean;
}

const YesNoDialog: FC<Props> = ({
  yesAction,
  noAction,
  title,
  children = null,
  yesLabel = "yes",
  noLabel = "no",
  inverted = false,
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
    <View style={{ ...StyleSheet.absoluteFillObject, flex: 1 }}>
      <Modal transparent visible={showModal} style={styles.container}>
        <BlurView
          blurAmount={10}
          blurType={theme}
          reducedTransparencyFallbackColor={
            theme == "light" ? "white" : "black"
          }
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
              <AntDesign
                name="close"
                size={25}
                color={COLORS[theme].textColor}
              />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>

            {children}

            <View style={styles.buttonsContainer}>
              <Button
                title={t(noLabel)}
                action={noAction}
                style={{
                  width: wp(37.5),
                  marginVertical: 0,
                  backgroundColor: inverted ? COLORS[theme].softBgColor : "red",
                  elevation: inverted ? 2 : 0,
                }}
                textStyle={{
                  fontSize: hp(1.6),
                  color: inverted
                    ? COLORS[theme].textColor
                    : COLORS[theme].white,
                }}
              />
              <Button
                title={t(yesLabel)}
                action={yesAction}
                textStyle={{
                  fontSize: hp(1.6),
                }}
                style={{
                  backgroundColor: inverted
                    ? "red"
                    : COLORS[theme].imageTintColor,
                  width: wp(37.5),
                  marginVertical: 0,
                }}
              />
            </View>
          </Animated.View>
        </BlurView>
      </Modal>
    </View>
  );
};

const createStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
      // width: wp(100),
      // height: hp(125),
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
      // height: hp(20),
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
