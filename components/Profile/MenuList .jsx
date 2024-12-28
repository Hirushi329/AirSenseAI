import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Share,
} from "react-native";
import React from "react";
import { useAuth } from "../../context/AuthContextProvider";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function MenuList() {
  const { logout, user } = useAuth();
  const router = useRouter();

  console.log("Current User Email:", user?.email);

  const menuList = [

   
    user?.email === "messi@gmail.com" && {
      id: 1,
      name: "Add Mental Health Tips & Guides",
      icon: require("./../../assets/images/add.png"),
      path: "/IT22577160/mentalHealth/Add_MentalHealth",
    },
    user?.email === "messi@gmail.com" && {
      id: 2,
      name: "View Mental Health Tips & Guides",
      icon: require("./../../assets/images/View.png"),
      path: "/IT22577160/mentalHealth/My_MentalHealth",
    },

    user?.email === "tatan@gmail.com" && {
      id: 5,
      name: "Add Physio Exercises",
      icon: require("./../../assets/images/AddPy.png"),
      path: "/IT22607232/Add_Exercises/Add_PhysioExercises",
    }, user?.email === "tatan@gmail.com" &&{
      id: 6,
      name: "View Physio Exercises",
      icon: require("./../../assets/images/View.png"),
      path: "/IT22607232/Add_Exercises/View_PhysioExercises",

    },user?.email === "tatan@gmail.com" && {
      id: 7,
      name: "Upload Physio Exercise Videos",
      icon: require("./../../assets/images/seeVideo.png"),
      path: "/IT22607232/Add_Exercises/Add_PhysioVideos",
    },
    {
      id: 1,
      name: "Physio Videos",
      icon: require("./../../assets/images/seeVideo.png"),
      path: "/IT22607232/Add_Exercises/View_PhysioLog",
    },
    // user?.email === "messi@gmail.com" && {
    //   id: 1,
    //   name: "Add Mental Health Tips & Guides",
    //   icon: require("./../../assets/images/add.png"),
    //   path: "/IT22577160/mentalHealth/Add_MentalHealth",
    // },
    // user?.email === "messi@gmail.com" && {
    //   id: 2,
    //   name: "View Mental Health Tips & Guides",
    //   icon: require("./../../assets/images/View.png"),
    //   path: "/IT22577160/mentalHealth/My_MentalHealth",
    // },
    user?.email === "tommy1914@gmail.com" && {
      id: 2,
      name: "My Clinics",
      icon: require("./../../assets/images/View.png"),
      path: "/IT22003546/Add_Clinic/MyClinics",
    },
    user?.email === "thihansig@gmail.com" && {
      id: 8,
      name: "Medical Records",
      icon: require("./../../assets/images/list.png"),
      path: "/IT22350114/ViewPatientsAdminView/PatientList",
    }, 
    user?.email === "thihansig@gmail.com" && {
      id: 8,
      name: "Add Medical Records",
      icon: require("./../../assets/images/medicalRecordsUpload.png"),
      path: "/IT22350114/AddMedicalRecords/AddRecords",
    },
    {
      id: 3,
      name: "Share App",
      icon: require("./../../assets/images/share_1.png"),
      path: "share",
    },
    {
      id: 4,
      name: "Logout",
      icon: require("./../../assets/images/logout.png"),
      path: "logout",
    },
  ].filter(Boolean); // Filter out any false values;

  const onMenuClick = async (item) => {
    if (item.path == "logout") {
      await logout();
      return;
    }

    if (item.path == "share") {
      Share.share({
        message: "Download the Medicare App by Medicare_Team, Download URL:",
      });
      return;
    }
    router.push(item.path);
  };

  return (
    <View>
      <FlatList
        data={menuList}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onMenuClick(item)}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              padding: 10,
              borderRadius: 10,
              borderWidth: 1.5,
              margin: 10,
              backgroundColor: "#fff",
              borderColor: Colors.PRIMARY,
            }}
          >
            <Image
              source={item.icon}
              style={{
                width: 50,
                height: 50,
              }}
            />
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 16,
                flex: 1,
              }}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 16,
          textAlign: "center",
          marginTop: 50,
          color: Colors.GRAY,
        }}
      >
        Developed by clinic_mate @ 2024
      </Text>
    </View>
  );
}
