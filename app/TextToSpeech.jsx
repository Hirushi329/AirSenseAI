import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const TextInputComponent = () => {
  const [text, setText] = useState('');

  const handleTextChange = (input) => {
    setText(input);
  };

  const handlePress = () => {
    convertTextToSpeech(text); // Call the text-to-speech function
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter text here"
        value={text}
        onChangeText={handleTextChange}
      />
      <Button title="Convert to Speech" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default TextInputComponent;
