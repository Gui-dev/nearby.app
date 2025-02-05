import { View } from 'react-native'

import { Button } from '@/components/button'
import { Steps } from '@/components/steps'
import { Welcome } from '@/components/welcome'
import { IconArrowRight } from '@tabler/icons-react-native'
import { router } from 'expo-router'

const Home = () => {
  const handleGoToHomePage = () => {
    router.navigate('/home')
  }

  return (
    <View className="flex-1 gap-10 p-10">
      <Welcome />
      <Steps />
      <Button onPress={handleGoToHomePage}>
        <Button.Title>Começar</Button.Title>
        <Button.Icon icon={IconArrowRight} />
      </Button>
    </View>
  )
}

export default Home
