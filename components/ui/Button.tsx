import { selectAppTheme } from "@/store/slices/appSlice";
import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

interface Props {
  style?: any;
  textStyle?: any;
  title: string;
  action?: () => void;
  disabled?: boolean;
}

const Button = (props: Props) => {
  const { title, action, style, textStyle, disabled } = props;
  const theme = useSelector(selectAppTheme);

  const defaultStyle = {
    backgroundColor: COLORS[theme].mainColor,
    marginVertical: hp(1.5),
    height: hp(6),
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    // elevation: 1,
  };

  const defaultTextStyle = {
    color: COLORS[theme].white,
    fontSize: hp(2),
    fontWeight: "600",
  };
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
      disabled={disabled}
    >
      <Text style={[defaultTextStyle, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
