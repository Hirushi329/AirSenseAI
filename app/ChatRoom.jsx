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
import SpeechToTextConverter from "../components/SpeechToTextConverter";
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
import axios from "axios";
import * as Speech from "expo-speech";
import { Audio } from "expo-av";

export default function ChatRoom() {
  const item = useLocalSearchParams();
  const { user } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const textRef = useRef("");
  const inputRef = useRef(null);
  const scrollViewRef = useRef(null);
  const [speechText, setSpeechText] = useState(""); // Store recognized speech
  const [isListening, setIsListening] = useState(false); // Track if the mic is active
  const [permissionGranted, setPermissionGranted] = useState(false); // Track mic permission
  const apiUrl = "http://192.168.198.150:5000/"; // Replace with your API URL
  const recording = useRef(new Audio.Recording()); // Audio recording reference

  useEffect(() => {
    createRoomIfNotExists();
    let roomId = getRoomId(user?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messageRef = collection(docRef, "messages");
    const q = query(messageRef, orderBy("createdAt", "asc"));

    let unSub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => doc.data());
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
      const newMessage = { text: message, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Clear input after sending the message
      setSpeechText("");
      textRef.current = "";

      console.log(`handleSendMessage(): Sending message: ${message} to API: ${apiUrl}`);
      const response = await axios.post(apiUrl, { query: message });

      if (response.data.response) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response.data.response, sender: "ai" },
        ]);
        speakText(response.data.response);
      } else if (response.data.status) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response.data.status, sender: "ai" },
        ]);
        speakText(response.data.status);
      } else if (response.data.error) {
        Alert.alert("Error", response.data.error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: `Error: ${response.data.error}`, sender: "ai" },
        ]);
      }
    } catch (error) {
      Alert.alert("Message", error.message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `Error: ${error.message}`, sender: "ai" },
      ]);
    }
  };

  const speakText = (text) => {
    Speech.speak(text, {
      language: "en",
      pitch: 1,
      rate: 1,
    });
  };

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const startListening = async () => {
    try {
      setIsListening(true);
      await recording.current.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await recording.current.startAsync();
    } catch (error) {
      console.error("Error starting speech recognition", error);
    }
  };

  const stopListening = async () => {
    try {
      if (recording.current) {
        await recording.current.stopAndUnloadAsync();
        setIsListening(false);

        const uri = recording.current.getURI();
        try {
          const recognizedText = await SpeechToTextConverter({ uri });
          setSpeechText(recognizedText);
          textRef.current = recognizedText;
        } catch (error) {
          Alert.alert("Error", "Failed to transcribe the audio file.");
        }
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while processing the audio.");
    }
  };

  useEffect(() => {
    updateScrollView();
  }, [messages]);

  return (
    <CustomKeyBoardView inChat={true}>
      <View style={{ flex: 1, backgroundColor: "#2d3144" }}>
        <StatusBar style="dark" />

        <TouchableOpacity
          onPress={() => router.push("Dashboard")}
          style={styles.backButton}
>
          <Text style={[styles.backButtonText, { color: 'white' }]}>{"< Back"}</Text>
        </TouchableOpacity>

        <Image
          source={require("./../assets/images/AirSenseLogo.png")}
          style={{ width: 300, height: 300, alignSelf: "center", padding: 36 }}
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
          <View style={{ marginBottom: hp(1.7), paddingTop: hp(1.7) }}>
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
                value={speechText}
                onChangeText={(value) => {
                  setSpeechText(value);
                  textRef.current = value;
                }}
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

              <TouchableOpacity
                onPress={isListening ? stopListening : startListening}
                style={{
                  backgroundColor: "#e5e5e5",
                  padding: 8,
                  marginRight: 5,
                  borderRadius: 50,
                }}
              >
                <Feather
                  name={isListening ? "mic-off" : "mic"}
                  size={hp(2.7)}
                  color="#737373"
                />
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
    top: hp(5),
    left: wp(5),
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d3144",
  },
};
