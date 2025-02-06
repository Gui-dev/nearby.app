import { colors } from '@/styles/colors'
import { categoriesIcons } from '@/utils/categories-icons'
import clsx from 'clsx'
import { Pressable, type PressableProps, Text } from 'react-native'

export interface ICategoryProps extends PressableProps {
  iconId: string
  name: string
  isSelected?: boolean
}

export const Category = ({
  iconId,
  name,
  isSelected = false,
  className,
  ...rest
}: ICategoryProps) => {
  const Icon = categoriesIcons[iconId]

  return (
    <Pressable
      className={clsx(
        'h-9 flex-row items-center justify-center gap-3 rounded-lg border border-gray-300 bg-gray-100 px-3',
        { 'border-0 bg-green-base': isSelected },
        className,
      )}
      {...rest}
    >
      <Icon size={16} color={colors.gray[isSelected ? 100 : 400]} />
      <Text
        className={clsx('font-regular text-gray-500 text-sm', {
          'text-gray-50': isSelected,
        })}
      >
        {name}
      </Text>
    </Pressable>
  )
}
