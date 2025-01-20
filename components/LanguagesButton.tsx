import { hp, wp } from "@/utils/screensize";
import React, { FC, useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

import i18n from "@/lib/i18n";
import { useTranslation } from "react-i18next";
import FlagImage from "./FlagImage";
import { useDispatch, useSelector } from "react-redux";
import {
  setLanguage,
  selectTranslationsLanguage,
} from "@/store/slices/translationsSlice";

import { checkPersistedLanguage } from "@/utils/helpers";

interface Props {}

const LanguagesButton: FC<Props> = (props) => {
  const { t } = useTranslation();
  const currentLanguage = useSelector(selectTranslationsLanguage);

  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const setCurrentLanguage = (code: string) => {
    dispatch(setLanguage(code));
  };

  const switchLanguage = (code: string) => {
    setCurrentLanguage(code);
    setShowModal(false);
  };

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>{t("language")}</Text>
      <TouchableOpacity activeOpacity={0.5} onPress={() => setShowModal(true)}>
        <FlagImage code={currentLanguage} style={styles.flag} />
      </TouchableOpacity>

      <Modal visible={showModal} style={styles.modal} transparent>
        <Pressable
          style={{
            ...StyleSheet.absoluteFillObject,
            width: wp(100),
            height: hp(100),
            backgroundColor: "rgba(255,255,255,0.1)",
          }}
          onPress={() => setShowModal(false)}
        ></Pressable>
        <View style={styles.modal}>
          <Pressable style={styles.option} onPress={() => switchLanguage("fr")}>
            <Text>{t("french")}</Text>
            <Image
              style={styles.flag}
              source={require("@/assets/images/flags/fr.jpeg")}
            />
          </Pressable>

          <Pressable style={styles.option} onPress={() => switchLanguage("en")}>
            <Text>{t("english")}</Text>
            <Image
              style={styles.flag}
              source={require("@/assets/images/flags/us.jpeg")}
            />
          </Pressable>

          <Pressable style={styles.option} onPress={() => switchLanguage("mg")}>
            <Text>{t("malagasy")}</Text>
            <Image
              style={styles.flag}
              source={require("@/assets/images/flags/mg.jpeg")}
            />
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(2),
  },
  label: {
    fontSize: hp(1.75),
    fontWeight: "300",
  },
  flag: {
    width: wp(10),
    height: wp(7.5),
    borderWidth: 0.25,
    borderColor: "grey",
  },
  modal: {
    position: "absolute",
    top: hp(7.5),
    right: wp(5),
    width: wp(40),
    height: wp(50),
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 16,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    gap: wp(3),
  },
});

export default LanguagesButton;
