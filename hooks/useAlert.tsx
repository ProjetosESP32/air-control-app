import React, { createContext, FC, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { Alert, AlertData } from '../components/Alert'

interface IAlertContext {
  alert: (alertData: AlertData, timeoutTime?: number) => void
}

const AlertContext = createContext<IAlertContext | null>(null)

interface AlertProviderProps {
  children: ReactNode
}

export const AlertProvider: FC<AlertProviderProps> = ({ children }) => {
  const [alertData, setAlertData] = useState<AlertData | null>(null)
  const [timeoutTime, setTimeoutTime] = useState(5000)

  const alert = useCallback((alertData: AlertData, timeoutTime = 5000) => {
    setAlertData(alertData)
    setTimeoutTime(timeoutTime)
  }, [])

  useEffect(() => {
    if (alertData) {
      const timeoutId = setTimeout(() => {
        setAlertData(null)
      }, timeoutTime)

      return () => clearTimeout(timeoutId)
    }
  }, [alertData, timeoutTime])

  return (
    <AlertContext.Provider value={{ alert }}>
      {alertData ? <Alert {...alertData} isOpen={!!alertData} onClose={() => setAlertData(null)} /> : null}
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
