import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  style?: any;
  textStyle?: any;
  title: string;
  action?: () => void;
  disabled?: boolean;
}

const defaultStyle = {
  backgroundColor: COLORS.mainColor,
  margin: hp(2.5),
  height: hp(6),
  borderRadius: 8,
  justifyContent: "center",
  alignItems: "center",
  elevation: 5,
};

const defaultTextStyle = {
  color: "#fff",
  fontSize: hp(2),
  fontWeight: "300",
};

const Button = (props: Props) => {
  const { title, action, style, textStyle, disabled } = props;

  const launchAction = () => {
    if (!disabled && action) action();
  };

  return (
    <TouchableOpacity
      onPress={launchAction}
      style={[
        defaultStyle,
        style,
        disabled && { backgroundColor: "lightgrey" },
      ]}
      activeOpacity={disabled ? 1 : 0.5}
    >
      <Text style={[defaultTextStyle, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
