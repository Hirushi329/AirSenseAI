import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    ToastAndroid,
  } from "react-native";
  import React from "react";
  import { Colors } from "../../constants/Colors";
  import { useRouter } from "expo-router";
  import MaterialIcons from '@expo/vector-icons/MaterialIcons';
  import { useAuth } from "../../context/AuthContextProvider";
  import { deleteDoc, doc } from "firebase/firestore";
  import { db } from "../../configs/firebaseConfig";
  
  export default function SessionCard({ item }) {
    const router = useRouter();
    const { user } = useAuth();
  
    const onDelete = () => {
      Alert.alert('Do you want to Delete Session?', 'Are you sure you want to delete this session?', [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteSession()
        }
      ]);
    }
  
    const deleteSession = async () => {
      await deleteDoc(doc(db, 'sessions', item?.id)); // Assuming you have a 'sessions' collection
      router.push('/IT22003546/Add_Session/MySession'); // Update this to your desired navigation path
      ToastAndroid.show('Session Deleted Successfully', ToastAndroid.LONG);
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
          router.push(`/IT22003546/sessionDetails/${item.id}`); // Use the correct path for session details
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "outfit-bold",
            }}
          >
            {item?.name} {/* Session Name */}
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
            {item?.doctor} {/* Doctor Name */}
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
          <View style={{
            flexDirection: 'row'
          }}>
            {
              user?.email === 'tommy1914@gmail.com' && ( // Replace with your condition for edit/delete access
                <TouchableOpacity onPress={() => router.push('/IT22003546/updateSession/' + item.id)}>
                  <MaterialIcons name="edit" size={24} color={Colors.PRIMARY} />
                </TouchableOpacity>
              )
            }
            {
              user?.email === 'tommy1914@gmail.com' && (
                <TouchableOpacity onPress={onDelete}>
                  <MaterialIcons name="delete" size={24} color={Colors.PRIMARY} />
                </TouchableOpacity>
              )
            }
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  