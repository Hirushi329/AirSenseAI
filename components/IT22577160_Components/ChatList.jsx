import { View, Text, FlatList } from "react-native";
import React from "react";
import ChatItem from "./ChatItem";
import { useRouter } from "expo-router";

export default function ChatList({ users, currentUser }) {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f5f5f5",
      }}
    >
      <FlatList
        data={users}
        contentContainerStyle={{
          flex: 1,
          paddingVertical: 25,
        }}
        keyExtractor={(item) => Math.random()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ChatItem
            noBorder={index + 1 == users.length}
            currentUser={currentUser}
            router={router}
            item={item}
            index={index}
          />
        )}
      />
    </View>
  );
}
