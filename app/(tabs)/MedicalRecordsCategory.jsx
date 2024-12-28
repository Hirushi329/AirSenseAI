import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import MedicalRecordCategoryCard from "../../components/IT22350114_Compnents/MedicalRecordCategoryCard";
import { Colors } from "../../constants/Colors";
import { db } from "../../configs/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore"; // Import Firestore methods
import { useRouter } from "expo-router"; // Import useRouter from expo-router
import MedicalRecordsAdminHeader from "../../components/IT22350114_Compnents/MedicalRecordsAdminHeader";
import { useAuth } from '../../context/AuthContextProvider';

// Mapping of categories to their corresponding images
const categoryImages = {
  "Lab_Report": require("../../assets/images/labReport.png"), // Path to the image for Lab Report
  "Scan_Report": require("../../assets/images/scansImage.png"), // Path to the image for Scan Report
  "Prescription": require("../../assets/images/prescriptionsImage.png"), // Path to the image for Prescription
};

export default function MedicalRecordsCategory() {
  const router = useRouter(); // Use the router
  const [categories, setCategories] = useState([]); // State for categories
  const [loading, setLoading] = useState(true); // State for loading indicator
  const { user } = useAuth(); // Access the authenticated user

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const recordsRef = collection(db, "medicalRecords"); // Reference to the collection
        let q;

        // If the username is 'hansi', fetch all records, otherwise filter by username
        if (user.username === 'hansi') {
          q = recordsRef; // Get all records
        } else {
          q = query(recordsRef, where("username", "==", user.username)); // Filter by username
        }

        const querySnapshot = await getDocs(q);

        // Extract unique categories from the records
        const uniqueCategories = new Set();
        querySnapshot.forEach(doc => {
          const data = doc.data();
          if (data.reportType) {
            uniqueCategories.add(data.reportType); // Add each reportType to the set
          }
        });

        setCategories(Array.from(uniqueCategories)); // Convert set to array and update state
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchCategories(); // Call the function to fetch categories
  }, [user]); // Ensure to rerun if user changes


  const handleCategoryPress = (category) => {
    // Navigate to MedicalRecordsDetail and pass the selected category
    router.push(`/IT22350114/MedicalrecordsDetails/${category}`);
    console.log("Selected Category:", category);
  };

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.PRIMARY} />; // Loading indicator while fetching categories
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <MedicalRecordsAdminHeader />
      <ScrollView style={{ flex: 1, backgroundColor: "#f5f5f5", padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
          Your Reports
        </Text>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <MedicalRecordCategoryCard
              key={index} // Use index as key for simplicity, but consider using a unique id if available
              title={category.split('_').join(' ')} // Replace underscore with space
              imageSource={categoryImages[category] || require("../../assets/images/uploadFilesImg.jpg")} // Use the mapping to get the image, with a default placeholder
              onPress={() => handleCategoryPress(category)} // Pass category
            />
          ))
        ) : (
          <Text style={{ fontSize: 16, color: 'gray' }}>You have no medical records.</Text>
        )}
      </ScrollView>
    </View>
  );
}
