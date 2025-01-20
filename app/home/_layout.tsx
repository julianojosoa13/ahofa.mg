import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import {
  AntDesign,
  Entypo,
  FontAwesome6,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
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
import { useState } from "react";
import { useTranslation } from "react-i18next";

const marginBottom = hp(0.25);

const HomeLayout = () => {
  const { t } = useTranslation();

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
                <Entypo name="menu" size={34} color={COLORS.thirdColor} />
              </TouchableOpacity>

              <SideDrawer
                visible={visible}
                onRequestClose={() => setVisible(false)}
              />
            </View>
          );
        },
        headerRight: () => {
          return (
            <Animated.View
              style={{
                flexDirection: "row",
                gap: wp(2),
                justifyContent: "space-between",
              }}
            >
              <Pressable
                style={{
                  width: wp(77),
                  height: hp(5),
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: wp(2.5),
                  backgroundColor: COLORS.bgColor,
                }}
              >
                <Text
                  style={{
                    color: COLORS.secondaryColor,
                    fontWeight: "300",
                    fontSize: hp(1.9),
                  }}
                >
                  {t("what are you thinking")}
                </Text>
              </Pressable>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: wp(2),
                }}
              >
                <AntDesign name="search1" size={30} />
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
