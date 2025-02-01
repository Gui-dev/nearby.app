import { Loading } from '@/components/loading'
import {
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_600SemiBold,
  Rubik_700Bold,
  useFonts,
} from '@expo-google-fonts/rubik'
import { Slot } from 'expo-router'
import { StatusBar, View } from 'react-native'

import '@/styles/global.css'

const Layout = () => {
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_600SemiBold,
    Rubik_700Bold,
  })

  if (fontsLoaded) {
    return <Loading />
  }

  return (
    <View className="flex-1 bg-gray-100">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Slot />
    </View>
  )
}

export default Layout
