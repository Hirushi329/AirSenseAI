import { View, Text, Button, Image,ScrollView  } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/AuthContextProvider'
import Header from '../../components/Home/Header';
import Slider from '../../components/Home/Slider';
import PopularMentalHealthTips from '../../components/Home/PopularMentalHealthTips';
import TrendingPhysiotherapyEx from '../../components/Home/TrendingPhysiotherapyEx';
import OngoingSessions from '../../components/Home/ongoingSession';

export default function Home() {
  const { logout, user } = useAuth();

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <Header />

      {/* Scrollable Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: 20,  // Add padding to the bottom to prevent clipping
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
      >
        

        {/* Slider */}
        <View style={{ width: '100%' }}>
          <Slider />
        </View>

        {/* Ongoing Sessions */}
        <View style={{ width: '100%' }}>
          <OngoingSessions />
        </View>

        {/* Popular Mental Health Tips */}
        <View style={{ width: '100%', marginTop: 20 }}>
          <PopularMentalHealthTips />
          <TrendingPhysiotherapyEx/>
        </View>
      </ScrollView>
    </View>
  );
}