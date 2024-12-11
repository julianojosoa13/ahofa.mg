import { hp, wp } from "@/utils/screensize";
import React, { FC } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";

interface Props {}

const LanguagesButton: FC<Props> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity activeOpacity={0.5}>
        <AntDesign name="earth" size={30} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default LanguagesButton;
