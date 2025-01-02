import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import MessageList from "../components/IT22577160_Components/MessageList";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import CustomKeyBoardView from "../components/CustomKeyBoardView";
import { useAuth } from "../context/AuthContextProvider";
import { getRoomId } from "../utils/common";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../configs/firebaseConfig";

export default function ChatRoom() {
  const item = useLocalSearchParams(); // second user
  const { user } = useAuth(); // logged in user
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const textRef = useRef("");
  const inputRef = useRef(null);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    createRoomIfNotExists();
    let roomId = getRoomId(user?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messageRef = collection(docRef, "messages");
    const q = query(messageRef, orderBy("createdAt", "asc"));

    let unSub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setMessages(allMessages);
    });
    const KeyboardDisShowListener = Keyboard.addListener(
      "keyboardDidShow",
      updateScrollView
    );
    return () => {
      unSub();
      KeyboardDisShowListener.remove();
    };
  }, []);

  const createRoomIfNotExists = async () => {
    let roomId = getRoomId(user?.userId, item?.userId);
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if (!message) return;
    try {
      let roomId = getRoomId(user?.userId, item?.userId);
      const docRef = doc(db, "rooms", roomId);
      const messageRef = collection(docRef, "messages");
      textRef.current = "";
      if (inputRef) {
        inputRef?.current?.clear();
      }
      const newDoc = await addDoc(messageRef, {
        userId: user?.userId,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      Alert.alert("Message", error.message);
    }
  };

  useEffect(() => {
    updateScrollView();
  }, [messages]);

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <CustomKeyBoardView inChat={true}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#2d3144",
        }}
      >
        <StatusBar style="dark" />

        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.push("Dashboard")}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>{"< Back"}</Text>
        </TouchableOpacity>

        {/* Added Image */}
        <Image
          source={require("./../assets/images/AirSenseLogo.png")}
          style={{
            width: 300,
            height: 300,
            alignSelf: "center",
            padding: 36,
          }}
        />

        <View
          style={{
            height: 8,
            borderBottomWidth: 1,
            borderBottomColor: "#d4d4d4",
          }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            backgroundColor: "#2d3144",
            overflow: "visible",
          }}
        >
          <View style={{ flex: 1 }}>
            <MessageList
              scrollViewRef={scrollViewRef}
              messages={messages}
              currentUser={user}
            />
          </View>
          <View
            style={{
              marginBottom: hp(1.7),
              paddingTop: hp(1.7),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 10,
                justifyContent: "space-between",
                backgroundColor: "#fff",
                padding: 5,
                borderWidth: 1,
                borderColor: "#d4d4d4",
                borderRadius: 50,
                paddingLeft: 10,
              }}
            >
              <TextInput
                ref={inputRef}
                onChangeText={(value) => (textRef.current = value)}
                placeholder="Ask AirSense AI..."
                placeholderTextColor="#2d3144"
                style={{
                  flex: 1,
                  fontSize: hp(3),
                  fontFamily: "outfit-medium",
                  marginRight: 10,
                  color: "#2d3144",
                }}
              />
              <TouchableOpacity
                onPress={handleSendMessage}
                style={{
                  backgroundColor: "#e5e5e5",
                  padding: 8,
                  marginRight: 5,
                  borderRadius: 50,
                }}
              >
                <Feather name="send" size={hp(2.7)} color="#737373" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyBoardView>
  );
}

const styles = {
  backButton: {
    position: "absolute",
    top: 40,
    left: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: "#2d3144",
  },
};
