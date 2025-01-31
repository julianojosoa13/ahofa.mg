import React, { forwardRef, useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import LottieView from "lottie-react-native";
import { BlurView } from "@react-native-community/blur";

import * as Linking from "expo-linking";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAcceptedToS,
  setAcceptedToS,
} from "@/store/slices/onboardingSlice";
import { selectAppTheme, setShowLoginModal } from "@/store/slices/appSlice";

import { openBrowserAsync } from "expo-web-browser";
import { useAppDispatch } from "@/store/store";

interface Props {
  onClose?: () => void;
}

const ToSModal = forwardRef<BottomSheetModal, Props>(({ onClose }, ref) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const theme = useSelector(selectAppTheme);
  const styles = createStyles(theme);

  const acceptedToS = useSelector(selectAcceptedToS);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const accepteTos = () => {
    dispatch(setAcceptedToS(true));
    if (onClose) onClose();
    console.log("Accepted ToS >>> ", accepteTos);
    dispatch(setShowLoginModal(true));
  };

  const handleLinkPress = () => {
    openBrowserAsync("https://ahofamg.web.app/tos");
    setTimeout(() => {
      setButtonDisabled(false);
    }, 3000);
  };

  return (
    <BottomSheetModal
      ref={ref}
      onChange={handleSheetChanges}
      snapPoints={["72.5%"]}
      backdropComponent={({ style }) => (
        <BlurView
          style={[style, styles.backdrop]}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
      )}
      backgroundStyle={{ backgroundColor: "transparent" }}
      handleComponent={null}
      enablePanDownToClose={false}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.modalBox}>
          <View style={styles.header}>
            {/* Handle`` */}
            <View
              style={{
                height: 4,
                width: 30,
                backgroundColor: "grey",
                borderRadius: 2,
                alignSelf: "center",
                marginVertical: 10,
              }}
            ></View>
            <View style={{ marginTop: hp(1) }}>
              <View
                style={{
                  alignSelf: "center",
                  marginBottom: hp(1.5),
                }}
              >
                <LottieView
                  source={require("@/assets/animations/checkBox.json")}
                  autoPlay
                  loop
                  speed={0.75}
                  style={{ width: wp(12.5), height: wp(12.5) }}
                />
              </View>
              <Text
                style={{
                  color: COLORS[theme].secondaryColor,
                  textTransform: "uppercase",
                  fontSize: hp(2),
                  textAlign: "center",
                  fontFamily: "Oswald_200ExtraLight",
                  maxWidth: wp(75),
                  alignSelf: "center",
                }}
                numberOfLines={3}
              >
                {t("you must accept tos")}
              </Text>
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
                    fontFamily: "Poppins_500Medium",
                    fontSize: hp(1.5),
                    marginTop: 6,
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
            </View>
            <Text
              style={{
                textAlign: "center",
                marginTop: hp(2),
                color: COLORS[theme].textColor,
                fontFamily: "Poppins_300Light",
                height: hp(10),
                verticalAlign: "middle",
                fontSize: hp(1.5),
              }}
            >
              {t("for legal reasons")}
            </Text>
            <View
              style={{
                marginTop: hp(5),
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={accepteTos}
                disabled={buttonDisabled}
                style={{
                  height: hp(6),
                  backgroundColor: buttonDisabled ? "rgba(0,0,0,0.2)" : "green",
                  justifyContent: "center",
                  alignItems: "center",
                  width: wp(35),
                  borderRadius: hp(2),
                  elevation: buttonDisabled ? 0 : 2,
                }}
              >
                <Text
                  style={{
                    marginTop: 6,
                    fontFamily: "Poppins_600SemiBold",
                    color: buttonDisabled ? "grey" : "white",
                  }}
                >
                  {t("accept all")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onClose}
                style={{
                  height: hp(6),
                  backgroundColor: "red",
                  justifyContent: "center",
                  alignItems: "center",
                  width: wp(35),
                  borderRadius: hp(2),
                  elevation: 2,
                }}
              >
                <Text
                  style={{
                    marginTop: 6,
                    fontFamily: "Poppins_600SemiBold",
                    color: "white",
                  }}
                >
                  {t("refuse all")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const createStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    contentContainer: {
      width: wp(100),
      height: hp(72.5),
      backgroundColor: "transparent",
    },
    modalBox: {
      width: wp(93),
      height: hp(42.5),
      marginLeft: wp(3.5),
      marginRight: wp(3.5),
      backgroundColor: COLORS[theme].bgColor,
      borderTopLeftRadius: 35,
      borderTopRightRadius: 8,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 35,
      marginBottom: hp(2),
    },
    title: { color: COLORS[theme].secondaryColor },
    backdrop: {
      backgroundColor: "rgba(0,0,0,0.33)",
    },
    header: {
      height: hp(10),
      paddingHorizontal: wp(7),
    },
  });

export default ToSModal;
