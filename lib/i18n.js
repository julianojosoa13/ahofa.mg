import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome",
        login: "Login",
        welcome_to: "Welcome to  ",
        language: "Language",
        french: "French ",
        english: "English",
        malagasy: "Malagasy",
        houses: "Houses",
        vehicles: "Vehicles",
        terrains: "Terrain",
        sound: "Sound",
        electronic: "Electronic",
        continue: "Continue",
        "what are you thinking": "What are you looking for?",
      },
    },
    fr: {
      translation: {
        welcome: "Bienvenue",
        login: "Connexion",
        welcome_to: "Bienvenue sur  ",
        language: "Langue",
        french: "Français",
        english: "Anglais",
        malagasy: "Malgache",
        houses: "Maisons",
        vehicles: "Vehicules",
        terrains: "Terrains",
        sound: "Sonorisations",
        electronic: "Electronique",
        continue: "Continuer",
        "what are you thinking": "Que cherchez-vous?",
      },
    },
    mg: {
      translation: {
        welcome: "Manao ahoana",
        login: "Midira",
        welcome_to: "Tongasoa ato amin'ny  ",
        language: "Fiteny",
        french: "Frantsay",
        english: "Anglisy",
        malagasy: "Malagasy",
        houses: "Trano",
        vehicles: "Fiara",
        terrains: "Tany",
        sound: "Zava-maneno",
        electronic: "Elektronika",
        continue: "Hanoy hiditra",
        "what are you thinking": "Inona no tadiavinao?",
      },
    },
  },
  lng: "fr", // default language
  fallbackLng: "fr",
  interpolation: {
    escapeValue: false, // React already safes from xss
  },
});

export default i18n;
