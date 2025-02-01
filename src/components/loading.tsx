import { colors } from '@/styles/colors'
import { ActivityIndicator, View } from 'react-native'

export const Loading = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator color={colors.green.base} size="large" />
    </View>
  )
}
