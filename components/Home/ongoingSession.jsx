import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/firebaseConfig";
import OngoingSessionCard from "./ongoingSessionCard"; // Import your ongoing session card component
import { useAuth } from "../../context/AuthContextProvider"; // Import the Auth context to get user data

export default function OngoingSessions() {
  const { user } = useAuth(); // Access the authenticated user
  const [sessions, setSessions] = useState([]);
  const [enrolledClinics, setEnrolledClinics] = useState([]);

  // Fetch enrolled clinics for the user
  const getEnrolledClinics = async () => {
    const clinicsRef = collection(db, "clinics");
    const q = query(clinicsRef, where("enrolledUsers", "array-contains", user.email));
    const querySnapshot = await getDocs(q);
    
    const fetchedClinics = querySnapshot.docs.map(doc => doc.id); // Get the IDs of enrolled clinics
    setEnrolledClinics(fetchedClinics);
  };

  // Fetch ongoing sessions
  const getOngoingSessions = async () => {
    setSessions([]);
    const q = query(collection(db, "sessions"), where("status", "==", "Ongoing")); // Adjust to fetch ongoing sessions
    const querySnapshot = await getDocs(q);
    
    const allSessions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Filter sessions to only include those from enrolled clinics
    const filteredSessions = allSessions.filter(session => enrolledClinics.includes(session.clinicID)); // Assuming each session has a clinicId field
    setSessions(filteredSessions);
  };

  useEffect(() => {
    getEnrolledClinics(); // Fetch enrolled clinics first
  }, [user]);

  useEffect(() => {
    if (enrolledClinics.length > 0) {
      getOngoingSessions(); // Fetch ongoing sessions after getting enrolled clinics
    }
  }, [enrolledClinics]);

  return (
    <View style={{ marginTop: 20 }}>
      {sessions.length > 0 && ( // Only render the title if there are ongoing sessions
        <View
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: "outfit-bold",
            }}
          >
            Ongoing Sessions
          </Text>
        </View>
      )}

      {sessions.length > 0 && ( // Render the FlatList only if there are ongoing sessions
        <FlatList 
          data={sessions}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <OngoingSessionCard session={item} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}
