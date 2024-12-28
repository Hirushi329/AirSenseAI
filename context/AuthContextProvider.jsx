import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../configs/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "expo-router";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    // onAuthStateChanged
    const unsub = onAuthStateChanged(auth, (user) => {
      // console.log("get user : ", user);
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user.uid);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

  const updateUserData = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let data = docSnap.data();
      setUser({
        ...user,
        username: data.username,
        email: data.email,
        profileUrl: data.profileUrl,
        userId: data.userId,
      });
    }
  };

  const login = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      router.replace('/Home');
      return { success: true };
    } catch (e) {
      let msg = e.message;
      if (msg.includes("(auth/invalid-email)")) msg = "Invalid email";
      if (msg.includes("(auth/invalid-credential)"))
        msg = "Invalid credentials";
      if (msg.includes("(auth/weak-password)"))
        msg = "Password should be at least 6 characters";
      return { success: false, msg };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      router.replace('/GetStarted');
      return { success: true };
    } catch (e) {
      return { success: false, msg: e.message, error: e };
    }
  };

  const register = async (email, password, username, profileUrl) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log("response.user", res?.user);
      await setDoc(doc(db, "users", res?.user?.uid), {
        username: username,
        email: email,
        profileUrl: profileUrl,
        userId: res?.user?.uid,
      });
      router.replace('/SignIn');
      return { success: true, data: res?.user };
    } catch (e) {
      let msg = e.message;
      if (msg.includes("(auth/invalid-email)")) msg = "Invalid email";
      if (msg.includes("(auth/email-already-in-use)"))
        msg = "This email is already in use";
      if (msg.includes("(auth/weak-password)"))
        msg = "Password should be at least 6 characters";
      return { success: false, msg };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }
  return value;
};
