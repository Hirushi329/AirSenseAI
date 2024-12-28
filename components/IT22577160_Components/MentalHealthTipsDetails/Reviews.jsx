import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../../constants/Colors";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../configs/firebaseConfig";
import { useAuth } from "../../../context/AuthContextProvider";

export default function Reviews({ mentalHealthTips }) {
  const [userInput, setUserInput] = useState();
  const { user } = useAuth();
  const onSubmit = async () => {
    console.log("User Info:", {
      username: user?.username,
      imageUrl: user?.profileUrl,
      email: user?.email,
    });

    if (!user) {
      ToastAndroid.show("User not found", ToastAndroid.BOTTOM);
      return;
    }
    const docRef = doc(db, "mentalHealthTips", mentalHealthTips?.id);
    await updateDoc(docRef, {
      comments: arrayUnion({
        comment: userInput,
        username: user?.username,
        userEmail: user?.email,
        userImageUrl: user?.profileUrl,
      }),
    });
    ToastAndroid.show("Comment Added Successfully", ToastAndroid.BOTTOM);
  };
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "#fff",
        marginTop: -20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
        }}
      >
        Comments
      </Text>
      <View>
        <TextInput
          placeholder="Write Your Comment"
          numberOfLines={4}
          onChangeText={(text) => setUserInput(text)}
          style={{
            borderWidth: 1,
            borderColor: Colors.GRAY,
            borderRadius: 10,
            padding: 10,
            textAlignVertical: "top",
          }}
        />
        <TouchableOpacity
          disabled={!userInput}
          onPress={() => onSubmit()}
          style={{
            padding: 10,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 6,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit",
              color: "#fff",
              textAlign: "center",
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      {/* Display Previous Comment */}
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          // alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 12,
            color: Colors.PRIMARY,
          }}
        >
          Previous comments
        </Text>
        {mentalHealthTips?.comments?.map((comment, index) => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              padding: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Colors.GRAY,
              borderRadius: 15,
              width: "100%",
            }}
          >
            <Image
              source={{ uri: comment.userImageUrl }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 99,
              }}
            />
            <View
              style={{
                display: "flex",
                gap: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: "outfit-bold",
                  fontSize: 14,
                  color: Colors.PRIMARY,
                }}
              >
                {comment.username}
              </Text>
              <Text
                style={{
                  fontFamily: "outfit",
                  fontSize: 12,
                  color: Colors.GRAY,
                }}
              >
                {comment.comment}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
