import { Categories, type ICategoryProps } from '@/components/categories'

import { Loading } from '@/components/loading'
import { api } from '@/lib/api'
import { useEffect, useState } from 'react'
import { Alert, View } from 'react-native'

const Home = () => {
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const [categories, setCategories] = useState<ICategoryProps[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')

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

  useEffect(() => {
    fetchCategories()
  }, [])

  if (isLoadingCategories) {
    return <Loading />
  }

  return (
    <View className="">
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectedCategory={setSelectedCategory}
      />
    </View>
  )
}

export default Home
