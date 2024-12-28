import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function GetStarted() {
  const router = useRouter();
  return (
    <ScrollView
    style={{
      flex: 1,
      backgroundColor: "#2d3144",
    }}
    contentContainerStyle={{
      alignItems: "center",
    }}
  
    >
      <Image
        source={require("./../assets/images/AirSenseLogo.png")}
        style={{
          width: 420,
          height: 420,
          alignSelf: "center",
        }}
      />
      <View
        style={{
          backgroundColor: "#bee5ec",
          padding: 20,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          marginHorizontal: 7,
          marginTop: 100,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontFamily: "outfit-bold",
            textAlign: "center",
            color: "#2d3144",
          }}
        >
          Your AI Powered Companion for Urban Air Saftey
          </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#2d3144",
            padding: 16,
            borderRadius: 10,
            alignItems: "center",
            marginTop: 20,
            cursor: "pointer",
          }}
          onPress={() => router.push("ChatRoom")}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#FFFFFF",
              fontFamily: "outfit",
            }}
          >
            Let's Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
