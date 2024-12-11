import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import {
  AntDesign,
  FontAwesome6,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import IconContainer from "../../components/IconContainer";
import { Image, Pressable, Text, TouchableOpacity } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

const marginBottom = hp(0.25);

const HomeLayout = () => {
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
          return (
            <Animated.Image
              entering={FadeInUp.delay(0).duration(300)}
              source={require("@/assets/images/brand/trans_bg.png")}
              style={{ width: wp(20), height: wp(20) }}
            />
          );
        },
        headerRight: () => {
          return (
            <Animated.View
              entering={FadeInDown.delay(75).duration(300)}
              style={{
                flexDirection: "row",
                gap: wp(2),
                justifyContent: "space-around",
              }}
            >
              <Pressable
                style={{
                  width: wp(60),
                  height: hp(5),
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: wp(2.5),
                  backgroundColor: COLORS.bgColor,
                }}
              >
                <Text
                  style={{ color: COLORS.secondaryColor, fontWeight: "300" }}
                >
                  À Quoi pensez-vous?
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
          title: "Maisons",
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
          title: "Véhicules",
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
          title: "Terrain",
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
          title: "Instruments de Musique",
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
          title: "Electronique",
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
