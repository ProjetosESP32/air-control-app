import React, { createContext, FC, useCallback, useContext, useReducer } from 'react'
import { AlertDialog, AlertDialogProps } from '../components/AlertDialog'

type AlertData = Omit<AlertDialogProps, 'isOpen' | 'onClose'>

interface IAlertDialogContext {
  dialog: (data: AlertData) => void
}

const AlertDialogContext = createContext<IAlertDialogContext | null>(null)

interface AlertDialogProviderProps {
  children: JSX.Element
}

type State = Omit<AlertDialogProps, 'onClose'>

type Action =
  | {
      type: 'open'
      data: Omit<State, 'isOpen'>
    }
  | {
      type: 'close'
    }

const reducer = (_: State, action: Action): State => {
  if (action.type === 'close') {
    return { title: '', isOpen: false, description: '' }
  }

  if (action.type === 'open') {
    return { ...action.data, isOpen: true }
  }

  throw new Error('unknown action')
}

export const AlertDialogProvider: FC<AlertDialogProviderProps> = ({ children }) => {
  const [state, update] = useReducer(reducer, { title: '', description: '', isOpen: false })

  const dialog = useCallback((data: AlertData) => {
    update({ type: 'open', data })
  }, [])

  const closeDialog = () => {
    update({ type: 'close' })
  }

  return (
    <AlertDialogContext.Provider value={{ dialog }}>
      <AlertDialog {...state} onClose={closeDialog} />
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
