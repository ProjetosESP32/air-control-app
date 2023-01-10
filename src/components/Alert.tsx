import FeatherIcons from '@expo/vector-icons/Feather'
import { Alert as NBAlert, HStack, IAlertProps, Icon, IconButton, Slide, Text, VStack } from 'native-base'
import React, { FC } from 'react'

export interface AlertData {
  title: string
  description?: string
  status?: IAlertProps['status']
}

export interface AlertProps extends AlertData {
  isOpen: boolean
  onClose?: () => void
}

export const Alert: FC<AlertProps> = ({ title, description, status, isOpen, onClose }) => (
  <Slide in={isOpen} placement='top'>
    <NBAlert status={status}>
      <VStack safeAreaTop space={2} flexShrink={1} w='100%'>
        <HStack flexShrink={1} space={2} alignItems='center' justifyContent='space-between'>
          <HStack flexShrink={1} space={2} alignItems='center'>
            <NBAlert.Icon />
            <Text fontSize='md' fontWeight='medium' color='coolGray.800'>
              {title}
            </Text>
          </HStack>
          <IconButton
            variant='unstyled'
            _focus={{
              borderWidth: 0,
            }}
            icon={<Icon as={FeatherIcons} name='x' color='coolGray.600' />}
            onPress={onClose}
          />
        </HStack>
        <Text pl='6' color='coolGray.600'>
          {description}
        </Text>
      </VStack>
    </NBAlert>
  </Slide>
)
