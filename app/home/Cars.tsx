import DynamicHeader from "@/components/DynamicHeader";
import BusyModal from "@/components/modals/BusyModal";
import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";

interface Props {}

const Cars: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <BusyModal />
      <DynamicHeader />
      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Cars;
