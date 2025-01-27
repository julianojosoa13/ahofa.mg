import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const createOrUpdateUser = async (user: FirebaseAuthTypes.User) => {
  try {
    const userRef = firestore().collection("users").doc(user.uid);
    const userDoc = await userRef.get();

    const userData = {
      name: user.displayName || "Unknown User",
      email: user.email || "",
      phone: user.phoneNumber || "",
      profileType: "normal", // Default to "normal" profile type
      subscription: {
        tier: "free", // Default subscription tier
        startDate: firestore.FieldValue.serverTimestamp(),
        endDate: null,
      },
      savedPosts: [],
      createdPosts: [],
      photoUrl: user.photoURL,
    };

    if (userDoc.exists) {
      // Update user data if it exists
      await userRef.update({
        ...userData,
        subscription: {
          ...userDoc.data()?.subscription,
          ...userData.subscription, // Update only missing fields in subscription
        },
      });
    } else {
      // Create a new user document if it doesn't exist
      await userRef.set(userData);
    }

    console.log("User data synchronized successfully!");
  } catch (error) {
    console.error("Error creating or updating user:", error);
  }
};
