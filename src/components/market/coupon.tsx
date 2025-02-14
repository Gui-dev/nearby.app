import { colors } from '@/styles/colors'
import { IconTicket } from '@tabler/icons-react-native'
import { Text } from 'react-native'
import { View } from 'react-native'

interface ICouponProps {
  code: string
}

export const Coupon = ({ code }: ICouponProps) => {
  return (
    <View className="px-8">
      <Text className="mb-3 font-medium text-gray-500 text-sm">
        Utilize esse cupom
      </Text>

      <View className="flex-row items-center gap-3 rounded-lg bg-green-soft px-2">
        <IconTicket color={colors.green.light} size={24} />
        <Text className="font-semiBold text-base text-gray-600 uppercase">
          {code}
        </Text>
      </View>
    </View>
  )
}
