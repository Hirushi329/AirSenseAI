import { View, Text } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function MessageItem({ message, currentUser }) {
  if (currentUser?.userId == message?.userId) {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: hp("2%"),
          marginRight: wp("2%"),
        }}
      >
        <View
          style={{
            width: wp(80),
          }}
        >
          <View
            style={{
              display: "flex",
              alignSelf: "flex-end",
              padding: 10,
              backgroundColor: "#fff",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#e5e5e5",
            }}
          >
            <Text style={{ fontSize: hp(1.9) }}>{message?.text}</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          marginBottom: hp("2%"),
          marginLeft: wp("2%"),
        }}
      >
        <View
          style={{
            width: wp(80),
          }}
        >
          <View
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: 10,
              backgroundColor: "#e0e7ff",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#c7d2fe",
            }}
          >
            <Text style={{ fontSize: hp(1.9) }}>{message?.text}</Text>
          </View>
        </View>
      </View>
    );
  }
}
