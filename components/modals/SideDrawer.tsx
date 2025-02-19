import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { FC, useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  BounceIn,
  FadeInDown,
  FadeInUp,
  SlideInLeft,
  SlideOutLeft,
} from "react-native-reanimated";

import Entypo from "@expo/vector-icons/Entypo";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTranslation } from "react-i18next";

import auth from "@react-native-firebase/auth";
import { Image } from "expo-image";
import { useAppDispatch } from "@/store/store";
import { selectAppTheme } from "@/store/slices/appSlice";

import BusyModal from "./BusyModal";
import { useSelector } from "react-redux";
import ThemeSwitcher from "../ui/ThemeSwitcher";
import LogOutButton from "../ui/LogOutButton";
import DynamicStatusBar from "../DynamicStatusBar";

interface Props {
  visible?: boolean;
  onRequestClose?: () => void;
}

const SideDrawer: FC<Props> = ({ visible, onRequestClose }) => {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  const theme = useSelector(selectAppTheme);
  const styles = createStyles(theme);

  const user = auth().currentUser;
  const dispatch = useAppDispatch();

  useEffect(() => {
    let modalTimeout: NodeJS.Timeout;
    if (visible) {
      setShowModal(true);
    } else {
      modalTimeout = setTimeout(() => {
        setShowModal(false);
      }, 300);
    }
    return () => clearTimeout(modalTimeout);
  }, [visible]);

  return (
    <Modal
      style={styles.container}
      transparent
      visible={showModal}
      onRequestClose={onRequestClose}
    >
      <BusyModal />
      {visible && (
        <Animated.View
          style={styles.container}
          entering={SlideInLeft.duration(500)}
          exiting={SlideOutLeft.duration(300)}
        >
          <View style={styles.themeButton}>
            <ThemeSwitcher />
            <Text style={styles.themeButtonLabel}>{t(theme)}</Text>
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onRequestClose}
            hitSlop={8}
          >
            <AntDesign name="close" size={25} color={COLORS[theme].textColor} />
          </TouchableOpacity>

          {/* <View style={styles.line} /> */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.userAvatar}>
              {user ? (
                <Animated.Image
                  entering={BounceIn.delay(750)}
                  source={{ uri: user?.photoURL! }}
                  style={{
                    width: 75,
                    height: 75,
                    borderRadius: 75 / 2,
                  }}
                />
              ) : (
                <AntDesign
                  name="user"
                  size={75}
                  color={COLORS[theme].bgColor}
                  style={{
                    backgroundColor: COLORS[theme].mainColor,
                    borderRadius: 75 / 2,
                  }}
                />
              )}
            </TouchableOpacity>

            <View>
              <Text
                style={{ fontWeight: "500", color: COLORS[theme].textColor }}
              >
                {user ? user.displayName : t("not connected")}
              </Text>
              <Text style={styles.email} numberOfLines={1}>
                {user ? user?.email : t("sign in")}
              </Text>
            </View>
          </View>

          <ScrollView style={{ marginBottom: hp(4) }}>
            {/* Mon Profile */}
            {/* <View style={styles.line} /> */}
            <Animated.View entering={FadeInUp.delay(300)}>
              <TouchableOpacity style={styles.menuItem}>
                <FontAwesome
                  name="user-o"
                  size={24}
                  color={"rgba(200,200,0,1)"}
                  // color={COLORS[theme].textColor}
                />
                <Text style={styles.menuLabel}>{t("my profile")}</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Parametres */}
            <Animated.View entering={FadeInUp.delay(375)}>
              <TouchableOpacity style={styles.menuItem}>
                <Entypo
                  name="tools"
                  size={24}
                  //  color={COLORS[theme].textColor}
                  color={"rgba(100,100,200,1)"}
                />
                <Text style={styles.menuLabel}>{t("settings")}</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Mes Locations */}
            <Animated.View entering={FadeInUp.delay(450)}>
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons
                  name="bag-handle-outline"
                  size={24}
                  // color={COLORS[theme].textColor}
                  color={"rgba(200,100,200,1)"}
                />
                <Text style={styles.menuLabel}>{t("my rentals")}</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Mes Achats */}
            <Animated.View entering={FadeInUp.delay(525)}>
              <TouchableOpacity style={styles.menuItem}>
                <FontAwesome
                  name="credit-card"
                  size={24}
                  // color={COLORS[theme].textColor}
                  color={"rgba(100,200,100,1)"}
                />
                <Text style={styles.menuLabel}>{t("my purchases")}</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Mes messages */}
            <Animated.View entering={FadeInUp.delay(600)}>
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons
                  name="chatbubble-outline"
                  size={24}
                  // color={COLORS[theme].textColor}
                  color={"rgba(100,200,200,1)"}
                />
                <Text style={styles.menuLabel}>{t("messages")}</Text>

                {/* ToolTip */}
                <View style={styles.toolTip}>
                  <Text style={styles.toolTipText}>2</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>

            {/* Mes notifications */}
            <Animated.View entering={FadeInDown.delay(675)}>
              <TouchableOpacity style={styles.menuItem}>
                <AntDesign
                  name="bells"
                  size={24}
                  // color={COLORS[theme].textColor}
                  color={"rgba(200,100,100,1)"}
                />
                <Text style={styles.menuLabel}>{t("notifications")}</Text>

                {/* ToolTip */}
                <View style={styles.toolTip}>
                  <Text style={styles.toolTipText}>5</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>

            {/* <Animated.View entering={FadeInDown.delay(750)}>
              <LogOutButton />
            </Animated.View> */}
          </ScrollView>
          <Text
            style={{
              textAlign: "center",
              fontSize: 13,
              fontWeight: "200",
              color: COLORS[theme].textColor,
              width: wp(80),
            }}
          >
            {t("all rights")}
          </Text>
        </Animated.View>
      )}
      <Pressable style={styles.overlay} onPress={onRequestClose} />
    </Modal>
  );
};

