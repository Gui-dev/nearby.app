import * as Location from 'expo-location'
import { useEffect, useState } from 'react'
import { Alert, Text, View } from 'react-native'
import MapView, { Callout, Marker } from 'react-native-maps'

import locationImage from '@/assets/location.png'
import pinImage from '@/assets/pin.png'
import { Categories, type ICategoryProps } from '@/components/categories'
import { Loading } from '@/components/loading'
import type { IPlaceProps } from '@/components/place'
import { Places } from '@/components/places'
import { api } from '@/lib/api'
import { router } from 'expo-router'

interface IMarketsProps extends IPlaceProps {
  latitude: number
  longitude: number
}

const Home = () => {
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const [categories, setCategories] = useState<ICategoryProps[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [markets, setMarkets] = useState<IMarketsProps[]>([])

  const currentLocation = {
    latitude: -23.561187293883442,
    longitude: -46.656451388116494,
  }

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories')
      setCategories(data)
      setSelectedCategory(data[0].id)
    } catch (error) {
      console.log(error)
      Alert.alert('Categorias', 'Não foi possível carregar as categorias')
    } finally {
      setIsLoadingCategories(false)
    }
  }

  const fetchMarkets = async () => {
    try {
      if (!selectedCategory) {
        return
      }
      const { data } = await api.get(`/markets/category/${selectedCategory}`)
      setMarkets(data)
    } catch (error) {
      Alert.alert('Locais', 'Não foi possível carregar os lugares')
    }
  }

  const getCurrentLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync()
      if (granted) {
        const location = await Location.getCurrentPositionAsync()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleNavigateToMarket = (id: string) => {
    router.navigate(`/market/${id}`)
  }

  useEffect(() => {
    getCurrentLocation()
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchMarkets()
  }, [selectedCategory])

  if (isLoadingCategories) {
    return <Loading />
  }

  return (
    <View className="flex-1">
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectedCategory={setSelectedCategory}
      />
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          identifier="current"
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          image={locationImage}
        />
        {markets.map(item => {
          return (
            <Marker
              key={item.id}
              identifier={item.id}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              image={pinImage}
              style={{ flex: 1 }}
            >
              <Callout
                className="flex-1"
                onPress={() => handleNavigateToMarket(item.id)}
              >
                <View style={{ flex: 1, height: 300 }}>
                  <Text className="font-medium text-gray-600 text-sm">
                    {item.name}
                  </Text>
                  <Text className="font-regular text-gray-600 text-xs">
                    {item.address}
                  </Text>
                </View>
              </Callout>
            </Marker>
          )
        })}
      </MapView>
      <Places data={markets} />
    </View>
  )
}

export default Home
