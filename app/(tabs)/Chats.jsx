import { View, Text, StatusBar, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import ChatHeader from "../../components/IT22577160_Components/ChatHeader";
import { useAuth } from "../../context/AuthContextProvider";
import ChatList from "../../components/IT22577160_Components/ChatList";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { getDocs, query, where } from "firebase/firestore";
import { userRef } from "../../configs/firebaseConfig";

export default function Chats() {
  const { logout, user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user?.userId) {
      getUsers();
    }
  }, [user?.userId]);

  const getUsers = async () => {
    try {
      const q = query(userRef, where('userId', '!=', user?.userId));
      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach(doc => {
        data.push({...doc.data()});
      });
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };

  return (
    <View
      style={{
        backgroundColor: "#f5f5f5",
        flex: 1,
      }}
    >
      <ChatHeader />
      <StatusBar style="light" />
      {users.length > 0 ? (
        <ChatList users={users} currentUser={user} />
      ) : (
        <View
          style={{
            display: "flex",
            alignItems: "center",
            top: hp(30),
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
}
