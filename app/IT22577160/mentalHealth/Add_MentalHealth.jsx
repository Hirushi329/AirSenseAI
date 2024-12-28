import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import { Colors } from "../../../constants/Colors";
import { Entypo, Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../configs/firebaseConfig";
import { useAuth } from "../../../context/AuthContextProvider";
import CustomKeyBoardView from "../../../components/CustomKeyBoardView";

export default function Add_MentalHealth() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add Mental Health Tips & Guides",
      headerShown: true,
      headerStyle: {
        backgroundColor: Colors.PRIMARY,
      },
    });
  }, []);

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    setImage(result?.assets[0]?.uri);
    console.log(result);
  };

  const onAddNewTips = async () => {
    try {
      const fileName = Date.now().toString() + ".jpg";
      const response = await fetch(image);
      const blob = await response.blob();
      const storageRef = ref(storage, "mentalHealth/" + fileName);
      await uploadBytes(storageRef, blob)
        .then((snapshot) => {
          console.log("File Uploaded...");
        })
        .then((resp) => {
          getDownloadURL(storageRef).then(async (downloadUrl) => {
            console.log(downloadUrl);
            saveMentalHealthTipsDetail(downloadUrl);
          });
        });
      setLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const saveMentalHealthTipsDetail = async (imageUrl) => {
    try {
      setLoading(true);
      if (!image) {
        throw new Error("Please select an image.");
      }

      await setDoc(doc(db, "mentalHealthTips", Date.now().toString()), {
        title: title,
        category: category,
        content: content,
        imageUrl: imageUrl,
        username: user?.username,
        userEmail: user?.email,
        userImage: user?.profileUrl,
      });
      setLoading(false);
      router.push("IT22577160/mentalHealth/My_MentalHealth");
      ToastAndroid.show(
        "New MentalHealth Tips Added Successfully",
        ToastAndroid.LONG
      );
    } catch (error) {
      console.error("Error adding document: ", error);
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
              Add Mental Health Tips & Guides
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
          Add Your Mental Health Tips & Guides
        </Text>
        <TouchableOpacity style={{ marginTop: 20 }} onPress={onImagePick}>
          {!image ? (
            <Image
              source={require("./../../../assets/images/placeholder.png")}
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
              source={{ uri: image }}
              style={{
                width: 220,
                height: 220,
                borderWidth: 1,
                borderRadius: 15,
                borderColor: Colors.PRIMARY
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
            placeholder="Title of Tip/Guide"
            onChangeText={(v) => setTitle(v)}
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              fontSize: 17,
              backgroundColor: "#fff",
              marginTop: 10,
              borderColor: Colors.PRIMARY,
              fontFamily: "outfit",
            }}
          />
          <View
            style={{
              borderWidth: 1,
              borderRadius: 10,
              backgroundColor: "#fff",
              marginTop: 20,
              borderColor: Colors.PRIMARY,
            }}
          >
            <RNPickerSelect
              onValueChange={(value) => setCategory(value)}
              items={[
                { label: "Stress", value: "Stress" },
                { label: "Depression", value: "Depression" },
                { label: "Anxiety", value: "Anxiety" },
              ]}
              placeholder={{
                label: "Category",
                value: null,
              }}
              style={{
                inputIOS: {
                  padding: 10,
                  fontSize: 17,
                  fontFamily: "outfit",
                },
                inputAndroid: {
                  padding: 10,
                  fontSize: 17,
                  fontFamily: "outfit",
                },
              }}
            />
          </View>
          <TextInput
            placeholder="Content / Description"
            onChangeText={(v) => setContent(v)}
            multiline
            numberOfLines={5}
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              fontSize: 17,
              backgroundColor: "#fff",
              marginTop: 20,
              borderColor: Colors.PRIMARY,
              fontFamily: "outfit",
              textAlignVertical: "top",
            }}
          />
        </View>
        <TouchableOpacity
          disabled={loading}
          style={{
            backgroundColor: Colors.PRIMARY,
            padding: 15,
            borderRadius: 10,
            marginTop: 20,
          }}
          onPress={onAddNewTips}
        >
          {loading ? (
            <ActivityIndicator size={"large"} color={"#fff"} />
          ) : (
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontFamily: "outfit-medium",
              }}
            >
              Add Tips and Guides
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </CustomKeyBoardView>
  );
}
