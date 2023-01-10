import { Box, KeyboardAvoidingView } from 'native-base'
import React, { ComponentType, FC } from 'react'
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native'

export function withKeyboardAvoidingView<P extends JSX.IntrinsicAttributes>(Component: ComponentType<P>) {
  const ComponentWithKeyboardAvoidingView: FC<P> = props => (
    <KeyboardAvoidingView flex={1} behavior={Platform.select({ ios: 'padding' })}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Box flex={1}>
          <Component {...props} />
        </Box>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )

  return ComponentWithKeyboardAvoidingView
}
