import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContextProvider";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { formatDate, getRoomId } from "../../utils/common";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../configs/firebaseConfig";

export default function ChatItem({ item, router, noBorder, currentUser }) {
  const { user } = useAuth();
  const [lastMessage, setLastMessage] = useState(undefined);

  const openChatRoom = () => {
    router.push({pathname: '/ChatRoom', params: item})
 }

 useEffect(() => {
  let roomId = getRoomId(currentUser?.userId, item?.userId);
  const docRef = doc(db, "rooms", roomId);
  const messageRef = collection(docRef, "messages");
  const q = query(messageRef, orderBy("createdAt", "desc"));

  let unSub = onSnapshot(q, (snapshot) => {
    let allMessages = snapshot.docs.map((doc) => {
      return doc.data();
    });
    setLastMessage(allMessages[0] ? allMessages[0] : null);
  });
  return unSub;
}, []);

const renderTime = () => {
  if (lastMessage) {
     let date = lastMessage?.createdAt;
     return formatDate(new Date(date?.seconds * 1000));
  }
}

const renderLastMessage = () => {
  if(typeof lastMessage === 'undefined') return 'Loading...';
  if (lastMessage) {
     if (currentUser?.userId == lastMessage?.userId) {
        return "You: " + lastMessage?.text;
     } else {
        return 'Say Hi 👋'
     }
  }
}

  return (
    <TouchableOpacity
      onPress={openChatRoom}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: wp(5),
        gap: 3,
        marginBottom: hp(2),
        paddingBottom: hp(1),
        ...(noBorder
          ? {}
          : { borderBottomWidth: 1, borderBottomColor: "#e5e5e5" }),
      }}
    >
      <Image
        source={{ uri: item?.profileUrl }}
        style={{
          height: hp(6),
          width: hp(6),
          borderRadius: 100,
        }}
      />
      {/* name and last message */}
      <View
        style={{
          flex: 1,
          gap: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: hp(1.8),
              fontWeight: "semibold",
              color: "#262626",
              fontFamily: "outfit-medium",
            }}
          >
            {item?.username}
          </Text>
          <Text
            style={{
              fontSize: hp(1.6),
              fontWeight: "medium",
              color: "#737373",
              fontFamily: "outfit",
            }}
          >
            {renderTime()}
          </Text>
        </View>
        <Text
          style={{
            fontSize: hp(1.6),
            fontWeight: "medium",
            color: "#737373",
            fontFamily: "outfit",
          }}
        >
          {renderLastMessage()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
