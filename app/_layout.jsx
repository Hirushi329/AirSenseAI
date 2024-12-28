import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { Slot, useRouter, useSegments } from "expo-router";
import AuthContextProvider, { useAuth } from "../context/AuthContextProvider";
import { MenuProvider } from "react-native-popup-menu";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // check if user is authenticated or not
    if (typeof isAuthenticated === "undefined") {
      return;
    }
    const inApp = segments[0] == "(tabs)";
    if (isAuthenticated && !inApp) {
      // redirect to home
      router.replace("Home");
    } else if (isAuthenticated == false) {
      // redirect to sign in
      router.replace("GetStarted");
    }
  }, [isAuthenticated]);

  return <Slot />;
};

export default function RootLayout() {
  useFonts({
    outfit: require("./../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("./../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf"),
  });
  return (
    <MenuProvider>
      <AuthContextProvider>
        <MainLayout />
      </AuthContextProvider>
    </MenuProvider>
  );
}
