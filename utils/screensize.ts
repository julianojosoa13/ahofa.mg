import { Dimensions } from "react-native";

const { width: windowWidth, height: windowHeight } = Dimensions.get("screen");

export const wp = (value: number) => {
  return (value * windowWidth) / 100;
};

export const hp = (value: number) => {
  return (value * windowHeight) / 100;
};
