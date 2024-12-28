import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

export default function Loading({ size }) {
  return (
    <View style={{ height: size, aspectRatio: 1 }}>
      <LottieView
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        source={require("../assets/images/loading.json")}
        autoPlay
        loop
      />
    </View>
  );
}
