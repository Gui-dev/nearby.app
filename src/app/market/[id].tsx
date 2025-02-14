import { CameraView, useCameraPermissions } from 'expo-camera'
import { Redirect, router, useLocalSearchParams } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { Alert, Modal, ScrollView, StatusBar, View } from 'react-native'

import { Button } from '@/components/button'
import { Loading } from '@/components/loading'
import { Coupon } from '@/components/market/coupon'
import { Cover } from '@/components/market/cover'
import { Details, type IProps } from '@/components/market/details'
import { api } from '@/lib/api'
import type { AxiosError } from 'axios'

type ISearchParams = {
  id: string
}

interface IMarketProps extends IProps {
  cover: string
}

const Market = () => {
  const params = useLocalSearchParams<ISearchParams>()
  const [_, requestPermission] = useCameraPermissions()
  const [market, setMarket] = useState<IMarketProps>()
  const [coupon, setCoupon] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false)
  const [isCouponFetching, setIsCouponFetching] = useState(false)
  const qrLock = useRef(false)

  const fetchMarket = async () => {
    try {
      const { data } = await api.get(`/markets/${params.id}`)
      setMarket(data)
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Não foi possível carregar os dados', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenCamera = async () => {
    try {
      const { granted } = await requestPermission()

      if (!granted) {
        return Alert.alert(
          'Permissão',
          'Você precisa habilitar o uso da câmera',
        )
      }
      qrLock.current = false
      setIsVisibleCameraModal(true)
    } catch (error) {
      console.log(error)
      Alert.alert('Permissão', 'Não foi possível habilitar o uso da câmera')
    }
  }

  const handleCloseCamera = () => {
    try {
      setIsVisibleCameraModal(false)
    } catch (error) {
      console.log(error)
    }
  }

  const getCoupon = async (id: string) => {
    try {
      setIsCouponFetching(true)
      const { data } = await api.patch(`/coupons/${id}`)
      Alert.alert('Cupom', data.coupon)
      setCoupon(data.coupon)
    } catch (error) {
      const err = error as AxiosError
      console.log(err)
      Alert.alert('Erro', 'Não foi possível utilizar o cupom')
    } finally {
      setIsCouponFetching(false)
    }
  }

  const handleUseCoupon = async (id: string) => {
    setIsVisibleCameraModal(false)
    Alert.alert(
      'Cupom',
      'Não é possível reutilizar um cupom resgatado. Deseja realmente resgatar o cupom?',
      [
        {
          style: 'cancel',
          text: 'Não',
        },
        {
          text: 'Sim',
          onPress: () => getCoupon(id),
        },
      ],
    )
  }

  useEffect(() => {
    fetchMarket()
  }, [params.id, coupon])

  if (isLoading) {
    return <Loading />
  }

  if (!market) {
    return <Redirect href="/home" />
  }

  console.log(params.id)

  return (
    <View className="flex-1">
      <StatusBar
        barStyle="light-content"
        hidden={isVisibleCameraModal}
        translucent
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover uri={market.cover} />
        <Details data={market} />
        {coupon && <Coupon code={coupon} />}
      </ScrollView>

      <View className="flex-1 p-8">
        <Button onPress={handleOpenCamera}>
          <Button.Title>Ler QRCode</Button.Title>
        </Button>
      </View>

      <Modal className="flex-1" visible={isVisibleCameraModal}>
        <CameraView
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true
              setTimeout(() => handleUseCoupon(data), 500)
            }
          }}
          style={{ flex: 1 }}
        />
        <View className="absolute right-8 bottom-8 left-8">
          <Button onPress={handleCloseCamera} isLoading={isCouponFetching}>
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}

export default Market
