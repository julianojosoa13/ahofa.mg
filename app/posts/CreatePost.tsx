import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import { AntDesign, Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "@react-native-community/blur";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";
import Button from "@/components/ui/Button";
import { useAppDispatch } from "@/store/store";
import { setAppBusy } from "@/store/slices/appSlice";
import BusyModal from "@/components/modals/BusyModal";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import Announcement from "@/components/PostTypes/Announcement";
import Offer from "@/components/PostTypes/Offer";
import NoCategory from "@/components/Categories/NoCategory";
import Vehicle from "@/components/Categories/Vehicle";
import Terrain from "@/components/Categories/Terrrain";
import Houses from "@/components/Categories/Houses";
import Sound from "@/components/Categories/Sound";
import Electronics from "@/components/Categories/Eletronics";
import CategoryChanger from "@/components/Categories/CategoryChanger";
import CategorySelectModal from "@/components/modals/CategorySelectModal";

interface Props {}

const CreatePost: FC<Props> = (props) => {
  const { top } = useSafeAreaInsets();
  const styles = createStyles(top);
  const router = useRouter();
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const user = auth().currentUser;

  const [description, setDescription] = useState("");

  const handleClose = () => {
    router.dismiss();
  };

  const handlePublish = () => {
    dispatch(setAppBusy(true));
    setTimeout(() => {
      dispatch(setAppBusy(false));
    }, 3000);
  };

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
  };

  return (
    <Animated.View
      style={[styles.container, { top }]}
      entering={SlideInDown.duration(300)}
      exiting={SlideOutDown}
    >
      <CategorySelectModal />
      <BusyModal />
      <View style={styles.headerContainer}>
        <BlurView
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
        <View style={styles.customHeader}>
          <TouchableOpacity onPress={handleClose}>
            <AntDesign name="close" size={25} />
          </TouchableOpacity>
          <Text style={styles.title}>{t("new post")}</Text>
        </View>
      </View>
      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.userDetailsContainer}>
          <Image
            source={{ uri: user?.photoURL! }}
            style={{ width: wp(15), height: wp(15), borderRadius: wp(15 / 2) }}
          />
          <View>
            <Text style={styles.userName}>{user?.displayName}</Text>
            <Announcement />
          </View>
        </View>
        <View
          style={{
            // backgroundColor: "rgba(255,250,245,1)",
            // elevation: 2,
            marginBottom: hp(2),
            borderRadius: 8,
            paddingHorizontal: wp(2),
          }}
        >
          <Text
            style={[
              styles.title,
              { fontSize: hp(1.8), marginVertical: hp(1), fontWeight: "900" },
            ]}
          >
            {t("what are you thinking")}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              marginBottom: hp(4),
            }}
          >
            <Text style={{ fontWeight: "200" }}>{t("select a category")}</Text>
            <CategoryChanger />
          </View>
        </View>

        <View
          style={{
            // backgroundColor: ")rgba(255,250,245,1)",
            // elevation: 2,
            marginBottom: hp(2),
            borderRadius: 8,
            paddingBottom: hp(2),
            paddingHorizontal: wp(2),
          }}
        >
          <Text
            style={[
              styles.title,
              { fontSize: hp(1.6), marginVertical: hp(1), fontWeight: "900" },
              description.length > 150 && { color: "red" },
            ]}
            numberOfLines={2}
          >
            {`${t("describe what you are looking for")}  (${
              description.length
            } /  150)`}
          </Text>
          <TextInput
            style={styles.descriptions}
            multiline
            placeholder={t("describe what you are looking for")}
            value={description}
            onChangeText={(text) => handleDescriptionChange(text)}
            maxLength={150}
          />
        </View>
        <Button title={t("publish")} action={handlePublish}></Button>
      </KeyboardAwareScrollView>
    </Animated.View>
  );
};

const createStyles = (top: number) =>
  StyleSheet.create({
    container: { flex: 1 },
    headerContainer: {
      position: "absolute",
      left: 0,
      zIndex: 200,
    },
    customHeader: {
      height: hp(7.5),
      width: wp(100),
      backgroundColor: "rgba(255,255,255,0.9)",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: wp(8),
      gap: wp(5),
    },
    scrollView: {
      flex: 1,
      backgroundColor: COLORS.bgColor,
      paddingHorizontal: wp(4),
    },
    title: {
      fontWeight: "bold",
      color: COLORS.thirdColor,
      fontSize: hp(2.25),
    },
    close: {},
    contentContainer: {
      paddingTop: hp(8),
    },
    descriptions: {
      // borderWidth: 1,
      borderColor: "lightgrey",
      backgroundColor: "rgba(255,255,255,1)",
      borderRadius: 12,
      verticalAlign: "top",
      padding: 10,
      height: hp(15),
      fontWeight: "300",
      borderWidth: 0.5,
    },
    userDetailsContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: wp(4),
      marginTop: hp(1),
      marginBottom: hp(3),
    },
    userName: {
      fontWeight: "bold",
      color: COLORS.secondaryColor,
    },
  });

export default CreatePost;
