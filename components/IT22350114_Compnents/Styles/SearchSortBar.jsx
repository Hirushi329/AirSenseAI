import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Importing icon library

const SearchSortBar = ({
  searchQuery,
  setSearchQuery,
  sortOrder,
  setSortOrder,
}) => {
  return ( // Added return statement here
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="gray" />
        <TextInput
          placeholder="Search Patients"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </View>

      {/* Sort Icon Button */}
      <TouchableOpacity 
        onPress={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} 
        style={styles.sortButton}
      >
        <Image 
          source={require('./../../../assets/images/sortIcon.png')} // Ensure this path is correct
          style={styles.sortIcon} 
        />
      </TouchableOpacity>
    </View>
  );
};

// Styles for Search and Sort Bar
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Set direction to row to align search and sort
    alignItems: 'center', // Align items center vertically
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5, // Add some vertical padding for better touchability
    height: 40, // Height of the search bar
    width: '90%', // Width as a percentage of the parent container
  },
  searchInput: {
    flex: 1,
    padding: 5, // Padding for the input
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    marginLeft: 5,
    height: '100%', // Full height of the container
  },
  sortIcon: {
    width: 24, // Width for the sort icon
    height: 24, // Height for the sort icon
    marginLeft: 15, // Space between the search input and sort icon
  },
});

export default SearchSortBar;
