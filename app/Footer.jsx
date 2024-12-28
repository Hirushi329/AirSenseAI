import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function Dashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Screen A</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('GetStarted')}>
        <Text>Go to Screen B</Text>
      </TouchableOpacity>
    </View>
  );
}

function GetStarted({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Screen B</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

function Footer({ navigation }) {
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.footerButton}>
        <Text style={styles.footerButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={({ navigation }) => ({
          footer: () => <Footer navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={({ navigation }) => ({
          footer: () => <Footer navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  footerButton: {
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  footerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
