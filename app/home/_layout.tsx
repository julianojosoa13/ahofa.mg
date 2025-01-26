import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import {
  AntDesign,
  Entypo,
  FontAwesome6,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import IconContainer from "../../components/IconContainer";
import {
  Image,
  Pressable,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import SideDrawer from "@/components/modals/SideDrawer";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import LottieView from "lottie-react-native";
import { useAppDispatch } from "@/store/store";

const marginBottom = hp(0.25);

const HomeLayout = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        headerShown: true,
        headerTitle: () => null,
        headerShadowVisible: false,
        tabBarStyle: {
          height: hp(7),
          position: "absolute",
          bottom: 0,
        },
        tabBarActiveTintColor: COLORS.mainColor,
        tabBarInactiveTintColor: COLORS.secondaryColor,
        headerLeft: () => {
          const [visible, setVisible] = useState(false);
          return (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: wp(1),
              }}
            >
              <TouchableOpacity onPress={() => setVisible(true)}>
                <Entypo name="menu" size={40} color={COLORS.thirdColor} />
              </TouchableOpacity>

              <SideDrawer
                visible={visible}
                onRequestClose={() => setVisible(false)}
              />
            </View>
          );
        },
        headerRight: () => {
          const animRef = useRef<LottieView | null>(null);

          const handlePress = () => {
            animRef.current?.play();
            setTimeout(() => {
              router.navigate("/posts/CreatePosts");
            }, 600);
          };
          return (
            <Animated.View
              style={{
                flexDirection: "row",
                gap: wp(2),
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.67}
                style={{
                  width: wp(74),
                  height: hp(5),
                  borderRadius: 40,
                  flexDirection: "row",
                  paddingHorizontal: wp(2),
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingLeft: wp(2.5),
                  backgroundColor: "rgba(200,200,200,0.33)",
                  borderColor: "lightgrey",
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontWeight: "200",
                    fontSize: hp(1.9),
                  }}
                >
                  {t("what are you thinking")}
                </Text>
                <AntDesign name="search1" size={25} color={COLORS.thirdColor} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: wp(2.5),
                }}
                onPress={handlePress}
              >
                <LottieView
                  source={require("@/assets/animations/plusAlt.json")}
                  style={{
                    width: 40,
                    height: 40,
                    marginLeft: 0,
                    backgroundColor: COLORS.mainColor,
                  }}
                  ref={animRef}
                  speed={1.5}
                  loop={false}
                />
              </TouchableOpacity>
            </Animated.View>
          );
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("houses"),
          tabBarIcon: ({ focused }) => {
            return (
              <IconContainer delay={0} focused={focused}>
                <AntDesign
                  name="home"
                  color={focused ? COLORS.bgColor : COLORS.secondaryColor}
                  size={25}
                />
              </IconContainer>
            );
          },
        }}
      />
      <Tabs.Screen
        name="Cars"
        options={{
          title: t("vehicles"),
          tabBarIcon: ({ focused }) => {
            return (
              <IconContainer delay={150} focused={focused}>
                <AntDesign
                  name="car"
                  color={focused ? COLORS.bgColor : COLORS.secondaryColor}
                  size={25}
                />
              </IconContainer>
            );
          },
        }}
      />
      <Tabs.Screen
        name="Lands"
        options={{
          title: t("terrains"),
          tabBarIcon: ({ focused }) => {
            return (
              <IconContainer delay={300} focused={focused}>
                <MaterialIcons
                  name="landscape"
                  color={focused ? COLORS.bgColor : COLORS.secondaryColor}
                  size={25}
                />
              </IconContainer>
            );
          },
        }}
      />
      <Tabs.Screen
        name="Music"
        options={{
          title: t("sound"),
          tabBarIcon: ({ focused }) => {
            return (
              <IconContainer delay={450} focused={focused}>
                <SimpleLineIcons
                  name="music-tone-alt"
                  color={focused ? COLORS.bgColor : COLORS.secondaryColor}
                  size={25}
                />
              </IconContainer>
            );
          },
        }}
      />
      <Tabs.Screen
        name="Computers"
        options={{
          title: t("electronic"),
          tabBarIcon: ({ focused }) => {
            return (
              <IconContainer delay={600} focused={focused}>
                <FontAwesome6
                  name="computer"
                  color={focused ? COLORS.bgColor : COLORS.secondaryColor}
                  size={22}
                />
              </IconContainer>
            );
          },
        }}
      />
    </Tabs>
  );
};

export default HomeLayout;
