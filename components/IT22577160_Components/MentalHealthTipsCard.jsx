import { View, Text, TouchableOpacity, Image, Alert, ToastAndroid } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAuth } from "../../context/AuthContextProvider";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../configs/firebaseConfig";

export default function MentalHealthTipsCard({ item }) {
  const router = useRouter();
  const { user } = useAuth();

  const onDelete = () => {
    Alert.alert('Do you want to Delete MentalHealth Tip?', 'Are you sure you want to delete this Tip?', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress:() => deleteBusiness()
      }
    ])
  }

  const deleteBusiness = async () => {
    console.log('Delete Business');
    await deleteDoc(doc(db, 'mentalHealthTips', item?.id));
    router.push('Profile');
    ToastAndroid.show('MentalHealthTip Deleted Successfully', ToastAndroid.LONG);
  }

  return (
    <TouchableOpacity
      style={{
        padding: 10,
        margin: 10,
        backgroundColor: "#ccccff",
        borderRadius: 10,
      }}
      onPress={() => {
        router.push('/IT22577160/mentalHealthTipsDetails/'+ item.id);
      }}
    >
      <Image
        source={{ uri: item?.imageUrl }}
        style={{
          width: 310,
          height: 150,
          borderRadius: 10,
          gap: 10,
        }}
      />
      <View
        style={{
          paddingTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "outfit-bold",
          }}
        >
          {item?.title}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: "outfit",
            color: Colors.GRAY,
            marginTop: 5,
          }}
          numberOfLines={2} // Adjust this to control the number of lines for content
          ellipsizeMode="tail" // To truncate text if it’s too long
        >
          {item?.content}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
          paddingTop: 5,
          borderTopWidth: 1,
          borderTopColor: Colors.GRAY,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit",
            backgroundColor: Colors.PRIMARY,
            color: "#fff",
            padding: 3,
            fontSize: 12,
            borderRadius: 5,
          }}
        >
          {item?.category}
        </Text>
        <View style={{
          flexDirection: 'row'
        }}>
          {
            user?.email === 'messi@gmail.com' && (
              <TouchableOpacity onPress={() => router.push('/IT22577160/editMentalHealth/' + item.id)}>
                <MaterialIcons name="edit" size={24} color={Colors.PRIMARY}/>
              </TouchableOpacity>
            )
          }
          {
            user?.email === 'messi@gmail.com' && (
              <TouchableOpacity onPress={() => onDelete()}>
                <MaterialIcons name="delete" size={24} color={Colors.PRIMARY}/>
              </TouchableOpacity>
            )
          }
        </View>
      </View>
    </TouchableOpacity>
  );
}
