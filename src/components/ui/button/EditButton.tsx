import React, { ReactNode } from 'react'

interface Props {
  onClick?: () => void
  children?: React.ReactNode
}

export const EditButton: React.FC<Props> = ({ onClick, children }) => {
  return (
    <button className="bg-[#F4B7A8]  text-black font-bold  min-w-[20px] min-h-[20px]  py-[12px] px-[12px]  rounded-[60px]   top-0 right-0  z-30 " onClick={onClick}>
      {children}
    </button>
  )
}
