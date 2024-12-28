import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function TrendingPhysioExercisesCard({ exercises }) {
    const router = useRouter();
    return (
      <TouchableOpacity
        onPress={() => {
          router.push("/IT22607232/physioExerciseInfo/" + exercises.id);
        }}
        style={{
          marginLeft: 20,
          padding: 10,
          backgroundColor: "#fff",
          borderRadius: 15,
        }}
      >
        <Image
          source={{ uri: exercises?.imageUrl }}
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
            width: 200,
          }}
        >
          {/* Title on the first line */}
          <Text
            style={{
              fontSize: 16,
              fontFamily: "outfit-bold",
            }}
          >
            {exercises?.title}
          </Text>
          {/* Category on the second line */}
          <Text
            style={{
              fontFamily: "outfit",
              backgroundColor: Colors.PRIMARY,
              color: "#fff",
              padding: 3,
              fontSize: 12,
              borderRadius: 5,
              alignSelf: 'flex-start', // Aligns the category tag to the left
            }}
          >
            {exercises?.category}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }