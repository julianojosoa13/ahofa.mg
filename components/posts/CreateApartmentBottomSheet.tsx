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
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { Switch } from "react-native";
import { Button } from "react-native-elements";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

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

const CreateApartmentBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [activeTab, setActiveTab] = useState<"Details" | "Pictures">("Details");
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
    bottomSheetRef.current?.expand();
  }, []);

  return (
    <Modal visible={true}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Details" && styles.activeTab]}
          onPress={() => setActiveTab("Details")}
        >
          <Text style={styles.tabText}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Pictures" && styles.activeTab]}
          onPress={() => setActiveTab("Pictures")}
        >
          <Text style={styles.tabText}>Pictures</Text>
        </TouchableOpacity>
      </View>

      {activeTab === "Details" ? (
        <ScrollView style={styles.formContainer}>
          <Picker
            selectedValue={formData.type}
            onValueChange={(value) => handleInputChange("type", value)}
          >
            <Picker.Item label="Apartment" value="Apartment" />
            <Picker.Item label="Independent House" value="Independent House" />
            <Picker.Item label="Office" value="Office" />
            <Picker.Item label="Warehouse" value="Warehouse" />
            <Picker.Item label="Grocery" value="Grocery" />
            <Picker.Item
              label="Big Hall for Reception"
              value="Big Hall for Reception"
            />
          </Picker>

          <TextInput
            placeholder="Number of Rooms"
            value={formData.rooms}
            onChangeText={(text) => handleInputChange("rooms", text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Number of Floors"
            value={formData.floor}
            onChangeText={(text) => handleInputChange("floor", text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Number of Kitchens"
            value={formData.kitchen}
            onChangeText={(text) => handleInputChange("kitchen", text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Number of Toilets"
            value={formData.toilets}
            onChangeText={(text) => handleInputChange("toilets", text)}
            style={styles.input}
          />
          <View style={styles.switchContainer}>
            <Text>Toilets Outside:</Text>
            <Switch
              value={formData.toiletsOutside}
              onValueChange={(value) =>
                handleInputChange("toiletsOutside", value)
              }
            />
          </View>
          <Picker
            selectedValue={formData.location}
            onValueChange={(value) => handleInputChange("location", value)}
          >
            <Picker.Item label="Antananarivo" value="Antananarivo" />
            <Picker.Item label="Antsirabe" value="Antsirabe" />
            <Picker.Item label="Mahajanga" value="Mahajanga" />
            <Picker.Item label="Toamasina" value="Toamasina" />
            <Picker.Item label="Fianarantsoa" value="Fianarantsoa" />
          </Picker>
          <TextInput
            placeholder="Rent Price"
            value={formData.rentPrice}
            onChangeText={(text) => handleInputChange("rentPrice", text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Description"
            value={formData.description}
            onChangeText={(text) => handleInputChange("description", text)}
            style={styles.input}
            multiline
          />
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
              <Button title="Add Picture" onPress={handleImagePicker} />
              <Button title="Take Photo" onPress={handleTakePhoto} />
            </>
          )}
        </View>
      )}

      <Button title="Post" onPress={handlePost} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  tab: {
    padding: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "blue",
  },
  tabText: {
    fontSize: 16,
  },
  formContainer: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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