const createStyles = (theme: "dark" | "light") =>
  StyleSheet.create({
    container: {
      width: wp(80),
      height: hp(100),
      backgroundColor: COLORS[theme].bgColor,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,0.5)",
      zIndex: -1,
    },
    closeButton: {
      position: "absolute",
      top: hp(0.5),
      left: wp(70),
    },
    themeButton: {
      position: "absolute",
      top: hp(0.125),
      left: wp(4),
      flexDirection: "row",
      alignItems: "center",
      gap: wp(1),
    },
    themeButtonLabel: {
      color: COLORS[theme].textColor,
      fontSize: hp(1.4),
      fontWeight: "300",
    },
    header: {
      flexDirection: "row",
      gap: wp(2),
      alignItems: "center",
      marginTop: hp(7.5),
      marginBottom: hp(2.5),
    },
    userAvatar: {
      marginLeft: wp(2.5),
      width: wp(20),
      height: wp(20),
      borderRadius: wp(10),
      borderColor: COLORS[theme].mainColor,
      backgroundColor: COLORS[theme].miniViolet,
      borderWidth: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    email: {
      fontWeight: "300",
      color: COLORS[theme].secondaryColor,
      fontSize: hp(1.2),
      maxWidth: wp(50),
    },
    line: {
      borderBottomWidth: 0.5,
      borderBottomColor: COLORS[theme].textColor,
      marginHorizontal: wp(15),
      marginTop: hp(1.5),
      marginBottom: hp(1.5),
    },
    menuItem: {
      flexDirection: "row",
      width: wp(71),
      marginHorizontal: hp(2),
      marginVertical: hp(1.1),
      gap: hp(1.5),
      paddingLeft: wp(5),
      paddingVertical: hp(0.75),
      justifyContent: "flex-start",
      alignItems: "center",
      // elevation: 1,
      backgroundColor: COLORS[theme].softBgColor,
      borderRadius: 8,
    },
    menuLabel: {
      fontSize: hp(1.55),
      color: COLORS[theme].secondaryColor,
      fontWeight: "300",
    },
    toolTip: {
      width: wp(7.5),
      height: wp(7.5),
      borderRadius: hp(3.75),
      backgroundColor: "red",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      right: 10,
      top: -10,
    },
    toolTipText: {
      textAlign: "center",
      color: "white",
      fontWeight: "bold",
      fontSize: 12,
    },
  });

export default SideDrawer;
