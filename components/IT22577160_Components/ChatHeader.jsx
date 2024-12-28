import { View, Text, Platform, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import { useAuth } from "../../context/AuthContextProvider";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { AntDesign, Feather } from "@expo/vector-icons";
import MenuItem from "./MenuItem";
import { useRouter } from "expo-router";

const android = Platform.OS == "android";

export default function ChatHeader() {
  const { user, logout } = useAuth();
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  const handleProfile = () => {
    router.push("Profile");
  };
  const handleLogOut = async () => {
    await logout();
  };
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
          Chats
        </Text>
      </View>
      <View>
        <Menu>
          <MenuTrigger
            customStyles={{
              triggerWrapper: {},
            }}
          >
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
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                borderCurve: "continuous",
                borderRadius: 10,
                marginTop: 40,
                marginLeft: -30,
                backgroundColor: "#fff",
                shadowOpacity: 0.2,
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                width: 160,
              },
            }}
          >
            <MenuItem
              text="Profile"
              action={handleProfile}
              value={null}
              icon={<Feather name="user" size={hp(2.5)} color="#737373" />}
            />
            <Divider />
            <MenuItem
              text="Sign Out"
              action={handleLogOut}
              value={null}
              icon={<AntDesign name="logout" size={hp(2.5)} color="#737373" />}
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
}

const Divider = () => {
  return (
    <View
      style={{
        width: "100%",
        padding: 1,
        backgroundColor: "#e5e5e5",
      }}
    />
  );
};
