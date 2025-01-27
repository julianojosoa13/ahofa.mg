import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import {
  AntDesign,
  Feather,
  FontAwesome6,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { FC, useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { SlideInLeft, SlideOutLeft } from "react-native-reanimated";

import Entypo from "@expo/vector-icons/Entypo";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import LanguagesButton from "../LanguagesButton";
import { useTranslation } from "react-i18next";

import auth from "@react-native-firebase/auth";
import { Image } from "expo-image";
import { useAppDispatch } from "@/store/store";
import {
  selectAppTheme,
  setAppBusy,
  setShowLoginModal,
} from "@/store/slices/appSlice";
import { router, useRouter } from "expo-router";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Button from "../ui/Button";
import BusyModal from "./BusyModal";
import { openBrowserAsync } from "expo-web-browser";
import { useSelector } from "react-redux";
import ThemedLogo from "../ui/ThemedLogo";
import ThemeSwitcher from "../ThemeSwitcher";

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
  // const router = useRouter();

  const handleSignOut = async () => {
    // dispatch(setAppBusy(true));
    try {
      await GoogleSignin.signOut();
      if (user?.email) await auth().signOut();
      console.log("Router >> ", router);
      dispatch(setAppBusy(true));
      setTimeout(() => {
        dispatch(setAppBusy(false));
        router.dismissTo("/");
      }, 1200);
      setTimeout(() => {
        dispatch(setShowLoginModal(true));
      }, 3500);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLinkPress = async () => {
    await openBrowserAsync("https://ahofamg.web.app/tos");
  };

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
          entering={SlideInLeft.duration(300)}
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
          <ThemedLogo
            entering={undefined}
            style={{
              width: wp(25),
              height: wp(25),
              marginLeft: wp(27.5),
              marginTop: hp(2.5),
            }}
          />
          <Text
            style={{
              textAlign: "center",
              fontWeight: "500",
              fontSize: hp(2.25),
              color: COLORS[theme].mainColor,
            }}
          >
            {t("account management").toUpperCase()}
          </Text>
          <View style={styles.line} />
          <View style={styles.header}>
            <TouchableOpacity style={styles.userAvatar}>
              {user ? (
                <Image
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

          <ScrollView>
            {/* Mon Profile */}
            <View style={styles.line} />
            <TouchableOpacity style={styles.menuItem}>
              <FontAwesome
                name="user-o"
                size={24}
                color={"rgba(200,200,0,1)"}
                // color={COLORS[theme].textColor}
              />
              <Text style={styles.menuLabel}>{t("my profile")}</Text>
            </TouchableOpacity>

            {/* Parametres */}
            <TouchableOpacity style={styles.menuItem}>
              <Entypo
                name="tools"
                size={24}
                //  color={COLORS[theme].textColor}
                color={"rgba(100,100,200,1)"}
              />
              <Text style={styles.menuLabel}>{t("settings")}</Text>
            </TouchableOpacity>

            {/* Mes Locations */}
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons
                name="bag-handle-outline"
                size={24}
                // color={COLORS[theme].textColor}
                color={"rgba(200,100,200,1)"}
              />
              <Text style={styles.menuLabel}>{t("my rentals")}</Text>
            </TouchableOpacity>

            {/* Mes Achats */}
            <TouchableOpacity style={styles.menuItem}>
              <FontAwesome
                name="credit-card"
                size={24}
                // color={COLORS[theme].textColor}
                color={"rgba(100,200,100,1)"}
              />
              <Text style={styles.menuLabel}>{t("my purchases")}</Text>
            </TouchableOpacity>

            {/* Mes messages */}
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

            {/* Mes notifications */}
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
            <Button
              title={t("sign out")}
              action={handleSignOut}
              style={{
                backgroundColor: "rgba(255,0,0,0.2)",
                marginHorizontal: wp(4),
                height: hp(5),
                elevation: 0,
              }}
              textStyle={{
                color: "rgba(255,0,0,01)",
                fontWeight: "600",
                fontSize: hp(1.6),
              }}
            />
            <TouchableOpacity
              style={{
                alignSelf: "center",
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
              hitSlop={8}
              onPress={handleLinkPress}
            >
              <Text
                style={{
                  color: COLORS[theme].secondaryColor,
                  textDecorationLine: "underline",
                  fontWeight: "300",
                  fontSize: hp(1.5),
                }}
              >
                {t("see tos")}
              </Text>
              <MaterialCommunityIcons
                name="arrow-top-right"
                size={18}
                color={COLORS[theme].secondaryColor}
              />
            </TouchableOpacity>
          </ScrollView>
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
      // marginTop: hp(2.5),
    },
    userAvatar: {
      marginLeft: wp(2.5),
      width: wp(20),
      height: wp(20),
      borderRadius: wp(10),
      backgroundColor: COLORS[theme].mainColor,
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
