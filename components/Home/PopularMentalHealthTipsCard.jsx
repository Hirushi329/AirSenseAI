import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function PopularMentalHealthTipsCard({ tips }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.push("/IT22577160/mentalHealthTipsDetails/" + tips.id);
      }}
      style={{
        marginLeft: 20,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 15,
      }}
    >
      <Image
        source={{ uri: tips?.imageUrl }}
        style={{
          width: 200,
          height: 130,
          borderRadius: 15,
        }}
      />
      <View
        style={{
          marginTop: 7,
          gap: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: 200,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "outfit-bold",
          }}
        >
          {tips?.title}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            backgroundColor: Colors.PRIMARY,
            color: "#fff",
            padding: 3,
            fontSize: 12,
            borderRadius: 5,
          }}
        >
          {tips.category}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
