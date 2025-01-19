import React, { useState } from "react";
import { View, Text, ActivityIndicator, Alert, Button } from "react-native";
import axios from "axios";

const SpeechToTextConverter = ({ audioUri, apiUrl, onResult }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [transcription, setTranscription] = useState("");

  const handleConvert = async () => {
    if (!audioUri) {
      Alert.alert("Error", "No audio file provided.");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: audioUri,
        name: "audio.wav", // Ensure the file name matches your API's requirements
        type: "audio/wav", // Ensure the MIME type matches your API's requirements
      });

      const response = await axios.post(`${apiUrl}/speech-to-text`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.text) {
        setTranscription(response.data.text);
        onResult && onResult(response.data.text); // Callback to parent component
      } else {
        Alert.alert("Error", "Failed to transcribe audio.");
      }
    } catch (error) {
      console.error("Error converting audio:", error);
      Alert.alert("Error", "Failed to process the audio file.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ padding: 20, backgroundColor: "#f9f9f9", borderRadius: 10 }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {transcription ? (
            <Text style={{ fontSize: 16, color: "#333", marginBottom: 20 }}>
              Transcription: {transcription}
            </Text>
          ) : (
            <Text style={{ fontSize: 16, color: "#777", marginBottom: 20 }}>
              Press the button to transcribe the audio.
            </Text>
          )}
          <Button title="Convert Audio to Text" onPress={handleConvert} />
        </>
      )}
    </View>
  );
};

export default SpeechToTextConverter;
