import React, { createContext, FC, useCallback, useContext, useState } from 'react'
import { AlertDialog, AlertDialogProps } from '../components/AlertDialog'

type AlertData = Omit<AlertDialogProps, 'isOpen' | 'onClose'>

interface IAlertDialogContext {
  dialog: (data: AlertData) => void
}

const AlertDialogContext = createContext<IAlertDialogContext | null>(null)

interface AlertDialogProviderProps {
  children: JSX.Element
}

export const AlertDialogProvider: FC<AlertDialogProviderProps> = ({ children }) => {
  const [alertData, setAlertData] = useState<AlertData | null>(null)

  const dialog = useCallback((data: AlertData) => {
    setAlertData(data)
  }, [])

  const closeDialog = () => {
    setAlertData(null)
  }

  return (
    <AlertDialogContext.Provider value={{ dialog }}>
      <AlertDialog {...alertData!} isOpen={!!alertData} onClose={closeDialog} />
      {children}
    </AlertDialogContext.Provider>
  )
}

export const useAlertDialog = () => {
  const context = useContext(AlertDialogContext)

  if (!context) {
    throw new Error('useAlertDialog must be used within a AlertDialogProvider')
  }

  return context
}
