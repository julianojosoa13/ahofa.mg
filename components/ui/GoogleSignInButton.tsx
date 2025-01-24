import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { onGoogleButtonPress } from "@/lib/firebase/googleSignIn";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { loginStart, setAppBusy } from "@/store/slices/appSlice";
import { useAppDispatch } from "@/store/store";

interface Props {}

const GoogleSignInButton: FC<Props> = (props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleButtonPress = () => {
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    elevation: 4,
    borderRadius: 8,
    marginVertical: hp(2),
    height: hp(6.5),
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: wp(3),
    gap: wp(3),
    borderWidth: 0.1,
  },
  buttonLabel: {
    fontWeight: "600",
    color: "grey",
  },
});

export default GoogleSignInButton;
