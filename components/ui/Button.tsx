import { selectAppTheme } from "@/store/slices/appSlice";
import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { useSelector } from "react-redux";

interface Props {
  style?: any;
  textStyle?: any;
  title: string;
  action?: () => void;
  disabled?: boolean;
  children?: ReactNode;
}

const Button = (props: Props) => {
  const { title, action, style, textStyle, disabled, children = null } = props;
  const theme = useSelector(selectAppTheme);

  const defaultStyle = {
    backgroundColor: COLORS[theme].mainColor,
    marginVertical: hp(1.5),
    height: 50,
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 15,
        }}
      >
        <Text style={[defaultTextStyle, textStyle]}>{title}</Text>
        {children}
      </View>
    </TouchableRipple>
  );
};

export default Button;
