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
    router.back()
  }

  return (
    <div className="w-full px-[36px]">
      <button className="bg-white py-9 px-7  rounded-full  start-10 z-10" onClick={onClick ? onClick : onButtonClicked}>
        <FontAwesomeIcon icon={faChevronLeft} size="2x" />
      </button>
    </div>
  )
}
