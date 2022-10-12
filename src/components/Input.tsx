import React, { FC } from 'react'
import { Control, useController, UseControllerProps } from 'react-hook-form'
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native'
import { BaseInput, BaseInputProps } from './BaseInput'

export interface InputProps extends BaseInputProps, Omit<UseControllerProps, 'name' | 'defaultValue'> {
  name: string
  label: string
  defaultValue?: string
  control?: Control<any, any>
}

export const Input: FC<InputProps> = ({
  name,
  label,
  control,
  rules,
  defaultValue,
  shouldUnregister,
  onBlur: baseComponentOnBlur,
  ...props
}) => {
  const {
    field: { onBlur, value, onChange },
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({ name, control, rules, defaultValue, shouldUnregister })

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    baseComponentOnBlur?.(e)
    onBlur()
  }

  return (
    <BaseInput
      {...props}
      label={label}
      onBlur={handleBlur}
      isSubmitting={isSubmitting}
      value={value}
      onChangeText={onChange}
      error={error ? { message: 'Invalid', ...error } : null}
    />
  )
}
