import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from './../../constants/Colors'
import UserIntro from '../../components/Profile/UserIntro'
import MenuList from '../../components/Profile/MenuList '

export default function Profile() {
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#ccccff',
    }}>
      <View style={{
        backgroundColor: Colors.PRIMARY,
        height: 200,
        width: '100%',
      }} />
      {/* User Info */}
      <UserIntro />
      {/* Menu List */}
      <MenuList />
    </View>
  )
}