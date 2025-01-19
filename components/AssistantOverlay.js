import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // For animation icon
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";


function AssistantOverlay({ isVisible }) {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
      if (isVisible) {
          startAnimation()
      } else {
         stopAnimation()
       }
    }, [isVisible]);

     const startAnimation = () => {
      Animated.loop(
          Animated.timing(spinValue, {
              toValue: 1,
             duration: 1000,
             easing: Easing.linear,
             useNativeDriver: true,
         })
     ).start();
     }
   const stopAnimation = () => {
        spinValue.stopAnimation();
    }
  const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.animationContainer, { transform: [{ rotate: spin }] }]}>
          <MaterialCommunityIcons name="microphone" size={hp(8)} color="#3498db" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
   animationContainer: {
        padding: 20,
        borderRadius: 100,
    },
});

export default AssistantOverlay;