import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { useAuth } from "../../context/AuthContextProvider";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  const { user } = useAuth();
  return (
    <View
      style={{
        padding: 20,
        paddingTop: 50,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image
          source={{ uri: user?.profileUrl }}
          style={{
            width: 45,
            height: 45,
            borderRadius: 99,
          }}
        />
        <View>
          <Text
            style={{
              color: "#fff",
            }}
          >
            Welcome,
          </Text>
          <Text
            style={{
              fontSize: 19,
              fontFamily: "outfit-medium",
              color: "#fff",
            }}
          >
            {user?.username}
          </Text>
        </View>
      </View>
      {/* Search bar */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          backgroundColor: "#fff",
          padding: 10,
          marginVertical: 10,
          marginTop: 15,
          borderRadius: 10,
        }}
      >
        <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput
          placeholder="Search..."
          style={{
            fontFamily: "outfit",
            fontSize: 16,
          }}
        />
      </View>
    </View>
  );
}
