import { useIsRestoring } from '@tanstack/react-query'
import { FC } from 'react'

interface RestoringComponentProps {
  children: JSX.Element
}

export const RestoringComponent: FC<RestoringComponentProps> = ({ children }) => {
  const isRestoring = useIsRestoring()

  if (isRestoring) return null

  return children
}
