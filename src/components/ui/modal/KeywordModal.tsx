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
  const onButtonClick = () => {}
  return (
    <div className={'absolute top-0 w-full h-full flex justify-center items-center backdrop-blur-md z-50'}>
      <div className={'blur-none w-[95%] gap-4 border bg-white text-center flex flex-col justify-center rounded-[36px] py-5 z-20'}>
        <div className="flex justify-between items-center border-b-2 pb-2 px-5">
          <div className="flex w-full justify-between">
            <div>
              <FontAwesomeIcon icon={faCircleExclamation} />
              <span className="ml-2 font-semibold">{title}</span>
            </div>
            <div onClick={onOkClick} className="cursor-pointer">
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>
        </div>
        {children}
        <div className="px-5">
          <a
            href="https://open.kakao.com/o/gTUm3dSf"
            target="_blank"
            className="flex justify-center items-center w-full  text-white py-3 px-7  rounded-full  bottom-5 text-xl   bg-[#303841] hover:shadow-xl transition-shadow"
          >
            Join us now!
          </a>
        </div>
      </div>
    </div>
  )
}
