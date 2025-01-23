import React, { forwardRef, useCallback } from "react";
import { StyleSheet, Text } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

interface Props {}

const LoginModal = forwardRef<BottomSheetModal, Props>((_, ref) => {
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheetModal
      ref={ref}
      onChange={handleSheetChanges}
      snapPoints={["65%", "90%"]}
      enablePanDownToClose
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text>Awesome 🎉</Text>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  contentContainer: { flex: 1, alignItems: "center" },
});

export default LoginModal;
