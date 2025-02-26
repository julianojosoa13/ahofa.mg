import { hp, wp } from "@/utils/screensize";
import { Text, View } from "react-native";
import Animated, {
  BounceIn,
  FadeIn,
  FadeInDown,
  ZoomInDown,
} from "react-native-reanimated";

import { useTranslation } from "react-i18next";
import COLORS from "@/utils/colors";
import Button from "@/components/ui/Button";
import LanguagesButton from "@/components/ui/LanguagesButton";
import { StatusBar } from "expo-status-bar";

import { selectTranslationsLanguage } from "@/store/slices/translationsSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import i18n from "@/lib/i18n";
import LottieView from "lottie-react-native";
import ToSModal from "@/components/bottomsheets/ToSModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BusyModal from "@/components/modals/BusyModal";
import { selectAppTheme, setShowLoginModal } from "@/store/slices/appSlice";
import LoginModal from "@/components/modals/LoginModal";
import { selectAcceptedToS } from "@/store/slices/onboardingSlice";
import ThemedLogo from "@/components/ui/ThemedLogo";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

export default function Home() {
  const { t } = useTranslation();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const dispatch = useDispatch();

  const theme = useSelector(selectAppTheme);
  const acceptedToS = useSelector(selectAcceptedToS);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    console.log("acceptedTos >> ", acceptedToS);
    if (!acceptedToS) bottomSheetModalRef.current?.present();
    else dispatch(setShowLoginModal(true));
  }, []);
  const language = useSelector(selectTranslationsLanguage);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: COLORS[theme].softBgColor,
      }}
    >
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      <View
        style={{
          position: "absolute",
          top: hp(4.5),
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: wp(100),
          paddingHorizontal: wp(5),
        }}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", gap: wp(1) }}
        >
          <ThemeSwitcher />
          <Text
            style={{
              color: COLORS[theme].textColor,
              textTransform: "capitalize",
              fontFamily: "Poppins_200ExtraLight",
              marginTop: 4,
            }}
          >
            {t(theme)}
          </Text>
        </View>
        <LanguagesButton />
      </View>

      <ThemedLogo
        style={{
          width: wp(50),
          height: hp(25),
          marginTop: hp(10),
          marginBottom: -hp(10),
        }}
        entering={FadeInDown.delay(1200).duration(300)}
      />
      <View
        style={{
          borderRadius: "50%",
          backgroundColor: COLORS[theme].bgColor,
        }}
      >
        <LottieView
          source={require("@/assets/animations/shop.json")}
          autoPlay
          loop
          speed={0.75}
          style={{ width: wp(55), height: wp(55) }}
        />
      </View>
      <View>
        <Animated.Text
          entering={FadeInDown.delay(600).duration(300)}
          style={{
            fontSize: hp(1.8),
            textAlign: "center",
            color: COLORS[theme].textColor,
            fontFamily: "Poppins_300Light",
          }}
        >
          {t("welcome_to")}
          <Text
            style={{
              color: COLORS[theme].thirdColor,
              fontSize: hp(2.3),
              fontFamily: "Poppins_600SemiBold",
            }}
          >
            AHOFA.MG!
          </Text>
        </Animated.Text>
        <Animated.View
          entering={FadeInDown.delay(900)}
          style={{ width: wp(80) }}
        >
          <Button
            action={handlePresentModalPress}
            title={t("continue")}
          ></Button>
        </Animated.View>
      </View>

      <ToSModal
        ref={bottomSheetModalRef}
        onClose={() => bottomSheetModalRef.current?.close()}
      />

      <LoginModal />
      <BusyModal />
      <Text
        style={{
          textAlign: "center",
          fontSize: 13,
          position: "absolute",
          bottom: hp(2.5),
          color: COLORS[theme].textColor,
          fontFamily: "Poppins_200ExtraLight",
        }}
      >
        {t("all rights")}
      </Text>
    </View>
  );
}
