import React, { FC } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

interface Props {}

const Computers: FC<Props> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text></Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Computers;
