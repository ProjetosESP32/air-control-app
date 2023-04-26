import React, { createContext, FC, ReactNode, useCallback, useContext, useEffect, useReducer } from 'react'
import { Alert, AlertData, AlertProps } from '../components/Alert'

interface IAlertContext {
  alert: (data: AlertData, timeout?: number) => void
}

const AlertContext = createContext<IAlertContext | null>(null)

interface AlertProviderProps {
  children: ReactNode
}

type State = Omit<AlertProps, 'onClose'> & { timeout: number }

type Action =
  | {
      type: 'open'
      data: Omit<State, 'isOpen' | 'timeout'>
      timeout?: number
    }
  | {
      type: 'close'
    }

const reducer = ({ timeout }: State, action: Action): State => {
  if (action.type === 'close') {
    return { isOpen: false, title: '', timeout }
  }

  if (action.type === 'open') {
    return { ...action.data, isOpen: true, timeout: action.timeout ?? timeout }
  }

  throw new Error('unknown action')
}

export const AlertProvider: FC<AlertProviderProps> = ({ children }) => {
  const [state, update] = useReducer(reducer, { isOpen: false, title: '', timeout: 5000 })

  const alert = useCallback((data: AlertData, timeout?: number) => {
    update({ type: 'open', data, timeout })
  }, [])

  const close = useCallback(() => {
    update({ type: 'close' })
  }, [])

  useEffect(() => {
    if (state.isOpen) {
      const timeoutId = setTimeout(close, state.timeout)

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [close, state.isOpen, state.timeout])

  return (
    <AlertContext.Provider value={{ alert }}>
      <Alert {...state} onClose={close} />
      {children}
    </AlertContext.Provider>
  )
}

export const useAlert = () => {
  const context = useContext(AlertContext)

  if (!context) {
    throw new Error('useAlert must be used within a AlertProvider')
  }

  return context
}
