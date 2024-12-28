import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../configs/firebaseConfig'
import { Colors } from '../../../constants/Colors'
import Intro from '../../../components/IT22577160_Components/MentalHealthTipsDetails/Intro'
import ActionButton from '../../../components/IT22577160_Components/MentalHealthTipsDetails/ActionButton'
import About from '../../../components/IT22577160_Components/MentalHealthTipsDetails/About'
import Reviews from '../../../components/IT22577160_Components/MentalHealthTipsDetails/Reviews'

export default function MentalHealthTipsId() {
  const { MentalHealthTipsId } = useLocalSearchParams()
  const [mentalHealthTips, setMentalHealthTips] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetMentalHealthTipsById()
  }, [])
  /**
   * used to get MentalHealthTipsId by Id
   */
  const GetMentalHealthTipsById = async () => {
    setLoading(true);
    const docRef = doc(db, "mentalHealthTips", MentalHealthTipsId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setMentalHealthTips({id:docSnap.id, ...docSnap.data()});
      setLoading(false);
    } else {
      console.log("No such document!");
    }
  }

  return (
    <ScrollView>
       {loading ? (
        <ActivityIndicator
          style={{
            marginTop: "70%",
          }}
          size={"large"}
          color={Colors.PRIMARY}
        />
      ) : (
        <View>
          {/* Intro */}
          <Intro mentalHealthTips={mentalHealthTips} />
          {/* Action Buttons */}
          <ActionButton mentalHealthTips={mentalHealthTips} />
          {/* About Screen */}
          <About mentalHealthTips={mentalHealthTips} />
          {/* Review section */}
          <Reviews mentalHealthTips={mentalHealthTips} />
        </View>
      )}
    </ScrollView>
  )
}