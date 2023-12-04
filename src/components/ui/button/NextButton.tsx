import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactNode } from 'react'

interface Props {
  onClick?: () => void
  children?: React.ReactNode
}

export const NextButton: React.FC<Props> = ({ children, onClick }) => {
  return (
    <button
      className="flex justify-center items-center text-white py-5 px-7  rounded-full absolute bottom-5 text-xl font-bold max-w-[380px] w-custom bg-[#303841] hover:shadow-xl transition-shadow"
      onClick={onClick}
    >
      <span className="w-3/4"> {children}</span>
      <span className="">
        <FontAwesomeIcon icon={faChevronRight} />
      </span>
    </button>
  )
}
