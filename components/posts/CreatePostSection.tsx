import COLORS from "@/utils/colors";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC, ReactNode } from "react";
import {
  ImageBackground,
  ImageSourcePropType,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  AnimatedStyle,
  BounceIn,
  FadeInLeft,
} from "react-native-reanimated";
import Button from "../ui/Button";
import { useSelector } from "react-redux";
import { selectAppTheme } from "@/store/slices/appSlice";
import { wp } from "@/utils/screensize";
import { useTranslation } from "react-i18next";

interface Props {
  imageSource: ImageSourcePropType | undefined;
  currentPage: number;
  gradientStyle: StyleProp<ViewStyle>;
  imageStyle: StyleProp<ViewStyle>;
  containerStyle: StyleProp<ViewStyle>;
  buttonContainerStyle: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
  buttonStyle: any;
  icon: ReactNode;
  sectionNumber: number;
  onSelect?: (actionType: "photo" | "details") => void | undefined;
}

const CreatePostSection: FC<Props> = ({
  currentPage,
  gradientStyle,
  buttonContainerStyle: buttonContainerstyle,
  imageStyle,
  containerStyle,
  imageSource,
  buttonStyle,
  icon,
  sectionNumber,
  onSelect = undefined,
}) => {
  const theme = useSelector(selectAppTheme);
  const { t } = useTranslation();

  return (
    <View style={containerStyle}>
      <ImageBackground source={imageSource} style={imageStyle}>
        <LinearGradient
          colors={["rgba(0,0,0,0.35)", "rgba(0,0,0,0.95)"]}
          start={{ x: 0, y: 0.35 }}
          end={{ x: 0, y: 1 }}
          style={gradientStyle}
        >
          {currentPage === sectionNumber && (
            <>
              <Animated.View entering={BounceIn.duration(600).delay(50)}>
                <Text style={{ color: "white", textAlign: "center" }}>
                  {t("add")}
                </Text>
                <TouchableOpacity
                  style={{
                    marginBottom: 60,
                    marginTop: 8,
                    alignSelf: "center",
                    height: 65,
                    width: 65,
                    borderRadius: 32.5,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 2,
                    borderColor: "lightgrey",
                  }}
                >
                  <AntDesign name="camera" size={40} color="whitesmoke" />
                </TouchableOpacity>
              </Animated.View>
              <Animated.View
                style={buttonContainerstyle}
                entering={FadeInLeft.duration(450)}
              >
                <Button
                  title={t("create")}
                  style={buttonStyle}
                  textStyle={{ textTransform: "capitalize" }}
                  action={() => onSelect!("details")}
                >
                  {icon}
                </Button>
              </Animated.View>
            </>
          )}
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CreatePostSection;
