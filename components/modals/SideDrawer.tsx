import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import {
  AntDesign,
  Feather,
  FontAwesome6,
  Fontisto,
  Ionicons,
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

interface Props {
  visible?: boolean;
  onRequestClose?: () => void;
}

const SideDrawer: FC<Props> = ({ visible, onRequestClose }) => {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

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
      {visible && (
        <Animated.View
          style={styles.container}
          entering={SlideInLeft.duration(300)}
          exiting={SlideOutLeft.duration(300)}
        >
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onRequestClose}
            hitSlop={8}
          >
            <FontAwesome6 name="x" size={25} />
          </TouchableOpacity>
          <Animated.Image
            source={require("@/assets/images/brand/trans_bg.png")}
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
              color: COLORS.mainColor,
            }}
          >
            {t("account management").toUpperCase()}
          </Text>
          <View style={styles.line} />
          <View style={styles.header}>
            <TouchableOpacity style={styles.userAvatar}>
              <AntDesign name="user" size={50} color={"#fff"} />
            </TouchableOpacity>

            <Pressable>
              <Text style={{ fontWeight: "200" }}>{t("not connected")}</Text>
              <Text style={styles.loginButtton}>{t("sign in")}</Text>
            </Pressable>
          </View>

          <ScrollView>
            {/* Mon Profile */}
            <View style={styles.line} />
            <TouchableOpacity style={styles.menuItem}>
              <FontAwesome name="user-o" size={24} color="black" />
              <Text style={styles.menuLabel}>Mon Profile</Text>
            </TouchableOpacity>

            {/* Parametres */}
            <TouchableOpacity style={styles.menuItem}>
              <Entypo name="tools" size={24} color="black" />
              <Text style={styles.menuLabel}>Paramètres</Text>
            </TouchableOpacity>

            {/* Mes Locations */}
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="bag-handle-outline" size={24} color="black" />
              <Text style={styles.menuLabel}>Mes Locations</Text>
            </TouchableOpacity>

            {/* Mes Achats */}
            <TouchableOpacity style={styles.menuItem}>
              <FontAwesome name="credit-card" size={24} color="black" />
              <Text style={styles.menuLabel}>Mes Achats</Text>
            </TouchableOpacity>

            {/* Mes messages */}
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="chatbubble-outline" size={24} color="black" />
              <Text style={styles.menuLabel}>Messages</Text>

              {/* ToolTip */}
              <View style={styles.toolTip}>
                <Text style={styles.toolTipText}>2</Text>
              </View>
            </TouchableOpacity>

            {/* Mes notifications */}
            <TouchableOpacity style={styles.menuItem}>
              <AntDesign name="bells" size={24} color="black" />
              <Text style={styles.menuLabel}>Notifications</Text>

              {/* ToolTip */}
              <View style={styles.toolTip}>
                <Text style={styles.toolTipText}>5</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      )}
      <Pressable style={styles.overlay} onPress={onRequestClose} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(80),
    height: hp(100),
    backgroundColor: "rgba(255,255,255,0.95)",
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
  header: {
    flexDirection: "row",
    gap: wp(2),
    alignItems: "center",
    // marginTop: hp(2.5),
  },
  userAvatar: {
    margin: wp(2.5),
    width: wp(20),
    height: wp(20),
    borderRadius: wp(10),
    backgroundColor: COLORS.mainColor,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtton: {
    fontWeight: "600",
    color: COLORS.secondaryColor,
    fontSize: hp(2),
  },
  line: {
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0,0,0,0.25)",
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
    backgroundColor: COLORS.bgColor,
    // borderRadius: 8,
  },
  menuLabel: {
    fontSize: hp(1.55),
    color: COLORS.secondaryColor,
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
