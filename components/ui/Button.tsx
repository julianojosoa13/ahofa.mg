import { selectAppTheme } from "@/store/slices/appSlice";
import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { TouchableRipple } from "react-native-paper";
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
    fontSize: hp(1.85),
    fontFamily: "Poppins_600SemiBold",
    marginTop: 6,
    textTransform: "uppercase",
  };
  const launchAction = () => {
    if (!disabled && action) action();
  };

  return (
    <TouchableRipple
      onPress={launchAction}
      style={[
        defaultStyle,
        style,
        disabled && { backgroundColor: "lightgrey" },
      ]}
      disabled={disabled}
    >
      <Text style={[defaultTextStyle, textStyle]}>{title}</Text>
    </TouchableRipple>
  );
};

export default Button;
