import { colors } from '@/styles/colors'
import { IconTicket } from '@tabler/icons-react-native'
import {
  Image,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native'
import { View } from 'react-native'

export interface IPlaceProps {
  id: string
  name: string
  description: string
  coupons: number
  cover: string
  address: string
}

interface IPlaceRequest extends TouchableOpacityProps {
  place: IPlaceProps
}

export const Place = ({ place, ...rest }: IPlaceRequest) => {
  return (
    <TouchableOpacity
      className="h-[120px] w-full flex-1 flex-row items-center gap-4 rounded-xl border border-gray-200 bg-gray-100 p-6"
      {...rest}
    >
      <Image
        source={{ uri: place.cover }}
        className="h-[104px] w-[116px] rounded-lg bg-gray-200"
      />

      <View className="flex-1">
        <Text className="font-medium text-gray-600 text-sm">{place.name}</Text>
        <Text className="font-regular text-gray-600 text-xs" numberOfLines={2}>
          {place.description}
        </Text>
        <View className="mt-2 flex-row gap-2">
          <IconTicket color={colors.red.base} size={16} />
          <Text className="font-regular text-gray-400 text-xs">
            {place.coupons} cupons disponíveis
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
