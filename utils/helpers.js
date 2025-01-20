import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkPersistedLanguage = async () => {
  try {
    const persistedState = await AsyncStorage.getItem("root");
    console.log("persisted state >>> ", persistedState);
    if (persistedState !== null) {
      const state = JSON.parse(persistedState);
      console.log("Persisted State:", state); // Check the persisted state
      console.log("Persisted Language:", state.translations.language); // Log the persisted language
    } else {
      console.log("No persisted state found.");
    }
  } catch (error) {
    console.log("Error reading persisted state:", error);
  }
};

export const clearPersistedState = async () => {
  try {
    await AsyncStorage.removeItem("root");
    console.log("Persisted state cleared");
  } catch (error) {
    console.error("Error clearing persisted state:", error);
  }
};
