import React, { ReactNode } from 'react'

interface Props {
  onClick?: () => void
  text: string
  children?: React.ReactNode
  bgColor?: string
}

export const FloatingButton: React.FC<Props> = ({ onClick, text, children, bgColor }) => {
  const color = bgColor ? `[${bgColor}]` : 'white'

  return (
    <button className={`bg-${color} rounded-full py-2 px-[19px] font-bold shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]`} onClick={onClick}>
      {text}
    </button>
  )
}
