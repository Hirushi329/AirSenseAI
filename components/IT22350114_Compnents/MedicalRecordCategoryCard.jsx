import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Colors } from "../../constants/Colors";

const MedicalRecordCategoryCard = ({ title, imageSource, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.LIGHTBLUE, // Light blue background
    borderRadius: 15,
    padding: 25,
    height: 100, // Set fixed height
    marginVertical: 10,
    elevation: 2, // Add shadow for Android
    shadowColor: "#000", // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  imageContainer: {
    marginRight: 15,
  },
  image: {
    width: 70, // Increase width
    height: 70, // Increase height
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.BLACK, // Darker blue for text
  },
});

export default MedicalRecordCategoryCard;
