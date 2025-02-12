import { colors } from '@/styles/colors'
import { IconArrowLeft } from '@tabler/icons-react-native'
import { router } from 'expo-router'
import { ImageBackground, View } from 'react-native'
import { Button } from '../button'

interface ICoverProps {
  uri: string
}

export const Cover = ({ uri }: ICoverProps) => {
  const handleNavigateGoBack = () => {
    router.back()
  }

  return (
    <ImageBackground
      source={{ uri }}
      className="-mb-8 h-[232px] w-full bg-gray-200"
    >
      <View className="p-6 pt-14">
        <Button className="h-10 w-14 px-4" onPress={handleNavigateGoBack}>
          <IconArrowLeft color={colors.gray[100]} size={20} />
        </Button>
      </View>
    </ImageBackground>
  )
}
