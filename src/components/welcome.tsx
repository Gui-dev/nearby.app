import { Image, Text, View } from 'react-native'

import logoImage from '@/assets/logo.png'

export const Welcome = () => {
  return (
    <View>
      <Image source={logoImage} className="mt-6 mb-7 size-12" />
      <Text className="font-bold text-2xl text-gray-600">
        Boas vindas ao Nearby.app!
      </Text>
      <Text className="mt-3 font-regular text-base text-gray-500">
        Tenha cupons de vantagem para usar em {'\n'}seus estabelecimentos
        favoritos
      </Text>
    </View>
  )
}
