import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactNode } from 'react'
import { useRouter } from 'next/router'

interface Props {
  onClick?: () => void
}

export const BackButton: React.FC<Props> = ({ onClick }) => {
  const router = useRouter()
  const onButtonClicked = () => {
    if (onClick) {
      onClick()
      return
    }
    router.back()
  }

  return (
    <button className="bg-white py-9 px-7  rounded-full absolute start-10" onClick={onButtonClicked}>
      <FontAwesomeIcon icon={faChevronLeft} size="2x" />
    </button>
  )
}
