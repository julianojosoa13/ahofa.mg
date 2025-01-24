import {
  selectShowLoginModal,
  setShowLoginModal,
} from "@/store/slices/appSlice";
import { hp, wp } from "@/utils/screensize";
import { BlurView } from "@react-native-community/blur";
import React, { FC } from "react";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import GoogleSignInButton from "../ui/GoogleSignInButton";
import { useTranslation } from "react-i18next";
import { AntDesign } from "@expo/vector-icons";

interface Props {}

const LoginModal: FC<Props> = (props) => {
  const showLoginModal = useSelector(selectShowLoginModal);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setShowLoginModal(false));
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
          <Text style={styles.title}>{t("sign in")}</Text>
          <GoogleSignInButton />
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
});

export default LoginModal;
