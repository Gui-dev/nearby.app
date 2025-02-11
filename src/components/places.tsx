import { colors } from '@/styles/colors'
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { router } from 'expo-router'
import { useRef } from 'react'
import { Text, useWindowDimensions } from 'react-native'
import { type IPlaceProps, Place } from './place'

interface IPlacesProps {
  data: IPlaceProps[]
}

export const Places = ({ data }: IPlacesProps) => {
  const dimensions = useWindowDimensions()
  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = {
    min: 278,
    max: dimensions.height - 128,
  }

  const handleNavigateToMarket = (id: string) => {
    router.navigate(`/market/${id}`)
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[snapPoints.min, snapPoints.max]}
      handleIndicatorStyle={{
        backgroundColor: colors.gray[300],
        height: 4,
        width: 80,
      }}
      backgroundStyle={{
        backgroundColor: colors.gray[100],
      }}
      enableOverDrag={false}
    >
      <BottomSheetFlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <Place
              place={item}
              onPress={() => handleNavigateToMarket(item.id)}
            />
          )
        }}
        contentContainerClassName="gap-3 p-4 pb-24"
        ListHeaderComponent={() => {
          return (
            <Text className="mb-4 font-regular text-base text-gray-600">
              Explore Locais perto de você
            </Text>
          )
        }}
        showsVerticalScrollIndicator={false}
      />
    </BottomSheet>
  )
}
