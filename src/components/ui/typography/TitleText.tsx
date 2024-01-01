import React, { ReactNode } from 'react'

interface Props {
  children?: ReactNode
  color?: string // New color prop
}

export const TitleText: React.FC<Props> = ({ children, color }) => {
  const textStyle = {
    color: color || 'black', // Use the provided color or default to 'black'
  }

  return (
    <span className={`font-bold text-[38px] text-center h-1/3 flex justify-center items-center`} style={textStyle}>
      {children}
    </span>
  )
}
