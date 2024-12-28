import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { router } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { useAuth } from "../../../context/AuthContextProvider";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../configs/firebaseConfig";
import { Colors } from "../../../constants/Colors";
import MentalHealthTipsCard from "../../../components/IT22577160_Components/MentalHealthTipsCard";

export default function My_MentalHealth() {
  const { user } = useAuth();
  const [mentalHealthTipList, setMentalHealthTipList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user && GetMentalHealthTips();
  }, [user]);

  /**
   * Used get mental health tips by user email
   */
  const GetMentalHealthTips = async () => {
    setLoading(true);
    setMentalHealthTipList([]);
    const q = query(
      collection(db, "mentalHealthTips"),
      where("userEmail", "==", user?.email)
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      setMentalHealthTipList((prev) => [
        ...prev,
        { id: doc.id, ...doc.data() },
      ]);
    });
    setLoading(false);
  };

  return (
    <>
      <View
        style={{
          marginTop: hp(4),
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: wp(5),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <TouchableOpacity onPress={() => router.push("Profile")}>
            <Entypo name="chevron-left" size={hp(4)} color="#737373" />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Text
              style={{
                fontSize: hp(2),
                fontWeight: "medium",
                color: "#262626",
                fontFamily: "outfit-medium",
              }}
            >
              My Mental Health Tips & Guides
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          height: 8,
          borderBottomWidth: 1,
          borderBottomColor: "#d4d4d4",
        }}
      />
      <Text
        style={{
          fontSize: hp(2.5),
          fontWeight: "medium",
          color: Colors.PRIMARY,
          fontFamily: "outfit-medium",
          textAlign: "center",
          marginVertical: 10,
        }}
      >
        Mental Health Tips & Guides
      </Text>
      <FlatList
        data={mentalHealthTipList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MentalHealthTipsCard item={item} />}
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 20 }}
        onRefresh={GetMentalHealthTips}
        refreshing={loading}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: Colors.GRAY }}>
            No mental health tips available.
          </Text>
        }
      />
    </>
  );
}
