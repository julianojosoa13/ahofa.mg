import DynamicHeader from "@/components/DynamicHeader";
import BusyModal from "@/components/modals/BusyModal";
import React, { FC } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

interface Props {}

const Music: FC<Props> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <BusyModal />
      <DynamicHeader />
      <Text></Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Music;
