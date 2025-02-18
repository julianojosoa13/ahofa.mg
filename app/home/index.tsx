import React, { FC, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import BusyModal from "@/components/modals/BusyModal";
import { useSelector } from "react-redux";
import { selectAppTheme } from "@/store/slices/appSlice";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import SideDrawer from "@/components/modals/SideDrawer";
import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DynamicStatusBar from "@/components/DynamicStatusBar";
import { TouchableRipple } from "react-native-paper";
import Animated from "react-native-reanimated";
import DynamicHeader from "@/components/DynamicHeader";

interface Props {}

const HomeScreen: FC<Props> = (props) => {
  const { t } = useTranslation();
  const theme = useSelector(selectAppTheme);
  const [visible, setVisible] = useState(false);
  const { top } = useSafeAreaInsets();
  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <DynamicHeader />
      <BusyModal />
      <Text></Text>
    </SafeAreaView>
  );
};

const createStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      backgroundColor: COLORS[theme].softBgColor,
      flex: 1,
    },
  });

export default HomeScreen;
