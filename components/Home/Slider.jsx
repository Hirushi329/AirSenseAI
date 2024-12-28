import { View, Text, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../configs/firebaseConfig";

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);

  const GetSliderList = async () => {
    setSliderList([]);
    const q = query(collection(db, "Slider"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setSliderList((prev) => [...prev, doc.data()]);
    });
  };

  useEffect(() => {
    GetSliderList();
  }, []);

  return (
    <View>
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 20,
          paddingLeft: 20,
          paddingTop: 20,
          marginBottom: 5,
        }}
      >
        #Special for you
      </Text>
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          paddingLeft: 20,
        }}
        renderItem={({ index, item }) => (
          <Image
            source={{ uri: item.imageUrl }}
            style={{
              width: 300,
              height: 160,
              borderRadius: 15,
              marginRight: 15,
            }}
          />
        )}
      />
    </View>
  );
}
