import React, { ChangeEvent, KeyboardEvent, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

export const TitleText: React.FC<Props> = ({ children }) => {
  return <span className={'font-bold text-[38px]'}>{children}</span>
}
