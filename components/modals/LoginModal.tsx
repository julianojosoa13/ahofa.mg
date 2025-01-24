import {
  selectShowLoginModal,
  setShowLoginModal,
} from "@/store/slices/appSlice";
import { hp, wp } from "@/utils/screensize";
import { BlurView } from "@react-native-community/blur";
import React, { FC, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import GoogleSignInButton from "../ui/GoogleSignInButton";
import { useTranslation } from "react-i18next";
import { AntDesign } from "@expo/vector-icons";
import FormInput from "../ui/FormInput";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "../ui/Button";

interface Props {}

const LoginModal: FC<Props> = (props) => {
  const showLoginModal = useSelector(selectShowLoginModal);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [notRegistered, setNotRegistered] = useState(false);

  const closeModal = () => {
    dispatch(setShowLoginModal(false));
  };

  const handleFormChange = (name: string, text: string) => {
    setFormData({ ...formData, [name]: text });
  };
  return (
    <Modal transparent visible={showLoginModal} style={styles.container}>
      <BlurView
        blurAmount={10}
        blurType="light"
        reducedTransparencyFallbackColor="white"
        style={styles.container}
      >
        <View style={styles.contentContainer}>
          <KeyboardAwareScrollView>
            <TouchableOpacity
              hitSlop={8}
              style={{
                position: "absolute",
                top: hp(2),
                right: wp(4),
                zIndex: 10,
              }}
              onPress={closeModal}
            >
              <AntDesign name="close" size={25} />
            </TouchableOpacity>
            <Text style={styles.title}>
              {t(notRegistered ? "create an account" : "sign in")}
            </Text>
            <FormInput
              label={t("email address")}
              onChangeText={(text) => handleFormChange("email", text)}
              value={formData.email}
              icon={<AntDesign name="mail" size={25} color={"lightgrey"} />}
            />
            <FormInput
              label={t("password")}
              onChangeText={(text) => handleFormChange("password", text)}
              value={formData.password}
              icon={<AntDesign name="lock" size={25} color={"lightgrey"} />}
              secret={true}
            />
            {notRegistered ? (
              <FormInput
                label={t("confirm password")}
                onChangeText={(text) =>
                  handleFormChange("confirmPassword", text)
                }
                value={formData.confirmPassword}
                icon={<AntDesign name="lock" size={25} color={"lightgrey"} />}
                secret={true}
              />
            ) : (
              <View style={{ height: hp(7) }} />
            )}
            <Button
              title={t(notRegistered ? "create an account" : "sign in")}
            ></Button>
            <View style={styles.alternativeContainer}>
              <Text style={styles.alternativeLabel}>
                {t(!notRegistered ? "no account?" : "have an account?")}
              </Text>
              <TouchableOpacity
                onPress={() => setNotRegistered(!notRegistered)}
              >
                <Text style={styles.alternativeAction}>
                  {t(!notRegistered ? "create an account" : "sign in")}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.or}>{t("or")}</Text>
            <GoogleSignInButton />
          </KeyboardAwareScrollView>
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, width: wp(100), height: hp(100) },
  contentContainer: {
    padding: 10,
    borderRadius: wp(5),
    backgroundColor: "white",
    flex: 1,
    marginVertical: hp(15),
    marginHorizontal: wp(7.5),
    elevation: 4,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: hp(2.2),
  },
  or: {
    textAlign: "center",
    fontSize: hp(1.75),
    marginTop: 10,
  },
  alternativeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(1),
    paddingHorizontal: wp(2),
  },
  alternativeAction: {
    fontWeight: "bold",
  },
  alternativeLabel: {
    fontWeight: "200",
  },
});

export default LoginModal;
