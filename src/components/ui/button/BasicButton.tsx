import React, { ReactNode } from 'react'

interface Props {
  onClick?: () => void
  children?: React.ReactNode
}

export const BasicButton: React.FC<Props> = ({ children, onClick }) => {
  return (
    <button
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-fit"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
