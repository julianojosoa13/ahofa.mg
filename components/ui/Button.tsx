import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  style?: any;
  textStyle?: any;
  title: string;
  action?: () => void;
}

const defaultStyle = {
  backgroundColor: COLORS.mainColor,
  margin: hp(2.5),
  height: hp(6),
  borderRadius: 8,
  justifyContent: "center",
  alignItems: "center",
};

const defaultTextStyle = {
  color: "#fff",
  fontSize: hp(2),
};

const Button = (props: Props) => {
  const { title, action, style, textStyle } = props;
  return (
    <TouchableOpacity onPress={action} style={[defaultStyle, style]}>
      <Text style={[defaultTextStyle, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
