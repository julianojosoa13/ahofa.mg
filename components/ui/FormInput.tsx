import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import { AntDesign, Entypo } from "@expo/vector-icons";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
  label: string;
  icon?: ReactNode;
  secret?: boolean;
  onChangeText: (text: string) => void;
  value: string;
}

const FormInput: FC<Props> = ({
  label,
  icon = null,
  secret = false,
  onChangeText,
  value,
}) => {
  const [focused, setFocused] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(secret);

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
    borderWidth: 2,
    borderColor: COLORS.mainColor,
  };

  const focusedLabel = {
    color: COLORS.mainColor,
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.label, focused ? focusedLabel : null]}>{label}</Text>
      <View style={[styles.inputContainer, focused ? focusedStyle : null]}>
        {icon}
        <TextInput
          style={[styles.input]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          onChangeText={(text) => onChangeText(text)}
          secureTextEntry={secureTextEntry}
          autoCapitalize={secret ? "none" : "sentences"}
        />
        {secret && (
          <Entypo
            name={secureTextEntry ? "eye" : "eye-with-line"}
            onPress={handleEyePress}
            size={23}
            color={focused ? COLORS.mainColor : "rgba(200,203,203,1)"}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: wp(2),
  },
  label: {
    color: "grey",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: wp(2),
    paddingRight: wp(2),
    marginVertical: hp(0.5),
    borderWidth: 0.75,
    height: hp(5),
    borderRadius: wp(2),
    borderColor: "lightgrey",
    gap: wp(2),
  },
  input: {
    flex: 1,
  },
});

export default FormInput;
