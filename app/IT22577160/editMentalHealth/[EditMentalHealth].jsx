import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../configs/firebaseConfig";
import { Colors } from "../../../constants/Colors";
import CustomKeyBoardView from "../../../components/CustomKeyBoardView";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Entypo } from "@expo/vector-icons";

export default function EditMentalHealth() {
  const router = useRouter();
  const { EditMentalHealth } = useLocalSearchParams(); // Fetch the id from route params
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [newImage, setNewImage] = useState(null); // Store the new selected image
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMentalHealthTip();
  }, []);

  // Fetch the mental health tip details by its ID
  const fetchMentalHealthTip = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "mentalHealthTips", EditMentalHealth);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setTitle(data.title);
        setCategory(data.category);
        setContent(data.content);
        setImage(data.imageUrl); // Fetch and set the image URL
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Pick an image from the device
  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setNewImage(result?.assets[0]?.uri); // Store the new image
    }
  };

  // Update the mental health tip, including the image
  const onUpdateTip = async () => {
    setLoading(true);
    let imageUrl = image; // Default to the existing image URL

    try {
      // If a new image has been selected, upload it to Firebase Storage
      if (newImage) {
        const fileName = Date.now().toString() + ".jpg";
        const response = await fetch(newImage);
        const blob = await response.blob();
        const storageRef = ref(storage, "mentalHealth/" + fileName);
        await uploadBytes(storageRef, blob);
        imageUrl = await getDownloadURL(storageRef);
      }

      // Update the mental health tip with the new or existing image URL
      const docRef = doc(db, "mentalHealthTips", EditMentalHealth);
      await updateDoc(docRef, {
        title,
        category,
        content,
        imageUrl, // Update with either the existing or the new image URL
      });

      ToastAndroid.show(
        "Mental Health Tip Updated Successfully",
        ToastAndroid.LONG
      );
      router.push("/IT22577160/mentalHealth/My_MentalHealth");
    } catch (error) {
      console.error("Error updating document: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomKeyBoardView>
      <View
        style={{
          marginTop: hp(4),
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: wp(5),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <TouchableOpacity onPress={() => router.push("Profile")}>
            <Entypo name="chevron-left" size={hp(4)} color="#737373" />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Text
              style={{
                fontSize: hp(2),
                fontWeight: "medium",
                color: "#262626",
                fontFamily: "outfit-medium",
              }}
            >
              Edit Mental Health Tips & Guides
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          height: 8,
          borderBottomWidth: 1,
          borderBottomColor: "#d4d4d4",
        }}
      />
      <View style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: hp(2.5),
            fontWeight: "medium",
            color: Colors.PRIMARY,
            fontFamily: "outfit-medium",
            textAlign: "center",
          }}
        >
          Edit Your Mental Health Tips & Guides
        </Text>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.PRIMARY} />
        ) : (
          <>
            {/* Display the current image */}
            <TouchableOpacity style={{ marginTop: 20 }} onPress={onImagePick}>
              {!newImage ? (
                <Image
                  source={{ uri: image }}
                  style={{
                    width: 220,
                    height: 220,
                    borderWidth: 1,
                    borderRadius: 15,
                    borderColor: Colors.PRIMARY,
                  }}
                />
              ) : (
                <Image
                  source={{ uri: newImage }}
                  style={{
                    width: 220,
                    height: 220,
                    borderWidth: 1,
                    borderRadius: 15,
                    borderColor: Colors.PRIMARY,
                  }}
                />
              )}
            </TouchableOpacity>
            <View
              style={{
                marginTop: 30,
                gap: 10,
                padding: 20,
                backgroundColor: "#ccccff",
                borderRadius: 20,
              }}
            >
              <TextInput
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
                style={{
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  fontSize: 17,
                  backgroundColor: "#fff",
                  marginBottom: 20,
                  borderColor: Colors.PRIMARY,
                }}
              />
              <TextInput
                placeholder="Category"
                value={category}
                onChangeText={setCategory}
                style={{
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  fontSize: 17,
                  backgroundColor: "#fff",
                  marginBottom: 20,
                  borderColor: Colors.PRIMARY,
                }}
              />
              <TextInput
                placeholder="Content"
                value={content}
                onChangeText={setContent}
                multiline
                numberOfLines={5}
                style={{
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  fontSize: 17,
                  backgroundColor: "#fff",
                  borderColor: Colors.PRIMARY,
                  textAlignVertical: "top",
                }}
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.PRIMARY,
                padding: 15,
                borderRadius: 10,
                marginTop: 20,
              }}
              onPress={onUpdateTip}
              disabled={loading}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                {loading ? "Updating..." : "Update Tip"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </CustomKeyBoardView>
  );
}
