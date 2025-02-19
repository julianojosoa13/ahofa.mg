import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { onGoogleButtonPress } from "@/lib/firebase/googleSignIn";
import {
  Image,
  Keyboard,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  selectAppTheme,
  setAppBusy,
} from "@/store/slices/appSlice";
import { useAppDispatch } from "@/store/store";

interface Props {}

const GoogleSignInButton: FC<Props> = (props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const theme = useSelector(selectAppTheme);
  const styles = createStyles(theme);

  const handleButtonPress = () => {
    Keyboard.dismiss();
    dispatch(loginStart());
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handleButtonPress}>
      <Image
        source={require("@/assets/images/icons8-google-144.png")}
        style={{ width: 35, height: 35 }}
      />
      <Text style={styles.buttonLabel}>{t("continue with google")}</Text>
    </TouchableOpacity>
  );
};

const createStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      backgroundColor: COLORS[theme].softBgColor,
      elevation: 3,
      borderRadius: 8,
      marginVertical: hp(1),
      height: hp(6.5),
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
      paddingLeft: wp(3),
      gap: wp(3),
      // borderWidth: 0.1,
    },
    buttonLabel: {
      fontFamily: "Poppins_600SemiBold",
      fontSize: hp(1.5),
      color: COLORS[theme].textColor,
      marginTop: 6,
    },
  });

export default GoogleSignInButton;
