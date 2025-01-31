// import {
//   selectAppShowCategorySelectModal,
//   selectAppTheme,
//   setShowCategorySelectModal,
// } from "@/store/slices/appSlice";
// import { hp, wp } from "@/utils/screensize";
// import { BlurView } from "@react-native-community/blur";
// import React, { FC, useEffect } from "react";
// import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import GoogleSignInButton from "../ui/GoogleSignInButton";
// import { useTranslation } from "react-i18next";
// import { AntDesign } from "@expo/vector-icons";

// import COLORS from "@/utils/colors";
// import Animated, { ZoomInDown } from "react-native-reanimated";

// interface Props {}

// const YesNoDialog: FC<Props> = (props) => {
//   const showModal = useSelector(selectAppShowCategorySelectModal);
//   const { t } = useTranslation();
//   const dispatch = useDispatch();

//   const closeModal = () => {
//     dispatch(setShowCategorySelectModal(false));
//   };

//   const theme = useSelector(selectAppTheme);
//   const styles = createStyles(theme);

//   useEffect(() => {
//     return () => {
//       dispatch(setShowCategorySelectModal(false));
//     };
//   }, []);

//   return (
//     <Modal transparent visible={showModal} style={styles.container}>
//       <BlurView
//         blurAmount={10}
//         blurType={theme}
//         reducedTransparencyFallbackColor={theme == "light" ? "white" : "black"}
//         style={styles.container}
//       >
//         <Animated.View
//           style={styles.contentContainer}
//           entering={ZoomInDown.duration(300).delay(50)}
//         >
//           <TouchableOpacity
//             hitSlop={8}
//             style={{
//               position: "absolute",
//               top: hp(2),
//               right: wp(4),
//               zIndex: 10,
//             }}
//             onPress={closeModal}
//           >
//             <AntDesign name="close" size={25} color={COLORS[theme].textColor} />
//           </TouchableOpacity>
//         </Animated.View>
//       </BlurView>
//     </Modal>
//   );
// };

// const createStyles = (theme: "light" | "dark") =>
//   StyleSheet.create({
//     container: {
//       flex: 1,
//       width: wp(100),
//       height: hp(100),
//       justifyContent: "center",
//       alignItems: "center",
//     },
//     contentContainer: {
//       padding: 10,
//       borderRadius: wp(5),
//       backgroundColor: COLORS[theme].bgColor,
//       height: hp(70),
//       width: wp(85),
//       elevation: 4,
//       paddingBottom: 24,
//     },
//     title: {
//       textAlign: "center",
//       fontWeight: "bold",
//       fontSize: hp(2.2),
//       color: COLORS[theme].thirdColor,
//       fontFamily: "Oswald_700Bold",
//     },
//   });

// export default YesNoDialog;
