import { View, Text } from "react-native";
import React from "react";
import { MenuOption } from "react-native-popup-menu";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function MenuItem({ text, action, value, icon }) {
  return (
    <MenuOption onSelect={() => action(value)}>
      <View
        style={{
          paddingHorizontal: wp(5),
          paddingVertical: hp(1),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: hp(1.7),
            fontWeight: "semibold",
            color: "#525252",
          }}
        >
          {text}
        </Text>
        {icon}
      </View>
    </MenuOption>
  );
}
