import {
  selectAppSelectedCategory,
  setShowCategorySelectModal,
} from "@/store/slices/appSlice";
import React, { FC } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import Electronics from "./Eletronics";
import Houses from "./Houses";
import NoCategory from "./NoCategory";
import Sound from "./Sound";
import Terrain from "./Terrrain";
import Vehicle from "./Vehicle";
import { useAppDispatch } from "@/store/store";

interface Props {}

const CategoryChanger: FC<Props> = (props) => {
  const selectedCategory = useSelector(selectAppSelectedCategory);
  const dispatch = useAppDispatch();

  const handleShowSelectModal = () => {
    dispatch(setShowCategorySelectModal(true));
  };

  const switchCategory = () => {
    switch (selectedCategory) {
      case "electronic":
        return <Electronics disabled />;
      case "houses":
        return <Houses disabled />;
      case "none":
        return <NoCategory disabled />;
      case "sounds":
        return <Sound disabled />;
      case "terrain":
        return <Terrain disabled />;
      case "vehicles":
        return <Vehicle disabled />;
      default:
        return <NoCategory disabled />;
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handleShowSelectModal}>
      {switchCategory()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CategoryChanger;
