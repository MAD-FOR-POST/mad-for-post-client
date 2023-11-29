import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactNode } from 'react'

interface Props {
  onClick?: () => void
}

export const BackButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button className="bg-white py-9 px-7  rounded-full absolute start-10" onClick={onClick}>
      <FontAwesomeIcon icon={faChevronLeft} size="2x" />
    </button>
  )
}
