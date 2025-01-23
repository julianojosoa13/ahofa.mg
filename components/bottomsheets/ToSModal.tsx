import React, { forwardRef, useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import LottieView from "lottie-react-native";

import * as Linking from "expo-linking";
import Button from "../ui/Button";

interface Props {
  onClose?: () => void;
}

const ToSModal = forwardRef<BottomSheetModal, Props>(({ onClose }, ref) => {
  const { t } = useTranslation();

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleLinkPress = () => {
    Linking.openURL("https://ahofamg.web.app/tos");
    setButtonDisabled(false);
  };

  return (
    <BottomSheetModal
      ref={ref}
      onChange={handleSheetChanges}
      snapPoints={["40%", "47.5%"]}
      backdropComponent={({ style }) => (
        <View style={[style, styles.backdrop]} />
      )}
      backgroundStyle={{ backgroundColor: "rgba(255,255,255,0)" }}
      handleComponent={null}
      enablePanDownToClose={false}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            hitSlop={8}
            style={{ position: "absolute", top: hp(2), left: wp(4) }}
            onPress={onClose}
          >
            <AntDesign name="close" size={25} />
          </TouchableOpacity>

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
          <View style={{ marginTop: hp(2) }}>
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
                color: COLORS.mainColor,
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
                marginVertical: hp(3.5),
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
          <Button
            title={t("accept all")}
            action={() => console.log("ok")}
            disabled={buttonDisabled}
            style={{ backgroundColor: "teal" }}
          ></Button>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    width: wp(95),
    height: hp(45),
    marginLeft: wp(2.5),
    backgroundColor: "rgba(255,255,255,1)",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
