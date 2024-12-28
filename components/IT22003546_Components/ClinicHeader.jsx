import { View, Text, Platform, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import { useAuth } from "../../context/AuthContextProvider";
import { useRouter } from "expo-router";

const android = Platform.OS === "android";

export default function ClinicHeader() {
  const { user } = useAuth();
  const { top } = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View
      style={{
        paddingTop: android ? top + 20 : top,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: wp(5),
        backgroundColor: Colors.PRIMARY,
        paddingBottom: hp(2.5),
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}
    >
      <View>
        <Text
          style={{
            color: "#fff",
            fontSize: 24,
            fontWeight: "medium",
            fontFamily: "outfit-medium",
          }}
        >
          Clinics
        </Text>
      </View>
      <View>
        <Image
          source={{ uri: user?.profileUrl }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 99,
            borderWidth: 2,
            borderColor: "#fff",
          }}
        />
      </View>
    </View>
  );
}
