import { colors } from '@/styles/colors'
import type { IconProps as TablerIconProps } from '@tabler/icons-react-native'
import clsx from 'clsx'
import type { ReactNode } from 'react'
import type React from 'react'
import {
  ActivityIndicator,
  Text,
  type TextProps,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native'

interface IButtonProps extends TouchableOpacityProps {
  children: ReactNode
  isLoading?: boolean
}

interface IIconProps extends TablerIconProps {
  icon: React.ComponentType<TablerIconProps>
}

const Button = ({
  children,
  isLoading = false,
  className,
  ...rest
}: IButtonProps) => {
  return (
    <TouchableOpacity
      className={clsx(
        'h-14 max-h-14 flex-row items-center justify-center gap-3 rounded-lg bg-green-base',
        className,
      )}
      activeOpacity={0.9}
      disabled={isLoading}
      {...rest}
    >
      {isLoading && <ActivityIndicator color={colors.gray[100]} size="small" />}
      {!isLoading && children}
    </TouchableOpacity>
  )
}

const Title = ({ children, className }: TextProps) => {
  return (
    <Text className={clsx('font-semiBold text-base text-gray-100', className)}>
      {children}
    </Text>
  )
}

const Icon = ({ icon: TablerIcon, ...rest }: IIconProps) => {
  return <TablerIcon color={colors.gray[100]} size={24} {...rest} />
}

Button.Title = Title
Button.Icon = Icon

export { Button }
