import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import {
  AntDesign,
  Entypo,
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import IconContainer from "../../components/ui/IconContainer";
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
import { useSelector } from "react-redux";
import { selectAppTheme } from "@/store/slices/appSlice";
import { BlurView } from "@react-native-community/blur";
import { TouchableRipple } from "react-native-paper";

const marginBottom = hp(0.25);

const HomeLayout = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const theme = useSelector(selectAppTheme);
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

        tabBarActiveTintColor: COLORS[theme].mainColor,
        tabBarInactiveTintColor: COLORS[theme].secondaryColor,
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
                <MaterialCommunityIcons
                  name="microsoft-xbox-controller-menu"
                  size={40}
                  color={COLORS[theme].mainColor}
                />
              </TouchableOpacity>

              <SideDrawer
                visible={visible}
                onRequestClose={() => setVisible(false)}
              />
            </View>
          );
        },
        headerStyle: { backgroundColor: COLORS[theme].bgColor },
        headerRight: () => {
          const animRef = useRef<LottieView | null>(null);

          const handlePress = () => {
            animRef.current?.play();
            setTimeout(() => {
              // router.navigate("/posts/CreatePost");
            }, 300);
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
                  width: wp(85),
                  height: hp(5),
                  borderRadius: 40,
                  flexDirection: "row",
                  paddingHorizontal: wp(2),
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingLeft: wp(2.5),
                  marginRight: wp(3.5),
                  backgroundColor: COLORS[theme].softBgColor,
                  borderColor: "lightgrey",
                }}
              >
                <Text
                  style={{
                    marginTop: 6,
                    fontFamily: "Poppins_200ExtraLight",
                    fontSize: hp(1.9),
                    color: COLORS[theme].textColor,
                  }}
                >
                  {t("what are you thinking")}
                </Text>
                <AntDesign
                  name="search1"
                  size={25}
                  color={COLORS[theme].textColor}
                />
              </TouchableOpacity>
            </Animated.View>
          );
        },
        tabBarBackground: () => {
          return (
            <View
              style={{
                backgroundColor: COLORS[theme].bgColor,
                position: "absolute",
                height: 60,
                width: "100%",
                bottom: 0,
              }}
            ></View>
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
                  color={
                    focused
                      ? COLORS[theme].bgColor
                      : COLORS[theme].secondaryColor
                  }
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
                  color={
                    focused
                      ? COLORS[theme].bgColor
                      : COLORS[theme].secondaryColor
                  }
                  size={25}
                />
              </IconContainer>
            );
          },
        }}
      />
      <Tabs.Screen
        name="Create"
        options={{
          title: t(""),
          tabBarIcon: ({ focused }) => {
            return (
              <IconContainer delay={300} focused={focused}>
                <MaterialIcons
                  name="add-box"
                  color={
                    focused
                      ? COLORS[theme].bgColor
                      : COLORS[theme].secondaryColor
                  }
                  style={!focused ? { marginTop: 15 } : null}
                  size={33}
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
                  color={
                    focused
                      ? COLORS[theme].bgColor
                      : COLORS[theme].secondaryColor
                  }
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
                  color={
                    focused
                      ? COLORS[theme].bgColor
                      : COLORS[theme].secondaryColor
                  }
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
