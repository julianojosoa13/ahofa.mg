import React, { FC } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

interface Props {}

const Onboarding: FC<Props> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>onBoarding</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Onboarding;
