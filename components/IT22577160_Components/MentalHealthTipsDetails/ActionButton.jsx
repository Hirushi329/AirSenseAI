import { View, Text, FlatList, TouchableOpacity, Image, Linking, Share } from "react-native";
import React from "react";

export default function ActionButton({ mentalHealthTips }) {
  const actionButtonMenu = [
    {
      id: 1,
      title: "Call",
      icon: require("./../../../assets/images/call.png"),
      url: "tel:" + "071-2345678",
    },
    {
      id: 2,
      title: "Location",
      icon: require("./../../../assets/images/pin.png"),
      url:
        "https://www.google.com/maps/search/?api=1&query" +
        "Colombo, Sri Lanka",
    },
    {
      id: 3,
      title: "Web",
      icon: require("./../../../assets/images/web.png"),
      url: "https://www.clinicmate.com",
    },
    {
      id: 4,
      title: "Share",
      icon: require("./../../../assets/images/share.png"),
      url: "https://www.clinicmate.com",
    },
  ];

  const onPressHandler = (item) => {
    if(item.title === 'Share') {
       Share.share({
          message: 'Check out this link',
       })
       return ;
    }
    Linking.openURL(item.url)
 }

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "#fff",
        marginTop: -20,
      }}
    >
      <FlatList
        data={actionButtonMenu}
        numColumns={4}
         columnWrapperStyle={{
            justifyContent: 'space-between',
         }}
        renderItem={({ item, index }) => (
          <TouchableOpacity key={index} onPress={() => onPressHandler(item)


          }>
            <Image
              source={item?.icon}
              style={{
                width: 50,
                height: 50,
              }}
            />
            <Text
              style={{
                fontFamily: "outfit-medium",
                textAlign: "center",
                marginTop: 3,
              }}
            >
              {item?.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
