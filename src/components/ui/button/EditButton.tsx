import React, { ReactNode } from 'react'

interface Props {
  onClick?: () => void
  children?: React.ReactNode
}

export const EditButton: React.FC<Props> = ( {onClick}) => {
    return (
      <button
        className="bg-[#F4B7A8]  text-white font-bold  py-[12px] px-[28px] border rounded-[60px] relative top-[-400px] right-[-150px]"
        onClick={onClick}
      >
        Edit
      </button>
    )
  }

