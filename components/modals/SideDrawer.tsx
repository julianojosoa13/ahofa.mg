import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import {
  AntDesign,
  FontAwesome6,
  Fontisto,
  Ionicons,
} from "@expo/vector-icons";
import React, { FC, useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { SlideInLeft, SlideOutLeft } from "react-native-reanimated";

interface Props {
  visible?: boolean;
  onRequestClose?: () => void;
}

const SideDrawer: FC<Props> = ({ visible, onRequestClose }) => {
  const [showModal, setShowModal] = useState(false);

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

          <View style={styles.header}>
            <TouchableOpacity style={styles.userAvatar}>
              <AntDesign name="user" size={50} color={"#fff"} />
            </TouchableOpacity>

            <Pressable>
              <Text style={{ fontWeight: "200" }}>Non connecté</Text>
              <Text style={styles.loginButtton}>Se Connecter</Text>
            </Pressable>
          </View>
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
    backgroundColor: "#fff",
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
    marginTop: hp(2.5),
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
});

export default SideDrawer;
