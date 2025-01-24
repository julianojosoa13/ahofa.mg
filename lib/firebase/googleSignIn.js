import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export const onGoogleButtonPress = async () => {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  console.log("User's phone has playServices");

  // Get the users ID token
  const signInResult = await GoogleSignin.signIn();
  console.log("SignIn Results >> ", signInResult);

  // Try the new style of google-sign in result, from v13+ of that module
  idToken = signInResult.data?.idToken;
  console.log("idToken >> ", idToken);
  if (!idToken) {
    // if you are using older versions of google-signin, try old style result
    idToken = signInResult.idToken;
  }
  if (!idToken) {
    throw new Error("No ID token found");
  }

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(
    signInResult.data.idToken
  );

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
};
