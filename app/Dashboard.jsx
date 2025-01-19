import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { Image } from 'react-native';
import { useRouter } from "expo-router";
import { BarChart } from 'react-native-chart-kit';  // Import BarChart from react-native-chart-kit

const { width } = Dimensions.get('window');

const AirQualityScreen = () => {
    const [location, setLocation] = useState('Fetching location...');
    const [aqiValue, setAqiValue] = useState(null);
    const [pm25, setPm25] = useState(null);
    const [pm10, setPm10] = useState(null);
    const [aqiStatus, setAqiStatus] = useState(null);
    const [forecastData, setForecastData] = useState([]);
    const [iotPm25, setIotPm25] = useState(null); // PM2.5 from IoT
    const [iotPm10, setIotPm10] = useState(null); // PM10 from IoT
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    const API_URL = 'http://192.168.198.150:5000/aqipollutants'; // Replace with your API URL
    const FORECAST_API_URL = 'http://192.168.198.150:5001/predict'; // Replace with your forecast API URL
    const IOT_API_URL = 'http://192.168.198.240:5000/airquality'; // IoT API URL for PM values

    const aqiScaleLabelsData = [
        { label: 'Good', color: getAqiColor("Good"), aqi_max: 50 }, // Good: 0-50
        { label: 'Moderate', color: getAqiColor("Moderate"), aqi_max: 100 }, // Moderate: 51-100
        { label: 'Unhealthy for Sensitive Groups', color: getAqiColor("Unhealthy for Sensitive Groups"), aqi_max: 150 }, // Unhealthy for Sensitive Groups: 101-150
        { label: 'Unhealthy', color: getAqiColor("Unhealthy"), aqi_max: 200 }, // Unhealthy: 151-200
        { label: 'Very Unhealthy', color: getAqiColor("Very Unhealthy"), aqi_max: 300 }, // Very Unhealthy: 201-300
        { label: 'Hazardous', color: getAqiColor("Hazardous"), aqi_max: 500 }, // Hazardous: 301-500
    ];
    
    const getAqiScalePosition = (aqiValue) => {
        if (aqiValue == null) return 0;
        if (aqiValue <= 50) return 0; // Good
        if (aqiValue <= 100) return (1 / 6) * 100; // Moderate
        if (aqiValue <= 150) return (2 / 6) * 100; // Unhealthy for Sensitive Groups
        if (aqiValue <= 200) return (3 / 6) * 100; // Unhealthy
        if (aqiValue <= 300) return (4 / 6) * 100; // Very Unhealthy
        return 100; // Hazardous
    };

    const chartData = {
        labels: forecastData.length > 0 ? forecastData.map(item => `${item.hour}:00`) : [],  // Hour as labels
        datasets: [
          {
            data: forecastData.length > 0 ? forecastData.map(item => item.AQI) : [],  // AQI values for each hour
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,  // Bar color
            barPercentage: 0.5,  // Adjust bar width
          },
        ],
      };

    useEffect(() => {
        const fetchLocationAndAirQuality = async () => {
            setLoading(true);
            setError(null);
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setLocation('Permission denied');
                    return;
                }
                let { coords } = await Location.getCurrentPositionAsync({});
                let { latitude, longitude } = coords;

                let city = '';
                try {
                    let response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    let data = await response.json();
                    city = data.address.city || 'Unknown';
                    setLocation(data.address.city ? `${data.address.city}, ${data.address.country}` : 'Location not available');
                } catch (locationError) {
                    setLocation('Error fetching location');
                }

                const apiResponse = await fetch(API_URL);
                if (!apiResponse.ok) {
                    setError(`API Error: ${apiResponse.status}`);
                    setLoading(false);
                    return;
                }

                const apiData = await apiResponse.json();
                if (apiData && apiData.aqi != null) {
                    setAqiValue(parseInt(apiData.aqi));
                    setPm25(apiData.pm25);
                    setPm10(apiData.pm10);
                    setAqiStatus(apiData.aqi_status);
                } else {
                    setError("Invalid API data");
                }

                const forecastResponse = await fetch(FORECAST_API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ city }),
                });

                if (forecastResponse.ok) {
                    const forecast = await forecastResponse.json();
                    console.log(forecast); // Check the API response
                    setForecastData(forecast.Predictions);
                    console.log(forecast); // Check the API response
                } else {
                    setError("Error fetching forecast data.");
                }

                // Fetch PM2.5 and PM10 values from IoT API
                const iotResponse = await fetch(IOT_API_URL);
                if (iotResponse.ok) {
                    const iotData = await iotResponse.json();
                    setIotPm25(iotData.pm25);
                    setIotPm10(iotData.pm10);
                } else {
                    setError("Error fetching PM values from IoT API.");
                }

                setLoading(false);
            } catch (err) {
                setError("Error fetching data.");
                setLoading(false);
            }
        };

        fetchLocationAndAirQuality();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push("GetStarted")} style={styles.backButton}>
                    <Text style={styles.backButtonText}>{'< '}</Text>
                </TouchableOpacity>
                <View style={styles.locationContainer}>
                    <Text style={styles.locationText}>{location}</Text>
                </View>
            </View>
            <View style={styles.overview}>
                {loading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#2d4052" />
                        <Text style={styles.loadingText}>Loading air quality data...</Text>
                    </View>
                )}
                {error && <Text style={styles.errorText}>Error: {error}</Text>}
                {!loading && !error && (
                    <View>
                        <Text style={styles.overviewText}>Current Air Quality at {location} is</Text>
                        <Text style={[styles.overviewStatus, { color: getAqiColor(aqiStatus) }]}>{aqiStatus || 'Loading...'}</Text>
                        <View style={styles.aqiValueContainer}>
                            <Text style={styles.aqiValue}>{aqiValue || 'N/A'}</Text>
                            <Text style={styles.pollutantText}>PM2.5: {pm25 || 'N/A'} PM10: {pm10 || 'N/A'}</Text>
                        </View>
                    </View>
                )}
            </View>

            {/* PM Values from IoT API */}
            <View style={styles.iotPmValuesContainer}>
                <Text style={styles.iotPmTitle}>PM Values from AirSense AI Device Location</Text>
                <Text style={styles.iotPmText}>These PM values are from your exact location</Text>
                {iotPm25 && iotPm10 ? (
                    <View style={styles.iotPmValues}>
                        <Text style={styles.iotPmText}>PM2.5: {iotPm25}</Text>
                        <Text style={styles.iotPmText}>PM10: {iotPm10}</Text>
                    </View>
                ) : (
                    <Text style={styles.loadingText}>Loading PM values from IoT...</Text>
                )}
            </View>

            <View style={styles.aqiScaleContainer}>
                <View style={styles.aqiScaleBar}>
                    {aqiScaleLabelsData.map((item, index) => (
                        <View key={index} style={[styles.aqiSection, { backgroundColor: item.color, flex: 1 }]} />
                    ))}
                </View>
                <View style={[styles.aqiIndicator, { left: `${getAqiScalePosition(aqiValue)}%` }]}>
                    <Text style={styles.aqiPopup}>{aqiValue || "N/A"}</Text>
                    <View style={styles.aqiArrow} />
                </View>
            </View>

            {/* 24-Hour Forecast */}
           <View style={styles.forecastContainer}>
              <Text style={styles.forecastTitle}>24-Hour Forecast</Text>
                <View style={styles.forecastChart}>
                    {forecastData && forecastData.length > 0 ? (
                         forecastData.map((item, index) => (
                            <View key={index} style={styles.forecastBarContainer}>
                                <Text style={styles.forecastValue}>{item.AQI.toFixed(2)}</Text>
                                  <View
                                        style={[
                                          styles.forecastBar,
                                           {
                                            height: Math.min(item.AQI * 20, 50), // Scale height
                                              backgroundColor: getAqiColor(item["AQI Status"]),
                                         },
                                     ]}
                                  />
                                <Text style={styles.forecastDay}>{item.hour}:00</Text>
                              </View>
                            ))
                        ) : (
                           <Text style={styles.loadingText}>No forecast data available</Text>
                        )}
                </View>
           </View>
           <View style={styles.bottomImageContainer}>
                <Image
                source={require("./../assets/images/AirSenseLogo.png")}
                style={{
                    width: 100,
                    height: 100,
                   alignSelf: "center",
                 }}
                />
             </View>
              <TouchableOpacity
                onPress={() => router.push("ChatRoom")}
                style={styles.chatroomButton}
              >
                <Text style={styles.chatroomButtonText}>{"Ask AirSense AI"}</Text>
              </TouchableOpacity>
        </ScrollView>
    );
};

const getAqiColor = (aqiStatus) => {
    switch (aqiStatus?.toLowerCase()) {
        case 'good':
            return '#009966';
        case 'moderate':
            return '#ffde33';
        case 'unhealthy for sensitive groups':
            return '#ff9933';
        case 'unhealthy':
            return '#cc0033';
        case 'hazardous':
            return '#7e0023';
        default:
            return '#cccccc';
    }
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
        padding: 26,
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
    pollutantText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#2d4052"
    },
    errorText: {
        color: 'red',
        marginVertical: 10,
        fontSize: 16,
        textAlign: 'center',
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
    chatroomButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    backButtonText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2d3144',
    },
    chatroomButtonText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white',
    },
    iotPmValuesContainer: {
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
    iotPmTitle: {
        fontSize: 18,
        color: '#333',
        marginBottom: 8,
    },
    iotPmText: {
        fontSize: 12,
        color: '#333',
        marginBottom: 8,
    },
    iotPmValues: {
        marginBottom: 8,
    },
    iotPmText: {
        fontSize: 16,
        color: '#333',
    },
});

export default AirQualityScreen;