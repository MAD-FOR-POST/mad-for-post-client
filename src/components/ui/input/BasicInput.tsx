import React from 'react'

// InputHTMLAttributes 타입을 확장하여 모든 표준 <input> 속성을 포함시킵니다.
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export const BasicInput: React.FC<Props> = (props) => {
  return (
    <input
      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
      {...props}
    />
  )
}
