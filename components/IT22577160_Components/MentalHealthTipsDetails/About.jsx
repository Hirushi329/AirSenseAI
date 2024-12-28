import { View, Text } from "react-native";
import React from "react";
import { Colors } from "../../../constants/Colors";

export default function About({ mentalHealthTips }) {
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "#fff",
        marginTop: -20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
        }}
      >
        Content
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          lineHeight: 25,
          backgroundColor: Colors.GRAY,
          padding: 10,
          borderRadius: 10,
          marginTop: 10,
          fontFamily: "outfit-medium",
        }}
      >
        {mentalHealthTips?.content}
      </Text>
    </View>
  );
}
