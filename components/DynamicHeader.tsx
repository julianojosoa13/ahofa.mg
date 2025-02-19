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
          paddingLeft: wp(1),
          position: "absolute",
          top: top + 10,
        }}
      >
        <TouchableRipple
          onPress={() => setVisible(true)}
          style={{
            borderRadius: 22.5,
            backgroundColor: COLORS[theme].bgColor,
            elevation: 2,
            justifyContent: "center",
            alignItems: "center",
            width: 45,
            height: 45,
          }}
          rippleColor={"lightgrey"}
        >
          <MaterialCommunityIcons
            name="menu"
            size={32.5}
            color={COLORS[theme].mainColor}
          />
        </TouchableRipple>

        <SideDrawer
          visible={visible}
          onRequestClose={() => setVisible(false)}
        />
      </View>

      <Animated.View
        style={{
          flexDirection: "row",
          gap: wp(2),
          justifyContent: "space-between",
          position: "absolute",
          top: top + 10,
          right: 0,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => console.log("")}
          style={{
            width: wp(80),
            height: hp(5),
            borderRadius: 15,
            flexDirection: "row",
            paddingHorizontal: wp(2),
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: wp(7.5),
            marginRight: wp(3.5),
            backgroundColor: COLORS[theme].bgColor,
            borderColor: "lightgrey",
            borderWidth: 0.5,
          }}
        >
          <Text
            style={{
              marginTop: 6,
              fontFamily: "Poppins_200ExtraLight",
              fontSize: hp(1.9),
              color: COLORS[theme].textColor,
            }}
          >
            {t("what are you thinking")}
          </Text>
          <AntDesign name="search1" size={25} color={COLORS[theme].textColor} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default DynamicHeader;
