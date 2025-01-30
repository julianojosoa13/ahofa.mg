import BusyModal from "@/components/modals/BusyModal";
import { selectAppTheme } from "@/store/slices/appSlice";
import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import {
  AntDesign,
  Entypo,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import React, { FC } from "react";
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

  const isFocused = useIsFocused();

  return (
    <SafeAreaView style={styles.container}>
      {isFocused && (
        <>
          <View style={styles.flex}>
            <BusyModal />

            <Animated.Text style={styles.title} entering={FadeInDown}>
              {t("create")} <AntDesign name="plus" size={wp(7.5)} />
            </Animated.Text>
            <Animated.View entering={FadeInDown}>
              <TouchableOpacity style={styles.announcementsContainer}>
                <Entypo
                  name="megaphone"
                  size={60}
                  color={COLORS[theme].bgColor}
                />
                <View style={styles.announcementContent}>
                  <Text style={styles.subtitle}>{t("annoucements")}</Text>
                  <Text style={styles.textContent}>
                    {t("annouce to the users what you are looking for now!")}
                  </Text>
                </View>
                <AntDesign
                  name="plus"
                  size={wp(7)}
                  color={COLORS[theme].bgColor}
                />
              </TouchableOpacity>
            </Animated.View>

            <Animated.View entering={FadeInDown}>
              <TouchableOpacity style={styles.offerContainer}>
                <MaterialIcons
                  name="local-offer"
                  size={60}
                  color={COLORS[theme].bgColor}
                />
                <View style={styles.offerContent}>
                  <Text style={styles.subtitle}>{t("offer")}</Text>
                  <Text style={styles.textContent}>
                    {t("create an offer for everyone to see")}
                  </Text>
                </View>
                <AntDesign
                  name="plus"
                  size={wp(7)}
                  color={COLORS[theme].bgColor}
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
      textTransform: "capitalize",
      lineHeight: hp(5.5),
    },
    announcementsContainer: {
      backgroundColor: COLORS[theme].miniViolet,
      borderWidth: 1,
      borderColor: COLORS[theme].violet,
      borderRadius: 10,
      padding: 15,
      marginVertical: 20,
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
      color: COLORS[theme].textColor,
    },
    textContent: {
      fontSize: hp(1.5),
      color: COLORS[theme].textColor,
      fontFamily: "Poppins_300Light",
      textTransform: "capitalize",
    },
    offerContainer: {
      backgroundColor: COLORS[theme].miniRed,
      borderWidth: 1,
      borderColor: COLORS[theme].red,
      borderRadius: 10,
      padding: 15,
      marginVertical: 20,
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
