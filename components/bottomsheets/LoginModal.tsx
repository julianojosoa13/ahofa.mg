import React, { forwardRef, useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import COLORS from "@/utils/colors";
import { hp, wp } from "@/utils/screensize";
import { AntDesign } from "@expo/vector-icons";

interface Props {}

const LoginModal = forwardRef<BottomSheetModal, Props>((_, ref) => {
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheetModal
      ref={ref}
      onChange={handleSheetChanges}
      snapPoints={["33%", "75%"]}
      backdropComponent={({ style }) => (
        <View style={[style, styles.backdrop]} />
      )}
      backgroundStyle={{ backgroundColor: "rgba(255,255,255,0)" }}
      handleComponent={null}
      enablePanDownToClose={false}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            hitSlop={8}
            style={{ position: "absolute", top: hp(2), left: wp(4) }}
          >
            <AntDesign name="close" size={25} />
          </TouchableOpacity>

          <View
            style={{
              height: 4,
              width: 30,
              backgroundColor: "grey",
              borderRadius: 2,
              alignSelf: "center",
              marginVertical: 10,
            }}
          ></View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    width: wp(95),
    height: hp(72.5),
    marginLeft: wp(2.5),
    backgroundColor: "rgba(255,255,255,1)",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: { color: COLORS.secondaryColor },
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.33)",
  },
  header: {
    height: hp(10),
    paddingHorizontal: wp(4),
  },
});

export default LoginModal;
