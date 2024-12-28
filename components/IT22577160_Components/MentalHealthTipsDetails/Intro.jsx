import { View, Text, Image, TouchableOpacity, Alert, ToastAndroid } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import { useAuth } from "../../../context/AuthContextProvider";

export default function Intro({ mentalHealthTips }) {
  const { user } = useAuth();
  const router = useRouter();

  const onDelete = () => {
    Alert.alert(
      "Do you want to Delete Business?",
      "Are you sure you want to delete this business?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteBusiness(),
        },
      ]
    );
  };

  const deleteBusiness = async () => {
    console.log("Delete Business");
    await deleteDoc(doc(db, "mentalHealthTips", mentalHealthTips?.id));
    router.back();
    ToastAndroid.show("Business Deleted Successfully", ToastAndroid.LONG);
  };

  return (
    <View>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 20,
        }}
      >
        <TouchableOpacity onPress={() => router.push("Home")}>
          <Ionicons name="arrow-back-circle" size={40} color={Colors.PRIMARY} />
        </TouchableOpacity>
        <Ionicons
          name="notifications-outline"
          size={38}
          color={Colors.PRIMARY}
        />
      </View>
      <Image
        source={{ uri: mentalHealthTips?.imageUrl }}
        style={{
          width: "100%",
          height: 340,
        }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 20,
          marginTop: -20,
          backgroundColor: "#fff",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
      >
        <Text
          style={{
            fontSize: 26,
            fontFamily: "outfit-medium",
            flex: 1,
            marginRight: 10,
            flexWrap: "wrap",
            color: Colors.PRIMARY,
          }}
        >
          {mentalHealthTips?.title}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: "outfit",
            flexShrink: 1,
            backgroundColor: Colors.PRIMARY,
            color: "#fff",
            fontWeight: "bold",
            padding: 10,
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          {mentalHealthTips?.category}
        </Text>
        {
          user?.email === "messi@gmail.com" && (
          <TouchableOpacity
            style={{
              paddingLeft: 10,
            }}
            onPress={() => onDelete()}
          >
            <Ionicons name="trash" size={24} color="red" />
          </TouchableOpacity>
          )
        }
      </View>
    </View>
  );
}
