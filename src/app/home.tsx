import { Categories, type ICategoryProps } from '@/components/categories'

import { Loading } from '@/components/loading'
import type { IPlaceProps } from '@/components/place'
import { Places } from '@/components/places'
import { api } from '@/lib/api'
import { useEffect, useState } from 'react'
import { Alert, View } from 'react-native'

interface IMarketsProps extends IPlaceProps {}

const Home = () => {
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const [categories, setCategories] = useState<ICategoryProps[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [markets, setMarkets] = useState<IMarketsProps[]>([])

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

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchMarkets()
  }, [selectedCategory])

  if (isLoadingCategories) {
    return <Loading />
  }

  return (
    <View className="flex-1 bg-gray-700">
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectedCategory={setSelectedCategory}
      />
      <Places data={markets} />
    </View>
  )
}

export default Home
