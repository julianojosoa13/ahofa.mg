import DynamicHeader from "@/components/DynamicHeader";
import BusyModal from "@/components/modals/BusyModal";
import { selectAppTheme } from "@/store/slices/appSlice";
import COLORS from "@/utils/colors";
import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";

interface Props {}

const Computers: FC<Props> = (props) => {
  const theme = useSelector(selectAppTheme);
  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <BusyModal />
      <DynamicHeader />
      <Text></Text>
    </View>
  );
};

const createStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS[theme].softBgColor,
    },
  });

export default Computers;
