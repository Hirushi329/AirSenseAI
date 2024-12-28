import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function OngoingSessionCard({ session }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={{
        padding: 15,
        backgroundColor: '#e0f7fa', // Light blue background
        borderRadius: 12,
        marginBottom: 15,
        marginHorizontal: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        flexDirection: 'row',
        alignItems: 'center', // Center items vertically
        justifyContent: 'space-between', // Space between left and right items
        width: 'auto', // Allow the width to adapt instead of fixed 100%
        maxWidth: '100%', // Ensure it doesn't exceed the parent's width
        // overflow: 'hidden', // Prevent content from spilling out
      }}
    >
      {/* Left Side for Current Number */}
      <View style={{ 
        width: 80, // Set a fixed width for the square
        height: 80, // Same height for the square
        borderRadius: 40, // Make it circular
        backgroundColor: '#fff', // White background
        alignItems: 'center', // Center content
        justifyContent: 'center', // Center vertically
        marginRight: 15,
      }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#00796b' }}>
          {session.currentNum}
        </Text>
        <Text style={{ fontSize: 12, color: '#555' }}>
          Ongoing No
        </Text>
      </View>

      {/* Right Side for Session Details */}
      <View style={{ 
        flex: 1, 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'flex-start', 
      }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#00796b' }}>{session.doctor}</Text>
        <Text style={{ fontSize: 16, color: '#555' }}>L{session.location}</Text>
        {/* Status Tag */}
        {session.status === "Ongoing" && (
          <View style={{ 
            backgroundColor: '#4CAF50', // Green color
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 12,
            marginTop: 5, // Space above the status tag
          }}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Ongoing</Text>
          </View>
        )}
      </View>

    </TouchableOpacity>
  );
}
