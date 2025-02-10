import { View, Text } from 'react-native'
import React from 'react'
import { TabsStackScreenProps } from './TabsNavigator'

type Props = {}

const HomeScreen = ({navigation, route}: TabsStackScreenProps<"Home">) => {
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen