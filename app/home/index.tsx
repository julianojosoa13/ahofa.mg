import React, { FC } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import BusyModal from "@/components/modals/BusyModal";
import { useSelector } from "react-redux";
import { selectAppTheme } from "@/store/slices/appSlice";

interface Props {}

const HomeScreen: FC<Props> = (props) => {
  const { t } = useTranslation();
  const theme = useSelector(selectAppTheme);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={theme == "dark" ? "light" : "dark"} translucent />
      <BusyModal />
      <Text></Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default HomeScreen;
