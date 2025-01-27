import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import * as _ from "lodash";

export const createOrUpdateUser = async (user: FirebaseAuthTypes.User) => {
  if (!user) return;

  const userRef = firestore().collection("users").doc(user.uid);
  const doc = await userRef.get();

  const newUserData = {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    phoneNumber: user.phoneNumber,
    providerId: user.providerData[0]?.providerId,
    lastSignInTime: user.metadata.lastSignInTime,
  };

  if (!doc.exists) {
    // If the user doesn't exist, create the document
    await userRef.set(newUserData, { merge: true });
  } else {
    const existingData = doc.data();

    // Compare existing data with new data
    if (!_.isEqual(existingData, newUserData)) {
      // Only update if the data is different
      await userRef.set(newUserData, { merge: true });
    }
  }
};

export const syncUserProfile = async () => {
  const user = auth().currentUser;
  if (user) {
    try {
      await createOrUpdateUser(user);
      console.log("User profile synced successfully");
    } catch (error) {
      console.error("Error syncing user profile:", error);
    }
  }
};
