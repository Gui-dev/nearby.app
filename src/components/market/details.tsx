import { IconMapPin, IconPhone, IconTicket } from '@tabler/icons-react-native'
import { Text, View } from 'react-native'
import { Info } from './info'

export interface IProps {
  name: string
  description: string
  address: string
  phone: string
  coupons: number
  rules: {
    id: string
    description: string
  }[]
}

export interface IDetailsProps {
  data: IProps
}

export const Details = ({ data }: IDetailsProps) => {
  return (
    <View className="flex-1 rounded-s-2xl border-t-2 bg-gray-100 p-8 pb-0">
      <Text className="font-bold text-2xl text-gray-600">{data.name}</Text>
      <Text className="mt-3 mb-8 font-regular text-base text-gray-500 leading-5">
        {data.description}
      </Text>

      <View className="mb-4 w-full border-b border-b-gray-200 pb-4">
        <Text className="mb-3 font-medium text-gray-500 text-sm">
          Informações
        </Text>

        <Info
          icon={IconTicket}
          description={`${data.coupons} cupons disponíveis`}
        />
        <Info icon={IconMapPin} description={data.address} />
        <Info icon={IconPhone} description={data.phone} />
      </View>

      <View className="mb-4 w-full border-b border-b-gray-200 pb-4">
        <Text className="mb-3 font-medium text-gray-500 text-sm">
          Regulamento
        </Text>
        {data.rules.map(rule => {
          return <Text key={rule.id}>{`\u2022 ${rule.description}`}</Text>
        })}
      </View>
    </View>
  )
}
