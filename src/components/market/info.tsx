import { colors } from '@/styles/colors'
import type { IconProps } from '@tabler/icons-react-native'
import type React from 'react'
import { Text, View } from 'react-native'

interface IInfoProps {
  description: string
  icon: React.ComponentType<IconProps>
}

export const Info = ({ description, icon: Icon }: IInfoProps) => {
  return (
    <View className="flex-row items-center gap-2">
      <Icon color={colors.gray[400]} size={16} />
      <Text className="flex-1 font-regular text-gray-500 text-sm leading-5">
        {description}
      </Text>
    </View>
  )
}
