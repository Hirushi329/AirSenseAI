import { View, Text, Image } from "react-native";
import React from "react";
import { useAuth } from "../../context/AuthContextProvider";
import { Colors } from "../../constants/Colors";

export default function UserIntro() {
  const { user } = useAuth();
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
        marginTop: -80,
      }}
    >
      <Image
        source={{ uri: user?.profileUrl }}
        style={{
          width: 155,
          height: 155,
          borderRadius: 99,
          borderWidth: 5,
          borderColor: "#ccccff",
        }}
      />
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
          marginTop: 10,
          color: Colors.PRIMARY,
        }}
      >
        {user?.username}
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 15,
            color: Colors.PRIMARY,
        }}
      >
        {user?.email}
      </Text>
    </View>
  );
}
