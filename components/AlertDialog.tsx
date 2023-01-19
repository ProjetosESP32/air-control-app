import { AlertDialog as NBAlertDialog, Button, Center, ITheme } from 'native-base'
import React, { FC, useRef } from 'react'

interface Action {
  color: keyof ITheme['colors']
  title: string
  doAction: () => void
}

export interface AlertDialogProps {
  isOpen: boolean
  title: string
  description: string
  actions?: Action[]
  cancelTitle?: string
  cancelColor?: string
  cancelAction?: () => void
  onClose: () => void
}

export const AlertDialog: FC<AlertDialogProps> = ({
  isOpen,
  title,
  description,
  cancelTitle = 'Cancelar',
  cancelColor,
  actions,
  cancelAction,
  onClose,
}) => {
  const cancelRef = useRef(null)

  const handleCancel = () => {
    cancelAction?.()
    onClose()
  }

  const makeActionHandler = (doAction: () => void) => () => {
    doAction()
    onClose()
  }

  const actionButtons = [
    <Button key={cancelTitle} variant='unstyled' colorScheme={cancelColor} onPress={handleCancel} ref={cancelRef}>
      {cancelTitle}
    </Button>,
    ...actions?.map(({ title, doAction, color }) => (
      <Button key={title} colorScheme={color} onPress={makeActionHandler(doAction)}>
        {title}
      </Button>
    )) ?? [],
  ]

  return (
    <Center>
      <NBAlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
        <NBAlertDialog.Content>
          <NBAlertDialog.CloseButton />
          <NBAlertDialog.Header>{title}</NBAlertDialog.Header>
          <NBAlertDialog.Body>{description}</NBAlertDialog.Body>
          <NBAlertDialog.Footer>
            <Button.Group space={2}>{actionButtons}</Button.Group>
          </NBAlertDialog.Footer>
        </NBAlertDialog.Content>
      </NBAlertDialog>
    </Center>
  )
}
