import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Pressable,
  StatusBar,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { Switch } from "react-native";
import Button from "../ui/Button";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Animated, { SlideInDown } from "react-native-reanimated";
import { hp, wp } from "@/utils/screensize";
import COLORS from "@/utils/colors";
import { useSelector } from "react-redux";
import { selectAppTheme } from "@/store/slices/appSlice";
import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BlurView } from "@react-native-community/blur";

// Define types
type FormData = {
  type: string;
  rooms: string;
  floor: string;
  kitchen: string;
  toilets: string;
  toiletsOutside: boolean;
  location: string;
  rentPrice: string;
  description: string;
  pictures: string[];
};

type ImagePickerResponse = {
  assets: [];
};

interface Props {
  visible?: boolean;
  actionType?: "photo" | "details";
  onRequestClose: () => void;
}

const CreateApartmentBottomSheet = ({
  visible = false,
  actionType = "details",
  onRequestClose,
}: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [activeTab, setActiveTab] = useState<"Details" | "Pictures">("Details");
  const [hidden, setHidden] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    type: "Apartment",
    rooms: "",
    floor: "",
    kitchen: "",
    toilets: "",
    toiletsOutside: false,
    location: "Antananarivo",
    rentPrice: "",
    description: "",
    pictures: [],
  });

  // const theme = "light";
  const theme = useSelector(selectAppTheme);

  const styles = createStyles(theme);

  const handleInputChange = (name: keyof FormData, value: string | boolean) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleImagePicker = async () => {
    const response = await ImagePicker.launchImageLibraryAsync();
    if (response.assets && response.assets.length > 0) {
      const newPictures = [
        ...formData.pictures,
        ...response.assets.map((asset: any) => asset.uri!),
      ];
      if (newPictures.length <= 5) {
        setFormData({ ...formData, pictures: newPictures });
      } else {
        alert("You can only upload up to 5 pictures.");
      }
    }
  };

  const handleTakePhoto = async () => {
    try {
      const response = await ImagePicker.launchCameraAsync();
      if (response.assets && response.assets.length > 0) {
        const newPictures = [...formData.pictures, response.assets[0].uri!];
        if (newPictures.length <= 5) {
          setFormData({ ...formData, pictures: newPictures });
        } else {
          alert("You can only upload up to 5 pictures.");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePicture = (index: number) => {
    const newPictures = formData.pictures.filter((_, i) => i !== index);
    setFormData({ ...formData, pictures: newPictures });
  };

  const handlePost = async () => {
    const user = auth().currentUser;
    if (!user) {
      alert("You must be logged in to post.");
      return;
    }

    const postData = {
      ...formData,
      posterId: user.uid,
      createdAt: firestore.FieldValue.serverTimestamp(),
      modifiedAt: firestore.FieldValue.serverTimestamp(),
    };

    try {
      await firestore().collection("houses").add(postData);
      alert("Post created successfully!");
      setFormData({
        type: "Apartment",
        rooms: "",
        floor: "",
        kitchen: "",
        toilets: "",
        toiletsOutside: false,
        location: "Antananarivo",
        rentPrice: "",
        description: "",
        pictures: [],
      });
    } catch (error) {
      console.error("Error posting:", error);
      alert("Failed to create post.");
    }
  };

  useEffect(() => {
    if (visible) {
      setActiveTab(actionType === "details" ? "Details" : "Pictures");
    }
  }, [actionType]);

  useEffect(() => {
    setTimeout(() => {
      setHidden(!visible);
    }, 150);
  }, [visible]);

  useEffect(() => {
    bottomSheetRef.current?.expand();
  }, []);

  return (
    <Modal visible={visible} onRequestClose={onRequestClose} transparent>
      <BlurView
        style={{
          ...StyleSheet.absoluteFillObject,
        }}
        blurType={theme}
        blurAmount={10}
        reducedTransparencyFallbackColor={theme === "light" ? "white" : "dark"}
      >
        <Pressable
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
          onPress={onRequestClose}
        />
      </BlurView>
      <StatusBar
        backgroundColor={theme === "light" ? "white" : "black"}
        translucent
      />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        {!hidden && (
          <Animated.View style={styles.container} entering={SlideInDown}>
            <Pressable
              hitSlop={8}
              style={{ marginTop: 12.5, marginHorizontal: 25 }}
              onPress={onRequestClose}
            >
              <AntDesign
                name="close"
                size={30}
                color={COLORS[theme].textColor}
              />
            </Pressable>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === "Details" && styles.activeTab,
                ]}
                onPress={() => setActiveTab("Details")}
              >
                <Text style={styles.tabText}>Details</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === "Pictures" && styles.activeTab,
                ]}
                onPress={() => setActiveTab("Pictures")}
              >
                <Text style={styles.tabText}>Pictures</Text>
              </TouchableOpacity>
            </View>
            {activeTab === "Details" ? (
              <ScrollView
                style={styles.formContainer}
                contentContainerStyle={{ paddingBottom: 10 }}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.switchContainer}>
                  <MaterialIcons
                    name="apartment"
                    size={25}
                    color={COLORS[theme].imageTintColor}
                  />
                  <Text style={{ color: COLORS[theme].textColor }}>Type :</Text>
                  <Picker
                    selectedValue={formData.type}
                    onValueChange={(value) => handleInputChange("type", value)}
                    style={{
                      color: COLORS[theme].yellow,
                      width: wp(65),
                      fontWeight: "bold",
                    }}
                  >
                    <Picker.Item label="Apartment" value="Apartment" />
                    <Picker.Item
                      label="Independent House"
                      value="Independent House"
                    />
                    <Picker.Item label="Office" value="Office" />
                    <Picker.Item label="Warehouse" value="Warehouse" />
                    <Picker.Item label="Grocery" value="Grocery" />
                    <Picker.Item
                      label="Big Hall for Reception"
                      value="Big Hall for Reception"
                    />
                  </Picker>
                </View>
                <View style={styles.switchContainer}>
                  <MaterialCommunityIcons
                    name="home"
                    size={25}
                    color={COLORS[theme].imageTintColor}
                  />
                  <TextInput
                    placeholder="Number of Rooms"
                    value={formData.rooms}
                    onChangeText={(text) => handleInputChange("rooms", text)}
                    style={styles.input}
                    placeholderTextColor={COLORS[theme].violet}
                  />
                </View>
                <View style={styles.switchContainer}>
                  <MaterialIcons
                    name="apartment"
                    size={25}
                    color={COLORS[theme].imageTintColor}
                  />
                  <TextInput
                    placeholder="Number of Floors"
                    value={formData.floor}
                    onChangeText={(text) => handleInputChange("floor", text)}
                    style={styles.input}
                    placeholderTextColor={COLORS[theme].violet}
                  />
                </View>
                <View style={styles.switchContainer}>
                  <MaterialCommunityIcons
                    name="food-turkey"
                    size={25}
                    color={COLORS[theme].imageTintColor}
                  />
                  <TextInput
                    placeholder="Number of Kitchens"
                    value={formData.kitchen}
                    onChangeText={(text) => handleInputChange("kitchen", text)}
                    style={styles.input}
                    placeholderTextColor={COLORS[theme].violet}
                  />
                </View>
                <View style={styles.switchContainer}>
                  <FontAwesome6
                    name="bath"
                    size={25}
                    color={COLORS[theme].imageTintColor}
                  />
                  <TextInput
                    placeholder="Number of Toilets"
                    value={formData.toilets}
                    onChangeText={(text) => handleInputChange("toilets", text)}
                    style={styles.input}
                    placeholderTextColor={COLORS[theme].violet}
                  />
                </View>
                <View style={styles.switchContainer}>
                  <FontAwesome6
                    name="toilet"
                    size={25}
                    color={COLORS[theme].imageTintColor}
                  />
                  <Text
                    style={{ color: COLORS[theme].textColor, paddingLeft: 8 }}
                  >
                    Toilets Outside:
                  </Text>
                  <Switch
                    value={formData.toiletsOutside}
                    onValueChange={(value) =>
                      handleInputChange("toiletsOutside", value)
                    }
                  />
                </View>
                <View style={styles.switchContainer}>
                  <Feather
                    name="map-pin"
                    color={COLORS[theme].imageTintColor}
                    size={25}
                  />
                  <Text style={{ color: COLORS[theme].textColor }}>
                    Ville :
                  </Text>
                  <Picker
                    selectedValue={formData.location}
                    onValueChange={(value) =>
                      handleInputChange("location", value)
                    }
                    style={{
                      color: COLORS[theme].yellow,
                      width: wp(65),
                      fontWeight: "bold",
                    }}
                  >
                    <Picker.Item label="Antananarivo" value="Antananarivo" />
                    <Picker.Item label="Antsirabe" value="Antsirabe" />
                    <Picker.Item label="Mahajanga" value="Mahajanga" />
                    <Picker.Item label="Toamasina" value="Toamasina" />
                    <Picker.Item label="Fianarantsoa" value="Fianarantsoa" />
                  </Picker>
                </View>
                <View style={styles.switchContainer}>
                  <FontAwesome
                    name="dollar"
                    color={COLORS[theme].imageTintColor}
                    size={25}
                  />
                  <TextInput
                    placeholder="Rent Price"
                    value={formData.rentPrice}
                    onChangeText={(text) =>
                      handleInputChange("rentPrice", text)
                    }
                    style={[styles.input, { marginLeft: 8 }]}
                    placeholderTextColor={COLORS[theme].violet}
                  />
                </View>
                <View
                  style={[styles.switchContainer, { alignItems: "flex-start" }]}
                >
                  <FontAwesome
                    name="list-alt"
                    size={25}
                    color={COLORS[theme].imageTintColor}
                    style={{ marginTop: 10 }}
                  />
                  <TextInput
                    placeholder="Description"
                    value={formData.description}
                    onChangeText={(text) =>
                      handleInputChange("description", text)
                    }
                    style={[styles.input, { height: 150 }]}
                    multiline
                    placeholderTextColor={COLORS[theme].violet}
                  />
                </View>
              </ScrollView>
            ) : (
              <View style={styles.picturesContainer}>
                {formData.pictures.length === 0 ? (
                  <TouchableOpacity
                    style={styles.addPictureButton}
                    onPress={handleImagePicker}
                  >
                    <Text style={styles.addPictureText}>+</Text>
                  </TouchableOpacity>
                ) : (
                  <ScrollView horizontal>
                    {formData.pictures.map((uri, index) => (
                      <View key={index} style={styles.pictureWrapper}>
                        <Image source={{ uri }} style={styles.picture} />
                        <TouchableOpacity
                          style={styles.deletePictureButton}
                          onPress={() => handleDeletePicture(index)}
                        >
                          <Text style={styles.deletePictureText}>X</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </ScrollView>
                )}
                {formData.pictures.length < 5 && (
                  <>
                    <Button title="Add Picture" action={handleImagePicker} />
                    <Button title="Take Photo" action={handleTakePhoto} />
                  </>
                )}
              </View>
            )}
            <Button
              title="Publier"
              style={{ marginHorizontal: 20, marginBottom: 20 }}
            />
          </Animated.View>
        )}
      </KeyboardAwareScrollView>
    </Modal>
  );
};

const createStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      height: hp(90),
      width: wp(95),
      borderRadius: 20,
      marginTop: hp(2.5),
      marginHorizontal: wp(2.5),
      backgroundColor:
        theme === "light" ? COLORS[theme].bgColor : "rgba(0,10,20,0.75)",
    },
    tabContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      paddingVertical: 5,
    },
    tab: {
      padding: 5,
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: "blue",
    },
    tabText: {
      fontSize: 16,
      color: COLORS[theme].textColor,
    },

    formContainer: {
      padding: 15,
    },
    input: {
      borderWidth: 0.5,
      borderColor: "#ccc",
      borderRadius: 15,
      padding: 10,
      color: COLORS[theme].textColor,
      flex: 1,
      textAlignVertical: "top",
      backgroundColor: COLORS[theme].softBgColor,
    },
    switchContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
      gap: 8,
    },
    picturesContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    addPictureButton: {
      width: 100,
      height: 100,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      alignItems: "center",
      justifyContent: "center",
    },
    addPictureText: {
      fontSize: 24,
      color: COLORS[theme].textColor,
    },
    pictureWrapper: {
      margin: 5,
      position: "relative",
    },
    picture: {
      width: 100,
      height: 100,
      borderRadius: 10,
    },
    deletePictureButton: {
      position: "absolute",
      top: 0,
      right: 0,
      backgroundColor: "red",
      borderRadius: 10,
      padding: 5,
    },
    deletePictureText: {
      color: "white",
    },
  });

export default CreateApartmentBottomSheet;
