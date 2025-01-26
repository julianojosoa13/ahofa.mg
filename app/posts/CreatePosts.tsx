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

interface Props {}

const CreatePosts: FC<Props> = (props) => {
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
    <View style={[styles.container, { top }]}>
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
            <TouchableOpacity style={styles.selectPostTypeButton}>
              <MaterialIcons name="arrow-drop-down" size={24} color="white" />
              <Text style={styles.selectPostTypeButtonLabel}>
                {t("announcement")}
              </Text>
              <Entypo name="megaphone" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <Text
          style={[
            styles.title,
            { fontSize: hp(1.8), marginVertical: hp(1), fontWeight: "500" },
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
          <TouchableOpacity style={styles.selectCategoryButton}>
            <MaterialIcons name="public" size={20} color={"darkorange"} />
            <Text style={styles.selectCategoryButtonLabel}>
              {t("category")}
            </Text>
            <MaterialIcons
              name="arrow-drop-down"
              size={24}
              color="darkorange"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: "whitesmoke",
            elevation: 2,
            marginBottom: hp(4),
            borderRadius: 8,
            paddingBottom: hp(2),
            paddingHorizontal: wp(2),
            borderWidth: 0.5,
            borderColor: "lightgrey",
          }}
        >
          <Text
            style={[
              styles.title,
              { fontSize: hp(1.8), marginVertical: hp(1), fontWeight: "500" },
            ]}
          >
            {t("product details")}
          </Text>
          <View style={{ paddingHorizontal: wp(4) }}>
            <Text>{t("none")}</Text>
          </View>
        </View>
        <Text
          style={[
            styles.title,
            { fontSize: hp(1.8), marginVertical: hp(1), fontWeight: "500" },
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
        <Button title={t("publish")} action={handlePublish}></Button>
      </KeyboardAwareScrollView>
    </View>
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
      borderWidth: 1,
      borderColor: "lightgrey",
      backgroundColor: "rgba(255,255,255,0.75)",
      borderRadius: 8,
      verticalAlign: "top",
      padding: 10,
      height: hp(15),
      fontWeight: "300",
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
    selectCategoryButton: {
      marginVertical: hp(0.5),
      backgroundColor: "#E8D2CF",
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      borderRadius: 10,
      height: 30,
      paddingHorizontal: wp(2),
    },
    selectPostTypeButton: {
      marginVertical: hp(0.5),
      backgroundColor: "lightgrey",
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      borderRadius: 10,
      height: 30,
      paddingHorizontal: wp(2),
    },
    selectCategoryButtonLabel: {
      fontWeight: "500",
      color: COLORS.mainColor,
    },
    selectPostTypeButtonLabel: {
      fontWeight: "400",
      color: "white",
      fontSize: hp(1.5),
      textTransform: "capitalize",
    },
  });

export default CreatePosts;
