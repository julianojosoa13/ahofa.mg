import React, { FC, useLayoutEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  FadeInDown,
  FadeInLeft,
  ZoomIn,
} from "react-native-reanimated";
import { useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import LottieView from "lottie-react-native";
import { AntDesign } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/store/store";
import { selectAppTheme, setAppPostType } from "@/store/slices/appSlice";
import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import { useIsFocused } from "@react-navigation/native";

interface Props {}

const Create: FC<Props> = (props) => {
  const { t } = useTranslation();
  const theme = useSelector(selectAppTheme);
  const { top } = useSafeAreaInsets();
  const styles = createStyles(theme, top);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  const [currentPage, setCurrentPage] = useState(0);
  const [labelWidths, setLabelWidths] = useState<number[]>([]);
  const topScrollViewRef = useRef<ScrollView>(null);
  const labelScrollViewRef = useRef<ScrollView>(null);

  const labels = [t("houses"), t("vehicles"), t("sound"), t("electronic")];

  useLayoutEffect(() => {
    if (isFocused) dispatch(setAppPostType("none"));
  }, [isFocused]);

  const handleTopScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const pageWidth = Dimensions.get("window").width;
    const page = Math.round(offsetX / pageWidth);
    setCurrentPage(page);

    // Scroll the label to the center
    if (labelScrollViewRef.current) {
      labelScrollViewRef.current.scrollTo({
        x: page * (wp(20) + 8), // Adjust based on your label width and margin
        animated: true,
      });
    }
  };

  const handleLabelPress = (index: number) => {
    if (topScrollViewRef.current) {
      topScrollViewRef.current.scrollTo({
        x: index * Dimensions.get("window").width,
        animated: true,
      });
    }
  };

  const handleLabelLayout = (index: number, event: any) => {
    const { width } = event.nativeEvent.layout;
    setLabelWidths((prevWidths) => {
      const newWidths = [...prevWidths];
      newWidths[index] = width;
      return newWidths;
    });
  };

  const handleLabelScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    let cumulativeWidth = 0;
    for (let i = 0; i < labelWidths.length; i++) {
      cumulativeWidth += labelWidths[i] - 15; // Add marginHorizontal of 7.5 on both sides

      if (offsetX < cumulativeWidth) {
        setCurrentPage(i);
        // setTimeout(() => handleLabelPress(i), 600);

        break;
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isFocused && (
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setTimeout(() => router.back(), 300)}
          >
            <AntDesign name="close" size={25} color={"white"} />
          </TouchableOpacity>
          <ScrollView
            ref={topScrollViewRef}
            style={styles.scrollView}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleTopScroll}
            scrollEventThrottle={16}
          >
            {/* Section 1 */}
            <View style={styles.sectionContainer}>
              <Animated.Image
                entering={FadeInLeft}
                source={require("@/assets/images/pexels-perqued-13203179.jpg")}
                style={styles.image}
              />
            </View>

            {/* Section 2 */}
            <View style={styles.sectionContainer}>
              <Animated.Image
                entering={ZoomIn}
                source={require("@/assets/images/pexels-borta-2790256-30751893.jpg")}
                style={styles.image}
              />
            </View>

            {/* Section 3 */}
            <View style={styles.sectionContainer}>
              <Animated.Image
                entering={ZoomIn}
                source={require("@/assets/images/pexels-pavel-danilyuk-7120379.jpg")}
                style={styles.image}
              />
            </View>

            {/* Section 4 */}
            <View style={styles.sectionContainer}>
              <Animated.Image
                entering={ZoomIn}
                source={require("@/assets/images/pexels-amar-8981847.jpg")}
                style={styles.image}
              />
            </View>
          </ScrollView>
          <ScrollView
            ref={labelScrollViewRef}
            style={styles.labels}
            contentContainerStyle={styles.labelsContent}
            horizontal
            showsHorizontalScrollIndicator={false}
            onScroll={handleLabelScroll}
            scrollEventThrottle={16}
          >
            {labels.map((label, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleLabelPress(index)}
                onLayout={(event) => handleLabelLayout(index, event)}
              >
                <Animated.Text
                  style={[
                    styles.title,
                    currentPage === index && styles.selectedTitle,
                  ]}
                  entering={FadeInDown.delay(index * 150)}
                >
                  {label}
                </Animated.Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

const createStyles = (theme: "light" | "dark", top: number) =>
  StyleSheet.create({
    container: {
      paddingTop: top + 10,
      backgroundColor: COLORS[theme].softBgColor,
      flex: 1,
    },
    title: {
      fontSize: hp(1.8),
      color: COLORS[theme].textColor,
      fontFamily: "Oswald_500Medium",
      lineHeight: hp(5.5),
      marginHorizontal: 7,
      textAlign: "center",
    },
    selectedTitle: {
      color: COLORS[theme].mainColor, // Change to your selected color
      fontWeight: "bold",
    },
    closeButton: {
      position: "absolute",
      top: 10,
      left: 30,
      zIndex: 10,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS[theme].miniViolet,
      borderRadius: 20,
      width: 40,
      height: 40,
    },
    scrollView: {
      flex: 1,
    },
    sectionContainer: {
      width: Dimensions.get("window").width,
      paddingHorizontal: 20,
    },
    image: {
      width: wp(100) - 40,
      height: hp(75),
      borderRadius: 16,
    },
    labels: {
      height: 40,
      position: "absolute",
      bottom: hp(14),
      left: 0,
      zIndex: 20,
    },
    labelsContent: {
      paddingLeft: wp(40),
      paddingRight: wp(40),
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default Create;
