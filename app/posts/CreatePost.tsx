import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import { AntDesign, Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "@react-native-community/blur";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";
import Button from "@/components/ui/Button";
import { useAppDispatch } from "@/store/store";
import { selectAppTheme, setAppBusy } from "@/store/slices/appSlice";
import BusyModal from "@/components/modals/BusyModal";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import Announcement from "@/components/PostTypes/Announcement";

import CategoryChanger from "@/components/Categories/CategoryChanger";
import CategorySelectModal from "@/components/modals/CategorySelectModal";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { useNotifications } from "react-native-notificated";
import RoundedButton from "@/components/ui/RoundedButton";

interface Props {}

const CreatePost: FC<Props> = (props) => {
  const { notify } = useNotifications();

  const { top } = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useTranslation();

  const theme = useSelector(selectAppTheme);
  const styles = createStyles(top, theme);

  const dispatch = useAppDispatch();

  const user = auth().currentUser;

  const [description, setDescription] = useState("");
  const [showAddButton, setShowAddButton] = useState(true);
  const [showModalOverlay, setShowModalOverlay] = useState(false);

  const handleClose = () => {
    router.dismiss();
  };

  const handlePublish = () => {
    dispatch(setAppBusy(true));

    setTimeout(() => {
      dispatch(setAppBusy(false));

      notify("warning", {
        params: {
          title: t("success"),
          description: t("your announcement has been posted successfully"),
          style: {
            multiline: 3,
            descriptionSize: 12,
            titleSize: 14,
            bgColor: "rgb(158, 219, 158)",
          },
        },
      });
    }, 3000);

    setTimeout(() => {
      router.dismiss();
    }, 3300);
  };

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
  };

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setShowAddButton(false);
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
      setTimeout(() => {
        setShowAddButton(true);
      }, 10);
    });

    // Cleanup listeners on unmount
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <Animated.View
      style={[styles.container]}
      entering={SlideInDown.duration(300)}
      exiting={SlideOutDown}
    >
      {showModalOverlay ? (
        <BlurView
          blurType={theme}
          reducedTransparencyFallbackColor={
            theme === "light" ? "white" : "black"
          }
          blurAmount={theme == "light" ? 10 : 15}
          style={{
            width: wp(100),
            height: hp(100),
            ...StyleSheet.absoluteFillObject,
            zIndex: 100,
          }}
        />
      ) : (
        <>
          <CategorySelectModal />
          <BusyModal />
        </>
      )}

      <View style={styles.headerContainer}>
        <BlurView
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
        <View style={styles.customHeader}>
          <TouchableOpacity onPress={handleClose}>
            <AntDesign name="close" size={25} color={COLORS[theme].textColor} />
          </TouchableOpacity>
          <Text style={styles.title}>{t("new post")}</Text>
        </View>
      </View>
      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <View>
          <View style={styles.userDetailsContainer}>
            <Image
              source={{ uri: user?.photoURL! }}
              style={{
                width: wp(15),
                height: wp(15),
                borderRadius: wp(15 / 2),
              }}
            />
            <View>
              <Text style={styles.userName}>{user?.displayName}</Text>
              <Announcement />
            </View>
          </View>
          <View
            style={{
              backgroundColor: COLORS[theme].softBgColor,
              // elevation: 2,
              marginBottom: hp(4),
              marginTop: hp(2),
              borderRadius: 8,
              paddingHorizontal: wp(2),
            }}
          >
            <Text
              style={[
                styles.title,
                { fontSize: hp(1.8), marginVertical: hp(1), fontWeight: "900" },
              ]}
            >
              {t("what are you thinking")}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                marginBottom: hp(4),
              }}
            >
              <Text
                style={{ fontWeight: "200", color: COLORS[theme].textColor }}
              >
                {t("select a category")}
              </Text>
              <CategoryChanger />
            </View>
          </View>

          <View
            style={{
              backgroundColor: COLORS[theme].softBgColor,
              // elevation: 2,
              marginBottom: hp(2),
              borderRadius: 8,
              paddingBottom: hp(2),
              paddingHorizontal: wp(2),
            }}
          >
            <Text
              style={[
                styles.title,
                { fontSize: hp(1.6), marginVertical: hp(1), fontWeight: "900" },
                description.length > 150 && { color: "red" },
              ]}
              numberOfLines={2}
            >
              {`${t("describe what you are looking for")}  (${
                description.length
              } /  150)`}
            </Text>
            <TextInput
              style={styles.descriptions}
              multiline
              placeholder={t("describe what you are looking for")}
              value={description}
              onChangeText={(text) => handleDescriptionChange(text)}
              maxLength={150}
              placeholderTextColor={COLORS[theme].thirdColor}
            />
          </View>
        </View>
        {keyboardVisible && (
          <View
            style={{
              width: wp(20),
              height: wp(20),
              position: "absolute",
              bottom: hp(15),
              right: wp(4),
            }}
          >
            <RoundedButton />
          </View>
        )}
        <Button title={t("publish")} action={handlePublish}></Button>
      </KeyboardAwareScrollView>

      {!keyboardVisible && showAddButton && (
        <View
          style={{
            width: wp(20),
            height: wp(20),
            position: "absolute",
            bottom: hp(15),
            right: wp(4),
            zIndex: 200,
          }}
        >
          <RoundedButton
            onPress={() => setShowModalOverlay(!showModalOverlay)}
            showModalOverlay={showModalOverlay}
          />
        </View>
      )}

      {keyboardVisible ? (
        <View style={styles.helperContainer}>
          <View />
          <TouchableOpacity hitSlop={8} onPress={() => Keyboard.dismiss()}>
            <Text style={styles.helperText}>{t("finish")}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </Animated.View>
  );
};

const createStyles = (top: number, theme: "light" | "dark") =>
  StyleSheet.create({
    container: { flex: 1 },
    headerContainer: {
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: 90,
    },
    customHeader: {
      height: hp(7.5) + top,
      width: wp(100),
      backgroundColor: COLORS[theme].bgColor,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: wp(8),
      gap: wp(5),
      paddingTop: top,
    },
    scrollView: {
      flex: 1,
      backgroundColor: COLORS[theme].bgColor,
      paddingHorizontal: wp(4),
    },
    title: {
      fontWeight: "bold",
      color: COLORS[theme].thirdColor,
      fontSize: hp(2.25),
    },
    close: {},
    contentContainer: {
      paddingTop: hp(8) + top,
      paddingBottom: 20,
      height: hp(100) - 20,
      justifyContent: "space-between",
    },
    descriptions: {
      // borderWidth: 1,
      borderColor: "lightgrey",
      backgroundColor: COLORS[theme].bgColor,
      color: COLORS[theme].textColor,
      borderRadius: 12,
      verticalAlign: "top",
      padding: 10,
      height: hp(15),
      fontWeight: "300",
      borderWidth: 0.5,
    },
    userDetailsContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: wp(4),
      marginTop: hp(1),
      marginBottom: hp(3),
    },
    userName: {
      fontWeight: "bold",
      color: COLORS[theme].secondaryColor,
    },
    helperContainer: {
      height: 30,
      width: "100%",
      backgroundColor: COLORS[theme].softBgColor,
      position: "absolute",
      bottom: 0,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingRight: wp(4),
    },
    helperText: {
      fontWeight: "500",
      color: COLORS[theme].textColor,
      fontSize: hp(2.1),
      textTransform: "capitalize",
    },
  });

export default CreatePost;
