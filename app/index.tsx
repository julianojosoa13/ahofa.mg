import { hp, wp } from "@/utils/screensize";
import { Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { useTranslation } from "react-i18next";
import COLORS from "@/utils/colors";
import Button from "@/components/ui/Button";
import LanguagesButton from "@/components/LanguagesButton";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  const { t } = useTranslation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <StatusBar style="dark" />
      <View style={{ position: "absolute", top: hp(4.5), right: wp(5) }}>
        <LanguagesButton />
      </View>

      <Animated.Image
        entering={FadeInDown.delay(1200).duration(300)}
        source={require("@/assets/images/brand/trans_bg.png")}
        style={{ width: wp(50), height: hp(25) }}
        resizeMode={"contain"}
      />

      <View>
        <Animated.Text
          entering={FadeInDown.delay(600).duration(300)}
          style={{ fontSize: hp(1.8), fontWeight: "300", textAlign: "center" }}
        >
          {t("welcome_to")}
          <Text
            style={{
              fontWeight: "bold",
              color: COLORS.thirdColor,
              fontSize: hp(2.3),
            }}
          >
            AHOFA.MG!
          </Text>
        </Animated.Text>
        <Animated.View entering={FadeInDown.delay(900).duration(300)}>
          <Button
            action={() => router.navigate("/home")}
            title={t("continue")}
            style={{ width: wp(70) }}
          ></Button>
        </Animated.View>
      </View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 13,
          fontWeight: "200",
          position: "absolute",
          bottom: hp(2.5),
        }}
      >
        Tous droits reservés, 2025 !
      </Text>
    </View>
  );
}
