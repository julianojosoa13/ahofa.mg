import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
  Alert,
  BackHandler,
} from "react-native";
import { Pressable, ScrollView } from "react-native-gesture-handler";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  ZoomIn,
} from "react-native-reanimated";
import { useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";
// import { Image, ImageBackground } from "expo-image";
import LottieView from "lottie-react-native";
import {
  AntDesign,
  Feather,
  FontAwesome5,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/store/store";
import {
  selectAppTheme,
  setAppPostType,
  setShowYesNoDialog,
} from "@/store/slices/appSlice";
import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import { useIsFocused } from "@react-navigation/native";
import RoundedButton from "@/components/ui/RoundedButton";
import Button from "@/components/ui/Button";
import { LinearGradient } from "expo-linear-gradient";
import YesNoDialog from "@/components/modals/YesNoDialog";

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
  const [showToolTip, setShowToolTip] = useState(true);

  const [activeScrollView, setActiveScrollView] = useState(0);

  const topScrollViewRef = useRef<ScrollView>(null);
  const labelScrollViewRef = useRef<ScrollView>(null);

  const labels = [t("houses"), t("vehicles"), t("sound"), t("electronic")];

  useLayoutEffect(() => {
    if (isFocused) dispatch(setAppPostType("none"));
  }, [isFocused]);

  const handleTopScroll = (event: any) => {
    if (showToolTip) setShowToolTip(false);
    const offsetX = event.nativeEvent.contentOffset.x;
    const pageWidth = Dimensions.get("window").width;
    const page = Math.round(offsetX / pageWidth);
    if (activeScrollView === 0) setCurrentPage(page);

    // Scroll the label to the center
    if (labelScrollViewRef.current && activeScrollView == 0) {
      labelScrollViewRef!.current!.scrollTo({
        x: page * (wp(20) + 8), // Adjust based on your label width and margin
        animated: true,
      });
    }
    setActiveScrollView(0);
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

  const hideYesNoDialog = () => {
    dispatch(setShowYesNoDialog(false));
  };

  useEffect(() => {
    if (!isFocused) setCurrentPage(0);
  }, [isFocused]);

  useEffect(() => {
    setTimeout(() => setShowToolTip(false), 5500);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Show confirmation dialog
        dispatch(setShowYesNoDialog(true));
        // Return true to block the default back button behavior
        return true;
      };

      // Add the event listener for the back button
      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      // Clean up the event listener when the screen is unfocused
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );
  return (
    <LinearGradient
      colors={[
        "rgba(0,0,150,0.5)",
        theme == "light" ? "rgba(255,250,250,0.5)" : "rgba(0,0,0,0.5)",
      ]}
      start={{ x: 0.6, y: 0.15 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {showToolTip && (
        <Pressable
          focusable
          onPress={() => setShowToolTip(false)}
          style={{
            ...StyleSheet.absoluteFillObject,
            flex: 1,
            zIndex: 200,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.8)",
          }}
        >
          <LottieView
            source={require("@/assets/animations/swipeLeft.json")}
            style={{ width: 175, height: 175 }}
            autoPlay
            speed={0.75}
          />
        </Pressable>
      )}
      {isFocused && (
        <View style={{ flex: 1 }}>
          <YesNoDialog
            inverted
            title={t("Stop edit")}
            yesAction={() => router.back()}
            noAction={() => hideYesNoDialog()}
          >
            <Text
              style={{
                textAlign: "center",
                color: COLORS[theme].thirdColor,
                marginVertical: 35,
              }}
            >
              {t("Do you really want to stop creating your product?")}
            </Text>
          </YesNoDialog>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              dispatch(setShowYesNoDialog(true));
            }}
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
              <ImageBackground
                source={require("@/assets/images/pexels-perqued-13203179.jpg")}
                style={styles.image}
              >
                <LinearGradient
                  colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.65)"]}
                  start={{ x: 0, y: 0.25 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.gradient}
                >
                  {currentPage === 0 && (
                    <Animated.View
                      style={styles.buttonContainer}
                      entering={FadeInLeft.duration(450)}
                    >
                      <Button
                        title={t("create")}
                        style={{
                          marginHorizontal: 25,
                          borderRadius: 10,
                          backgroundColor: COLORS[theme].imageTintColor,
                        }}
                        textStyle={{ textTransform: "capitalize" }}
                      >
                        <MaterialIcons
                          name="add-home"
                          size={24}
                          color={COLORS[theme].white}
                        />
                      </Button>
                    </Animated.View>
                  )}
                </LinearGradient>
              </ImageBackground>
            </View>

            {/* Section 2 */}
            <View style={styles.sectionContainer}>
              <ImageBackground
                source={require("@/assets/images/pexels-eddievaldes155-19871522.jpg")}
                // source={require("@/assets/images/pexels-perqued-13203179.jpg")}
                style={styles.image}
                resizeMode="cover"
              >
                <LinearGradient
                  colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.95)"]}
                  start={{ x: 0, y: 0.25 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.gradient}
                >
                  {currentPage === 1 && (
                    <Animated.View
                      style={styles.buttonContainer}
                      entering={FadeInLeft.duration(450)}
                    >
                      <Button
                        title={t("create")}
                        style={{
                          marginHorizontal: 25,
                          borderRadius: 10,
                          backgroundColor: COLORS[theme].violet,
                          textTransform: "capitalize",
                          fontSize: hp(1.5),
                        }}
                        textStyle={{ textTransform: "capitalize" }}
                      >
                        <FontAwesome5
                          name="car"
                          size={24}
                          color={COLORS[theme].white}
                        />
                      </Button>
                    </Animated.View>
                  )}
                </LinearGradient>
              </ImageBackground>
            </View>

            {/* Section 3 */}
            <View style={styles.sectionContainer}>
              <ImageBackground
                // source={require("@/assets/images/pexels-pavel-danilyuk-7120379.jpg")}
                source={require("@/assets/images/pexels-wendywei-1943411.jpg")}
                style={styles.image}
              >
                <LinearGradient
                  colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.95)"]}
                  start={{ x: 0, y: 0.25 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.gradient}
                >
                  {currentPage === 2 && (
                    <Animated.View
                      style={styles.buttonContainer}
                      entering={FadeInRight.duration(450)}
                    >
                      <Button
                        title={t("create")}
                        style={{
                          marginHorizontal: 25,
                          borderRadius: 10,
                          backgroundColor: COLORS[theme].yellow,
                          textTransform: "capitalize",
                          fontSize: hp(1.5),
                        }}
                        textStyle={{ textTransform: "capitalize" }}
                      >
                        <Feather
                          name="music"
                          size={24}
                          color={COLORS[theme].white}
                        />
                      </Button>
                    </Animated.View>
                  )}
                </LinearGradient>
              </ImageBackground>
            </View>

            {/* Section 4 */}
            <View style={styles.sectionContainer}>
              <ImageBackground
                source={require("@/assets/pexels-amar-8981847.jpg")}
                style={styles.image}
              >
                <LinearGradient
                  colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.95)"]}
                  start={{ x: 0, y: 0.25 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.gradient}
                >
                  {currentPage === 3 && (
                    <Animated.View
                      style={styles.buttonContainer}
                      entering={FadeInRight.duration(450)}
                    >
                      <Button
                        title={t("create")}
                        style={{
                          marginHorizontal: 25,
                          borderRadius: 10,
                          backgroundColor: COLORS[theme].red,
                          textTransform: "capitalize",
                          fontSize: hp(1.5),
                        }}
                        textStyle={{ textTransform: "capitalize" }}
                      >
                        <FontAwesome6
                          name="computer"
                          size={24}
                          color={COLORS[theme].white}
                        />
                      </Button>
                    </Animated.View>
                  )}
                </LinearGradient>
              </ImageBackground>
            </View>
          </ScrollView>
          <ScrollView
            ref={labelScrollViewRef}
            style={styles.labels}
            contentContainerStyle={styles.labelsContent}
            horizontal
            showsHorizontalScrollIndicator={false}
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
    </LinearGradient>
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
      color: theme == "dark" ? "lightgrey" : "white", // Change to your selected color
      fontWeight: "bold",
      backgroundColor: COLORS[theme].thirdColor,
      borderRadius: 20,
      textAlign: "center",
      paddingHorizontal: 15,
      lineHeight: hp(3.5),
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
      overflow: "hidden",
    },
    gradient: {
      width: wp(100) - 40,
      height: hp(75),
      borderRadius: 16,
      overflow: "hidden",
      justifyContent: "flex-end",
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
    buttonContainer: {
      bottom: hp(2),
    },
  });

export default Create;
