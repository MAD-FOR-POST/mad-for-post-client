import React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export const BasicInput: React.FC<Props> = (props) => {
  return (
    <input
      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
      {...props}
    />
  )
}
