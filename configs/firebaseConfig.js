// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getReactNativePersistence, initializeAuth, getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW0N36-SYgkgTvG1dOF7fJsOMw1Q3Cxwk",
  authDomain: "clinic-mate-e6cc7.firebaseapp.com",
  projectId: "clinic-mate-e6cc7",
  storageBucket: "clinic-mate-e6cc7.appspot.com",
  messagingSenderId: "13016211990",
  appId: "1:13016211990:web:11ddff36567105f919cb37",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth with persistence check
export const auth = getAuth(app) || initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);
export const userRef = collection(db, "users");
export const roomRef = collection(db, "rooms");