import React, { ChangeEvent, KeyboardEvent, ReactNode } from 'react'
import { NextButton } from '../button/NextButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faCircleInfo, faXmark } from '@fortawesome/free-solid-svg-icons'

interface KeywordModalProps {
  setKeywordModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  children: ReactNode
}

export const KeywordModal: React.FC<KeywordModalProps> = ({ setKeywordModalOpen, title, children }) => {
  const onOkClick = () => {
    setKeywordModalOpen(false)
  }
  return (
    <div className={'absolute top-0 w-full h-full flex justify-center items-center backdrop-blur-md'}>
      <div className={'blur-none w-[95%] gap-4 border bg-white text-center flex flex-col justify-center rounded-[36px] p-5 z-20'}>
        <div className="flex justify-between items-center border-b-2 pb-2">
          <div>
            <FontAwesomeIcon icon={faCircleExclamation} />
            <span className="ml-2">{title}</span>
          </div>
          <div onClick={onOkClick} className="cursor-pointer">
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        {children}
        <div className="flex justify-center items-center text-white py-5 px-7  rounded-full  bottom-5 text-xl font-bold max-w-[380px]  bg-[#303841] hover:shadow-xl transition-shadow">
          Join us now!
        </div>
      </div>
    </div>
  )
}
