import { selectAppTheme } from "@/store/slices/appSlice";
import { StatusBar } from "expo-status-bar";
import React, { FC } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

interface Props {}

const DynamicStatusBar: FC<Props> = (props) => {
  const theme = useSelector(selectAppTheme);
  return (
    <SafeAreaView style={styles.container}>
      {theme === "light" ? (
        <StatusBar style={"dark"} />
      ) : (
        <StatusBar style={"light"} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default DynamicStatusBar;
