import {
  FormControl,
  IFormControlErrorMessageProps,
  IFormControlLabelProps,
  IFormControlProps,
  IInputProps,
  Input as NBInput,
  WarningOutlineIcon,
} from 'native-base'
import React, { FC } from 'react'

interface InputError {
  message: string
}

export interface BaseInputProps extends IInputProps {
  label: string
  isSubmitting?: boolean
  error?: InputError | null
  formControlProps?: IFormControlProps
  formControlLabelProps?: IFormControlLabelProps
  formControlErrorMessageProps?: IFormControlErrorMessageProps
}

export const BaseInput: FC<BaseInputProps> = ({
  label,
  error,
  isSubmitting,
  formControlProps,
  formControlLabelProps,
  formControlErrorMessageProps,
  ...props
}) => (
  <FormControl {...formControlProps} isInvalid={!!error} isDisabled={isSubmitting}>
    <FormControl.Label {...formControlLabelProps}>{label}</FormControl.Label>
    <NBInput {...props} />
    {error ? (
      <FormControl.ErrorMessage {...formControlErrorMessageProps} leftIcon={<WarningOutlineIcon />}>
        {error.message}
      </FormControl.ErrorMessage>
    ) : null}
  </FormControl>
)
