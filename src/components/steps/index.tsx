import { IconMapPin, IconQrcode, IconTicket } from '@tabler/icons-react-native'
import { Text, View } from 'react-native'
import { Step } from './step'

export const Steps = () => {
  return (
    <View className="flex-1 gap-6">
      <Text className="font-regular text-base text-gray-500">
        Veja como funciona!
      </Text>

      <Step
        title="Encontre estabelecimentos"
        description="Veja locais perto de você que são parceiros nearby"
        icon={IconMapPin}
      />

      <Step
        title="Ative o cupom com QR Code"
        description="Escaneie o código no estabelecimento para usar o benefício"
        icon={IconQrcode}
      />

      <Step
        title="Garanta as vantagens perto de você"
        description="Ative cupons onde estiver, em diferentes tipos de estabelecimentos"
        icon={IconTicket}
      />
    </View>
  )
}
