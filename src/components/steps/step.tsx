import { colors } from '@/styles/colors'
import type { IconProps } from '@tabler/icons-react-native'
import type React from 'react'
import { Text, View } from 'react-native'

interface IStepProps {
  title: string
  description: string
  icon: React.ComponentType<IconProps>
}

export const Step = ({ title, description, icon: Icon }: IStepProps) => {
  return (
    <View className="w-full flex-row gap-4">
      {Icon && <Icon color={colors.red.base} size={20} />}
      <View className="flex-1">
        <Text className="font-base font-semiBold text-gray-600">{title}</Text>
        <Text className="mt-3 font-regular text-gray-500 text-sm">
          {description}
        </Text>
      </View>
    </View>
  )
}
