import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactNode } from 'react'
import { useRouter } from 'next/router'

interface Props {
  onClick?: () => void
}

export const BackButtonTwo: React.FC<Props> = ({}) => {
  const router = useRouter()
  const onButtonClicked = () => {
    router.back()
  }

  return (
    <div className="w-[77.66px] h-[108px] bg-white rounded-[50px] flex items-center justify-center cursor-pointer" onClick={onButtonClicked}>
      <FontAwesomeIcon icon={faChevronLeft} size="2x" />
    </div>
  )
}
