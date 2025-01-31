import BusyModal from "@/components/modals/BusyModal";
import {
  selectAppPostType,
  selectAppTheme,
  setAppPostType,
} from "@/store/slices/appSlice";
import { useAppDispatch } from "@/store/store";
import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import {
  AntDesign,
  Entypo,
  Feather,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import React, { FC, useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useSelector } from "react-redux";

interface Props {}

const Create: FC<Props> = (props) => {
  const { t } = useTranslation();
  const theme = useSelector(selectAppTheme);
  const styles = createStyles(theme);
  const ref1 = useRef<LottieView>(null);
  const ref2 = useRef<LottieView>(null);

  const selectedPostType = useSelector(selectAppPostType);
  const dispatch = useAppDispatch();

  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    if (isFocused) dispatch(setAppPostType("none"));
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      {isFocused && (
        <>
          <View style={styles.flex}>
            <BusyModal />

            <Animated.Text style={styles.title} entering={FadeInDown}>
              {t("create")} <AntDesign name="plus" size={wp(7.5)} />
            </Animated.Text>
            <Animated.View entering={FadeInDown.delay(150)}>
              <TouchableOpacity
                style={styles.announcementsContainer}
                onPress={() => {
                  if (selectedPostType !== "announcement") {
                    ref2?.current?.play(90, 0);
                    ref1?.current?.play(0, 90);
                    dispatch(setAppPostType("announcement"));
                  }
                }}
              >
                <Entypo
                  name="megaphone"
                  size={60}
                  color={
                    theme == "dark"
                      ? COLORS[theme].textColor
                      : COLORS[theme].bgColor
                  }
                />
                <View style={styles.announcementContent}>
                  <Text style={styles.subtitle}>{t("announcement")}</Text>
                  <Text style={styles.textContent}>
                    {t("announce to the users what you are looking for now!")}
                  </Text>
                </View>
                <LottieView
                  ref={ref1}
                  source={require("@/assets/animations/plusCheckAlt.json")}
                  loop={false}
                  style={{
                    width: wp(5),
                    height: wp(5),
                    outlineColor: COLORS[theme].textColor,
                  }}
                  speed={2}
                />
              </TouchableOpacity>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(300)}>
              <TouchableOpacity
                style={styles.offerContainer}
                onPress={() => {
                  if (selectedPostType !== "offer") {
                    ref1?.current?.play(90, 0);
                    ref2?.current?.play(0, 90);
                    dispatch(setAppPostType("offer"));
                  }
                }}
              >
                <MaterialIcons
                  name="local-offer"
                  size={60}
                  color={
                    theme == "dark"
                      ? COLORS[theme].textColor
                      : COLORS[theme].bgColor
                  }
                />
                <View style={styles.offerContent}>
                  <Text style={styles.subtitle}>{t("offer")}</Text>
                  <Text style={styles.textContent}>
                    {t("create an offer for everyone to see")}
                  </Text>
                </View>

                <LottieView
                  ref={ref2}
                  source={require("@/assets/animations/plusCheckAlt.json")}
                  loop={false}
                  style={{ width: wp(5), height: wp(5) }}
                  speed={2}
                />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const createStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      padding: wp(4),
      backgroundColor: COLORS[theme].softBgColor,
      flex: 1,
    },
    flex: {
      flex: 1,
    },
    title: {
      fontSize: hp(4.5),
      color: COLORS[theme].textColor,
      fontFamily: "Oswald_700Bold",
      // textTransform: "capitalize",
      lineHeight: hp(5.5),
    },
    announcementsContainer: {
      backgroundColor:
        theme === "light" ? COLORS[theme].miniViolet : COLORS[theme].violet,
      borderWidth: 1,
      borderColor: COLORS[theme].green,
      borderRadius: 8,
      padding: 15,
      marginVertical: 10,
      flexDirection: "row",
      gap: 15,
      alignItems: "center",
    },
    announcementContent: {
      flex: 1,
      gap: 5,
    },
    subtitle: {
      fontSize: hp(2),
      textTransform: "capitalize",
      fontFamily: "Oswald_700Bold",
      color: COLORS[theme].mainColor,
    },
    textContent: {
      fontSize: hp(1.5),
      color: COLORS[theme].textColor,
      fontFamily: "Poppins_300Light",
      textTransform: "none",
    },
    offerContainer: {
      backgroundColor:
        theme === "light" ? COLORS[theme].miniGreen : COLORS[theme].green,
      borderWidth: 1,
      borderColor: COLORS[theme].red,
      borderRadius: 8,
      padding: 15,
      marginVertical: 10,
      flexDirection: "row",
      gap: 15,
      alignItems: "center",
    },
    offerContent: {
      flex: 1,
      gap: 5,
    },
  });

export default Create;
