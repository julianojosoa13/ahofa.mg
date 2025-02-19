import { hp, wp } from "@/utils/screensize";
import React, { FC, useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
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
import { selectAppTheme } from "@/store/slices/appSlice";
import COLORS from "@/utils/colors";
import { BlurView } from "@react-native-community/blur";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";

interface Props {}

const LanguagesButton: FC<Props> = (props) => {
  const { t } = useTranslation();
  const currentLanguage = useSelector(selectTranslationsLanguage);

  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const theme = useSelector(selectAppTheme);

  const styles = createStyles(theme);

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
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.5}
      onPress={() => setShowModal(true)}
    >
      <Text style={styles.label}>{t("language")}</Text>
      <View>
        <FlagImage code={currentLanguage} style={styles.flag} />
      </View>

      <Modal visible={showModal} style={styles.modal} transparent>
        <Pressable
          style={{
            ...StyleSheet.absoluteFillObject,
            width: wp(100),
            height: hp(100),
          }}
          onPress={() => setShowModal(false)}
        >
          <BlurView
            style={{ ...StyleSheet.absoluteFillObject }}
            blurType={theme}
            blurAmount={5}
            blurRadius={5}
          />
        </Pressable>
        <Animated.View
          style={styles.modal}
          entering={FadeInUp.duration(300).delay(150)}
        >
          <Pressable style={styles.option} onPress={() => switchLanguage("fr")}>
            <Text style={styles.optionText}>{t("french")}</Text>
            <Image
              style={styles.flag}
              source={require("@/assets/images/flags/fr.jpeg")}
            />
          </Pressable>

          <Pressable style={styles.option} onPress={() => switchLanguage("en")}>
            <Text style={styles.optionText}>{t("english")}</Text>
            <Image
              style={styles.flag}
              source={require("@/assets/images/flags/us.jpeg")}
            />
          </Pressable>

          <Pressable style={styles.option} onPress={() => switchLanguage("mg")}>
            <Text style={styles.optionText}>{t("malagasy")}</Text>
            <Image
              style={styles.flag}
              source={require("@/assets/images/flags/mg.jpeg")}
            />
          </Pressable>
        </Animated.View>
      </Modal>
    </TouchableOpacity>
  );
};

const createStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      gap: wp(2),
    },
    label: {
      fontSize: hp(1.65),
      fontFamily: "Poppins_300Light",
      marginTop: 6,
      color: COLORS[theme].textColor,
    },
    flag: {
      width: wp(10),
      height: wp(7.5),
      borderWidth: 0.25,
      borderColor: COLORS[theme].softBgColor,
    },
    modal: {
      position: "absolute",
      top: hp(7.5),
      right: wp(5),
      width: wp(40),
      height: wp(50),
      backgroundColor: COLORS[theme].softBgColor,
      elevation: 5,
      borderRadius: 4,
    },
    optionText: {
      color: COLORS[theme].textColor,
      fontFamily: "Poppins_400Regular",
      fontSize: hp(1.5),
      marginTop: 6,
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
