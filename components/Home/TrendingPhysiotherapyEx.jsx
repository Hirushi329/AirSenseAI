import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../../configs/firebaseConfig";
import TrendingPhysioExercisesCard from "./TrendingPhysioExercisesCard";

export default function TrendingPhysiotherapyEx() {
  const [PhysioExercises, setPhysioExercises] = useState([]);
  const GetPhysioExercises = async () => {
    setPhysioExercises([]);
    const q = query(collection(db, "physioExercises"), limit(10));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        setPhysioExercises((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };

  useEffect(() => {
    GetPhysioExercises();
  }, []);

  return (
    <View>
      <View
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit-bold",
          }}
        >
          Trending Physio Exercises
        </Text>
        <Text
          style={{
            color: Colors.PRIMARY,
            fontFamily: "outfit-medium",
          }}
        >
          View All
        </Text>
      </View>
      <FlatList 
         data={PhysioExercises}
         horizontal={true}
         showsHorizontalScrollIndicator={false}
         renderItem={({ item, index }) => (
            <TrendingPhysioExercisesCard
             key={index} exercises={item} />
         )}
      />
      </View>
  );
}
