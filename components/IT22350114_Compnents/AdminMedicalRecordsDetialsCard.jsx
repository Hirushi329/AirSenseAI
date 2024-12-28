import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Colors } from "../../constants/Colors";
import pdfIcon from "../../assets/images/pdfIcon.png"; 
import { Entypo } from '@expo/vector-icons'; // Importing icon library

const MedicalRecordsDetialsCard = ({ title, date, onPress, onDelete }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.cardContent}>
        <Image
          source={pdfIcon} 
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <TouchableOpacity 
          onPress={(e) => {
            e.stopPropagation(); // Prevent triggering the card's onPress
            onDelete(); // Call the delete function
          }}
          style={styles.deleteButton}
        >
          <Entypo name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.LIGHTBLUE,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Added to space out the elements
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.BLACK,
  },
  date: {
    fontSize: 14,
    color: Colors.GRAY,
  },
  deleteButton: {
    paddingLeft: 10, // Space between text and delete icon
  },
});

export default MedicalRecordsDetialsCard;
