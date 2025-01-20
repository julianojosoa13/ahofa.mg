import React, { FC, useEffect, useState } from "react";
import { Image, ImageStyle, StyleProp, StyleSheet, View } from "react-native";

interface Props {
  code: string;
  style: StyleProp<ImageStyle>;
}

const FlagImage: FC<Props> = ({ code, style }) => {
  const getFlagImg = () => {
    switch (code) {
      case "fr":
        return (
          <Image
            style={style}
            source={require("@/assets/images/flags/fr.jpeg")}
          />
        );
      case "mg":
        return (
          <Image
            style={style}
            source={require("@/assets/images/flags/mg.jpeg")}
          />
        );
      case "en":
        return (
          <Image
            style={style}
            source={require("@/assets/images/flags/us.jpeg")}
          />
        );
    }
  };
  return <View style={styles.container}>{getFlagImg()}</View>;
};

const styles = StyleSheet.create({
  container: {},
});

export default FlagImage;
