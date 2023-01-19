import { Heading } from 'native-base'
import React, { FC } from 'react'

interface HeaderTitleProps {
  children: string
}

export const HeaderTitle: FC<HeaderTitleProps> = ({ children }) => <Heading>{children}</Heading>
