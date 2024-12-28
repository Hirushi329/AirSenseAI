import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Entypo, Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function ChatRoomHeader({ user, router }) {
  return (
    <View
      style={{
        marginTop: hp(3),
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
        <TouchableOpacity onPress={() => router.push("Chats")}>
          <Entypo name="chevron-left" size={hp(4)} color="#737373" />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Image
            source={{ uri: user?.profileUrl }}
            style={{
              height: hp(4.5),
              aspectRatio: 1,
              borderRadius: 100,
            }}
          />
          <Text
            style={{
              fontSize: hp(2.5),
              fontWeight: "medium",
              color: "#262626",
              fontFamily: "outfit-medium",
            }}
          >
            {user?.username}
          </Text>
        </View>
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      }}>
        <Ionicons name="call" size={hp(2.8)} color={"#737373"} />
        <Ionicons name="videocam" size={hp(2.8)} color={"#737373"} />
      </View>
    </View>
  );
}
