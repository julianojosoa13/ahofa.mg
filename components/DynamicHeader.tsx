import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { FC, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import SideDrawer from "./modals/SideDrawer";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { selectAppTheme } from "@/store/slices/appSlice";
import { useTranslation } from "react-i18next";
import DynamicStatusBar from "./DynamicStatusBar";

interface Props {}

const DynamicHeader: FC<Props> = (props) => {
  const theme = useSelector(selectAppTheme);
  const { top } = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <DynamicStatusBar />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: wp(1),
          position: "absolute",
          width: wp(100),
          top: top + 5,
          left: 5,
        }}
      >
        <TouchableRipple onPress={() => console.log("ok")}>
          <Text
            style={{
              fontFamily: "Poppins_700Bold",
              marginTop: 6,
              fontSize: hp(2.5),
              color: COLORS[theme].thirdColor,
            }}
          >
            AHOFA.MG
          </Text>
        </TouchableRipple>
        <Animated.View
          style={{
            flexDirection: "row",
            gap: wp(2),
          }}
        >
          <TouchableRipple
            onPress={() => setVisible(true)}
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 45,
            }}
            rippleColor={COLORS[theme].white}
          >
            <MaterialCommunityIcons
              name="microsoft-xbox-controller-menu"
              size={40}
              color={COLORS[theme].mainColor}
            />
          </TouchableRipple>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => console.log("")}
            style={{
              // width: wp(15),
              height: hp(5),
              borderRadius: 15,
              flexDirection: "row",
              marginRight: wp(5),
              marginLeft: wp(2),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign
              name="search1"
              size={25}
              color={COLORS[theme].textColor}
            />
          </TouchableOpacity>
          <SideDrawer
            visible={visible}
            onRequestClose={() => setVisible(false)}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default DynamicHeader;
