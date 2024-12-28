import { View, Text, TouchableOpacity, Alert, ToastAndroid } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAuth } from "../../context/AuthContextProvider";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../configs/firebaseConfig";

export default function ClinicCard({ item }) {
  const router = useRouter();
  const { user } = useAuth();

  const onDelete = () => {
    Alert.alert('Delete Clinic', 'Are you sure you want to delete this clinic?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: deleteClinic }
    ]);
  };

  const deleteClinic = async () => {
    await deleteDoc(doc(db, 'clinics', item?.id));
    router.push('/IT22003546/Add_Clinic/MyClinics');
    ToastAndroid.show('Clinic Deleted Successfully', ToastAndroid.LONG);
  };

  return (
    <TouchableOpacity
        style={{
            padding: 15,
            marginVertical: 10,
            backgroundColor: '#e0f7fa', // White background for better contrast
            borderRadius: 24, // Softer corners
            elevation: 3, // Shadow for Android
            shadowColor: '#000', // Shadow color for iOS
            shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
            shadowOpacity: 0.2, // Shadow opacity for iOS
            shadowRadius: 4, // Shadow blur radius for iOS
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
        }}
        onPress={() => router.push(`/IT22003546/clinicDetails/` + item.id)} 
    >
        <View style={{ flex: 1 }}> 
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.PRIMARY }}>
                {item?.name}
            </Text>
            <Text style={{ fontSize: 16, color: Colors.GRAY, marginTop: 5 }}>
                {item?.hospital} 
            </Text>
            <Text style={{ fontSize: 16, color: Colors.GRAY }}>
                Days: {item?.days.join(', ')} 
            </Text>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}> 
          {user?.email === 'tommy1914@gmail.com' && (
              <TouchableOpacity onPress={() => router.push(`/IT22003546/updateClinic/` + item.id)}>
                  <MaterialIcons name="edit" size={24} color={Colors.PRIMARY} style={{ marginBottom: 30 }} /> 
              </TouchableOpacity>
          )}
          {user?.email === 'tommy1914@gmail.com' && (
              <TouchableOpacity onPress={onDelete}>
                  <MaterialIcons name="delete" size={24} color="#FF5722" />
              </TouchableOpacity>
          )}
      </View>
    </TouchableOpacity>
);


}
