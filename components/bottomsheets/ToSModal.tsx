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
import { useDispatch } from "react-redux";
import { setAcceptedToS } from "@/store/slices/onboardingSlice";

interface Props {
  onClose?: () => void;
}

const ToSModal = forwardRef<BottomSheetModal, Props>(({ onClose }, ref) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const accepteTos = () => {
    dispatch(setAcceptedToS(true));
  };

  const handleLinkPress = () => {
    Linking.openURL("https://ahofamg.web.app/tos");
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
                  color: COLORS.secondaryColor,
                  textTransform: "uppercase",
                  fontSize: hp(2),
                  textAlign: "center",
                  fontWeight: "200",
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
                    color: COLORS.secondaryColor,
                    textDecorationLine: "underline",
                    fontWeight: "500",
                    fontSize: hp(1.5),
                  }}
                >
                  {t("see tos")}
                </Text>
                <MaterialCommunityIcons
                  name="arrow-top-right"
                  size={18}
                  color={COLORS.secondaryColor}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                textAlign: "center",
                marginTop: hp(2),
                color: COLORS.mainColor,
                fontWeight: "300",
                height: hp(10),
                verticalAlign: "middle",
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
                  height: hp(4),
                  backgroundColor: buttonDisabled ? "lightgreen" : "green",
                  justifyContent: "center",
                  alignItems: "center",
                  width: wp(35),
                  borderRadius: hp(2),
                  elevation: 2,
                }}
              >
                <Text style={{ fontWeight: "600", color: "white" }}>
                  {t("accept all")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onClose}
                style={{
                  height: hp(4),
                  backgroundColor: "red",
                  justifyContent: "center",
                  alignItems: "center",
                  width: wp(35),
                  borderRadius: hp(2),
                  elevation: 2,
                }}
              >
                <Text style={{ fontWeight: "600", color: "white" }}>
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

const styles = StyleSheet.create({
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
    backgroundColor: "rgba(255,255,255,0.95)",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 35,
    marginBottom: hp(2),
  },
  title: { color: COLORS.secondaryColor },
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.33)",
  },
  header: {
    height: hp(10),
    paddingHorizontal: wp(7),
  },
});

export default ToSModal;
