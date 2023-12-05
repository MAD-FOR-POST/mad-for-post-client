import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactNode } from 'react'

interface Props {
  onClick?: () => void
  children?: React.ReactNode
}

export const ConfirmButton: React.FC<Props> = ({ children, onClick }) => {
  return (
    <div onClick={onClick} className={'flex items-center justify-center relative min-h-[96px] rounded-full cursor-pointer'} style={{ backgroundColor: '#303841' }}>
      <FontAwesomeIcon className={'absolute right-[36px] text-white'} icon={faChevronRight} size="2x" />
      <span className={'text-white font-bold text-[22px]'}>{children}</span>
    </div>
  )
}
