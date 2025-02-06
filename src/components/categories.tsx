import { FlatList } from 'react-native'
import { Category } from './category'

export interface ICategoryProps {
  id: string
  name: string
}

export interface ICategoriesProps {
  categories: ICategoryProps[]
  selectedCategory: string
  onSelectedCategory: (id: string) => void
}

export const Categories = ({
  categories,
  selectedCategory,
  onSelectedCategory,
}: ICategoriesProps) => {
  return (
    <FlatList
      data={categories}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Category
          iconId={item.id}
          name={item.name}
          onPress={() => onSelectedCategory(item.id)}
          isSelected={item.id === selectedCategory}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-2 px-6"
      style={{
        maxHeight: 36,
        position: 'absolute',
        zIndex: 1,
        top: 64,
      }}
    />
  )
}
