import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../../configs/firebaseConfig";
import PopularMentalHealthTipsCard from "./PopularMentalHealthTipsCard";

export default function PopularMentalHealthTips() {
  const [mentalHealthTips, setMentalHealthTips] = useState([]);
  const GetMentalHealthTips = async () => {
    setMentalHealthTips([]);
    const q = query(collection(db, "mentalHealthTips"), limit(10));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        setMentalHealthTips((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };

  useEffect(() => {
    GetMentalHealthTips();
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
          Popular Mental Health Tips
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
         data={mentalHealthTips}
         horizontal={true}
         showsHorizontalScrollIndicator={false}
         renderItem={({ item, index }) => (
            <PopularMentalHealthTipsCard key={index} tips={item} />
         )}
      />
    </View>
  );
}
