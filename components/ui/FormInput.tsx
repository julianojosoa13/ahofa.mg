import { selectAppTheme } from "@/store/slices/appSlice";
import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import { AntDesign, Entypo } from "@expo/vector-icons";
import React, { FC, ReactNode, useEffect, useState } from "react";
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSelector } from "react-redux";

interface Props {
  label: string;
  icon?: ReactNode;
  secret?: boolean;
  onChangeText: (text: string) => void;
  value: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
}

const FormInput: FC<Props> = ({
  label,
  icon = null,
  secret = false,
  onChangeText,
  value,
  keyboardType = undefined,
  autoCapitalize = undefined,
}) => {
  const [focused, setFocused] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(secret);
  const theme = useSelector(selectAppTheme);
  const styles = createStyles(theme);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handleEyePress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const focusedStyle = {
    borderWidth: 1.5,
    borderColor: COLORS[theme].mainColor,
  };

  const focusedLabel = {
    color: COLORS[theme].mainColor,
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, focused ? focusedLabel : null]}>{label}</Text>
      <View style={[styles.inputContainer, focused ? focusedStyle : null]}>
        {icon}
        <TextInput
          style={[
            styles.input,
            focused && { borderLeftColor: COLORS[theme].mainColor },
          ]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          onChangeText={(text) => onChangeText(text)}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={secret ? "none" : autoCapitalize}
        />
        {secret && (
          <Entypo
            name={secureTextEntry ? "eye" : "eye-with-line"}
            onPress={handleEyePress}
            size={23}
            color={focused ? COLORS[theme].mainColor : COLORS[theme].thirdColor}
          />
        )}
      </View>
    </View>
  );
};

const createStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      margin: wp(2),
    },
    label: {
      color: COLORS[theme].thirdColor,
      fontFamily: "Poppins_400Regular",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingLeft: wp(2),
      paddingRight: wp(2),
      marginVertical: hp(0.5),
      borderWidth: 1,
      height: hp(6),
      borderRadius: wp(5),
      borderColor: COLORS[theme].miniViolet,
      backgroundColor: COLORS[theme].softBgColor,
      gap: wp(2),
    },
    input: {
      flex: 1,
      borderLeftWidth: 0.75,
      paddingLeft: wp(2),
      borderLeftColor: COLORS[theme].thirdColor,
      color: COLORS[theme].textColor,
      marginTop: 3,
      fontFamily: "Poppins_500Medium",
    },
  });

export default FormInput;
