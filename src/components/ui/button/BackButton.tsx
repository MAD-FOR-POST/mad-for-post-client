import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactNode } from 'react'
import { useRouter } from 'next/router'

interface Props {
  onClick?: () => void
  extraStyles?: string // Additional CSS classes
}

export const BackButton: React.FC<Props> = ({ onClick, extraStyles }) => {
  const router = useRouter()
  const onButtonClicked = () => {
    router.back()
  }

  // Combine the default styles with extraStyles
  const buttonStyles = `bg-white w-[50px] h-[70px] rounded-full start-10 z-10 ${extraStyles}`

  return (
    <div className="w-full px-8">
      <button className={buttonStyles} onClick={onClick ? onClick : onButtonClicked}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
    </div>
  )
}
