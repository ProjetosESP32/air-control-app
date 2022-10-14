import { useIsRestoring } from '@tanstack/react-query'
import React, { FC, ReactNode } from 'react'

interface RestoringComponentProps {
  children: ReactNode
}

export const RestoringComponent: FC<RestoringComponentProps> = ({ children }) => {
  const isRestoring = useIsRestoring()

  if (isRestoring) return null

  return <>{children}</>
}
