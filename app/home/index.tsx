import React, { FC } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

interface Props {}

const HomeScreen: FC<Props> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" translucent />
      <Text></Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default HomeScreen;
