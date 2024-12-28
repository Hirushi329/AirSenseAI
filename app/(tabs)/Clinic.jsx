import { View, Text, ScrollView, TouchableOpacity, FlatList, ActivityIndicator, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContextProvider';
import ClinicHeader from '../../components/IT22003546_Components/ClinicHeader'; 
import { useRouter } from 'expo-router'; 
import { db } from '../../configs/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore'; 
import { Colors } from '../../constants/Colors';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter(); 
  const [enrolledClinics, setEnrolledClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  useEffect(() => {
    const fetchEnrolledClinics = async () => {
      setLoading(true);
      try {
        const clinicsRef = collection(db, "clinics");
        const q = query(clinicsRef, where("enrolledUsers", "array-contains", user.email));
        const snapshot = await getDocs(q);
        const fetchedClinics = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEnrolledClinics(fetchedClinics);
      } catch (error) {
        console.error("Error fetching enrolled clinics: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledClinics();
  }, [user]);

  // Filtered clinics based on search query
  const filteredClinics = enrolledClinics.filter(clinic =>
    clinic.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <ClinicHeader />

      <View style={{ padding: 10, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Enrolled Clinics</Text>
        <TouchableOpacity onPress={() => router.push('/IT22003546/EnrollClinic/enrollForClinic')}>
          <Text style={{ color: '#007BFF' }}>Enroll for Clinic</Text>
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <TextInput
          placeholder="Search Clinics"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#A9A9A9" // Set your desired color here
          style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: Colors.PRIMARY,
              margin: 10,
              backgroundColor: '#fff',
          }}
      />


      {/* Loading State */}
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
        data={filteredClinics} // Use filtered clinics
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={{
              marginHorizontal: 20,
              padding: 20, // Increased padding for a better feel
              backgroundColor: '#ffffff', // Set background to white for contrast
              borderRadius: 12, // Rounded corners
              marginVertical: 8, // Vertical margin for spacing between tiles
              elevation: 5, // Shadow for Android
              shadowColor: '#000', // Shadow color for iOS
              shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
              shadowOpacity: 0.3, // Shadow opacity for iOS
              shadowRadius: 5, // Shadow blur radius for iOS
            }}
            onPress={() => router.push(`/IT22003546/clinicDetails/` + item.id)} // Navigate to ClinicDetails with ID
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#00796b' }}>{item.name}</Text>
            <Text style={{ fontSize: 16, color: '#555' }}>{item.hospital}</Text>
            <Text style={{ fontSize: 14, color: '#888', marginTop: 5 }}>{`Days: ${item.days.join(', ')}`}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<Text style={{ textAlign: "center", color: Colors.GRAY, marginTop: 20 }}>No clinics available.</Text>}
      />

      )}
    </View>
  );
}
