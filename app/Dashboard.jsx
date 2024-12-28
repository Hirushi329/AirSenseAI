import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { Image } from 'react-native';
import { useRouter } from "expo-router";

const AirQualityScreen = () => {
  const [location, setLocation] = useState('Fetching location...');
  const [aqiValue, setAqiValue] = useState(30); // Mock AQI value
  const router = useRouter();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocation('Permission denied');
        return;
      }
      let { coords } = await Location.getCurrentPositionAsync({});
      let { latitude, longitude } = coords;
      try {
        let response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        let data = await response.json();
        setLocation(data.address.city ? `${data.address.city}, ${data.address.country}` : 'Location not available');
      } catch (error) {
        setLocation('Error fetching location');
      }
    })();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.push("GetStarted")} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'< '}</Text>
        </TouchableOpacity>
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>{location}</Text>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.updateText}>Location Updated Just Now</Text>
        </View>
      </View>
      <View style={styles.bottomImageContainer}>
        <Image 
          source={require("./../assets/images/AirSenseLogo.png")}
          style={{
            width: 100,
            height: 100,
            alignSelf: "flex-end",
          }}
        />
      </View>

      {/* Air Quality Overview */}
      <View style={styles.overview}>
        <Text style={styles.overviewText}>
          Current Air Quality at {location} is
        </Text>
        <Text style={[styles.overviewStatus, { color: "#2d4052" }]}>Good</Text>
        <View style={styles.aqiValueContainer}>
          <Text style={styles.aqiValue}>{aqiValue}</Text>
        </View>
        <View style={styles.aqiScaleContainer}>
          <View style={styles.aqiScaleBar}>
            <View style={[styles.aqiSection, { backgroundColor: '#00E400', flex: 1 }]} />
            <View style={[styles.aqiSection, { backgroundColor: '#FFFF00', flex: 1 }]} />
            <View style={[styles.aqiSection, { backgroundColor: '#FF7E00', flex: 1 }]} />
            <View style={[styles.aqiSection, { backgroundColor: '#FF0000', flex: 1 }]} />
            <View style={[styles.aqiSection, { backgroundColor: '#8F3F97', flex: 1 }]} />
          </View>
          <View style={[styles.aqiIndicator, { left: `${(aqiValue / 200) * 100}%` }]}>
            <Text style={styles.aqiPopup}>{aqiValue}</Text>
            <View style={styles.aqiArrow} />
          </View>
          <View style={styles.aqiScaleLabels}>
            <Text style={[styles.aqiLabel, { color: '#00E400' }]}>Good</Text>
            <Text style={[styles.aqiLabel, { color: '#FFFF00' }]}>Moderate</Text>
            <Text style={[styles.aqiLabel, { color: '#FF7E00' }]}>Unhealthy</Text>
            <Text style={[styles.aqiLabel, { color: '#FF0000' }]}>Harmful</Text>
            <Text style={[styles.aqiLabel, { color: '#8F3F97' }]}>Deadly</Text>
          </View>
        </View>
      </View>

      {/* 24-Hour Forecast */}
      <View style={styles.forecastContainer}>
        <Text style={styles.forecastTitle}>24-Hour Forecast</Text>
        <View style={styles.forecastChart}>
          <View style={styles.forecastBarContainer}>
            <Text style={styles.forecastValue}>42</Text>
            <View style={[styles.forecastBar, { height: 42 }]} />
            <Text style={styles.forecastDay}>12 AM</Text>
          </View>
          <View style={styles.forecastBarContainer}>
            <Text style={styles.forecastValue}>35</Text>
            <View style={[styles.forecastBar, { height: 35 }]} />
            <Text style={styles.forecastDay}>3 AM</Text>
          </View>
          <View style={styles.forecastBarContainer}>
            <Text style={styles.forecastValue}>30</Text>
            <View style={[styles.forecastBar, { height: 30 }]} />
            <Text style={styles.forecastDay}>6 AM</Text>
          </View>
          <View style={styles.forecastBarContainer}>
            <Text style={styles.forecastValue}>25</Text>
            <View style={[styles.forecastBar, { height: 25 }]} />
            <Text style={styles.forecastDay}>9 AM</Text>
          </View>
          <View style={styles.forecastBarContainer}>
            <Text style={styles.forecastValue}>20</Text>
            <View style={[styles.forecastBar, { height: 20 }]} />
            <Text style={styles.forecastDay}>12 PM</Text>
          </View>
          <View style={styles.forecastBarContainer}>
            <Text style={styles.forecastValue}>18</Text>
            <View style={[styles.forecastBar, { height: 18 }]} />
            <Text style={styles.forecastDay}>3 PM</Text>
          </View>
          <View style={styles.forecastBarContainer}>
            <Text style={styles.forecastValue}>25</Text>
            <View style={[styles.forecastBar, { height: 25 }]} />
            <Text style={styles.forecastDay}>6 PM</Text>
          </View>
          <View style={styles.forecastBarContainer}>
            <Text style={styles.forecastValue}>30</Text>
            <View style={[styles.forecastBar, { height: 30 }]} />
            <Text style={styles.forecastDay}>9 PM</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d4052',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  locationContainer: {
    flex: 1,
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rightSection: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  updateText: {
    fontSize: 12,
    color: 'gray',
  },
  infoButton: {
    marginTop: 4,
  },
  overview: {
    padding: 16,
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  overviewText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  overviewStatus: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 8,
  },
  aqiValueContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  aqiValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  aqiScaleContainer: {
    marginVertical: 16,
  },
  aqiScaleLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  aqiLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  aqiScaleBar: {
    flexDirection: 'row',
    height: 16,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  aqiSection: {
    height: '100%',
  },
  aqiIndicator: {
    position: 'absolute',
    top: -30,
    alignItems: 'center',
  },
  aqiPopup: {
    backgroundColor: '#ffffff',
    padding: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  aqiArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#ccc',
    marginTop: -1,
  },
  forecastContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  forecastTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  forecastChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  forecastBarContainer: {
    alignItems: 'center',
  },
  forecastValue: {
    fontSize: 14,
    marginBottom: 4,
  },
  forecastBar: {
    width: 16,
    backgroundColor: '#2d4052',
    marginBottom: 4,
  },
  forecastDay: {
    fontSize: 12,
    color: '#333',
  },
  bottomImageContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  bottomImage: {
    width: '100%', // Make it responsive
    height: 200,  // Adjust the height as needed
    resizeMode: 'contain', // Maintain the aspect ratio
  },
  bottomImageWeb: {
    width: '100%',
    height: 'auto',
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  backButtonText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2d3144',
  },
});

export default AirQualityScreen;
