import { useState, useEffect, useRef } from 'react'
import { BackButton } from '@/components/ui/button/BackButton'
import { useRecoilState, useRecoilValue } from 'recoil'
import { gptResultsAtom, userInputTextsAtom } from '@/stores/UserInfoAtom'
import Image from 'next/image'
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion'
import ChevronRightAnimated from '@/components/ui/icon/ChevronRightAnimated'
import { ISnsItem } from '@/interfaces/post/ISnsItem'
import Layout from '@/components/layout'
import { ensureBase64DataUrlPrefix } from '@/utils/StringUtil'

const SNSList: ISnsItem[] = [
  {
    title: 'instagram',
    image: '/images/SNS/InstagramIcon.png',
    // link: 'https://www.instagram.com/',
  },
  {
    title: 'threads',
    image: '/images/SNS/ThreadsIcon.png',
    // link: 'https://www.instagram.com/',
  },
  {
    title: 'X',
    image: '/images/SNS/XIcon.png',
    // link: 'https://twitter.com/',
  },
  {
    title: 'wordpress',
    image: '/images/SNS/WIcon.png',
    // link: 'https://wordpress.com/ko/',
  },
  {
    title: 'brunchstory',
    image: '/images/SNS/BIcon.png',
    // link: 'https://brunch.co.kr/',
  },
  {
    title: 'blog',
    image: '/images/SNS/BlogIcon.png',
    // link: 'https://section.blog.naver.com/',
  },
]
const box = {
  entry: (back: boolean) => ({
    x: back ? -500 : 500,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  },
  exit: (back: boolean) => ({
    x: back ? 500 : -500,
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  }),
}

export default function ResultPage() {
  const gptResults = useRecoilValue(gptResultsAtom)
  const myComponentRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const [visible, setVisible] = useState(0)
  const [clickedSNS, setClickedSNS] = useState(SNSList[0].title)
  const [back, setBack] = useState(false)
  const [isBackgroundClicked, setIsBackgroundClicked] = useState(false)
  const constraintsRef = useRef(null)

  const onNextImgClick = async () => {
    await setBack(false)

    setVisible((prev) => (prev === gptResults.image?.length ? gptResults.image.length : prev + 1))
  }
  const onPrevImgClick = () => {
    setBack(true)
    setVisible((prev) => (prev === 0 ? 0 : prev - 1))
  }
  const onSNSClick = (current: string) => {
    setClickedSNS(current)
  }

  return (
    <Layout>
      <div className={'flex flex-col  justify-front items-front bg-[#DDBCC5] w-full max-w-[428px] h-full pt-9  relative '}>
        <BackButton extraStyles="absolute" />
        <div className="h-1/3">
          <div className={'text-center text-[#262A2F] text-[38px] font-bold '}>Boom!</div>
          <ul className={'flex flex-row flex-wrap mt-3 justify-center gap-2 w-[80%] m-auto'}>
            {SNSList.map(({ title, image, link }) => (
              <li key={title} className={`mx-[7px] my-[8px] transition-all ${clickedSNS === title ? 'rounded-3xl shadow-lg scale-110' : ''}`} onClick={() => onSNSClick(title)}>
                <a href={link}>
                  <Image src={image ?? ''} alt={title ?? ''} width={70} height={70} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className=" flex flex-col h-2/3  bottom-0 w-full ">
          <img src="/images/FormBackgroundTop100.png" className={'relative top-[7px]'} />
          <div className="relative bg-white w-full h-full flex flex-col items-center  overflow-y-scroll hide-scrollbar px-8 overflow-hidden pb-[100px]">
            <div className="relative min-w-full min-h-full bg-black">
              {gptResults.image && (
                <AnimatePresence custom={back}>
                  {gptResults.image.map((imgBase64Data, index) =>
                    index === visible ? (
                      <motion.img
                        key={imgBase64Data}
                        src={ensureBase64DataUrlPrefix(imgBase64Data)}
                        custom={back}
                        variants={box}
                        initial="entry"
                        animate="center"
                        exit="exit"
                        alt="샘플이미지"
                        className="w-full h-full object-contain absolute "
                        style={{ objectPosition: '50% 50%' }} // Center the image within the container
                      />
                    ) : null,
                  )}
                </AnimatePresence>
              )}
            </div>

            {/* 글 */}
            <img src="/images/InstaEx.png" alt="샘플이미지" className="w-[364px]" />
            {visible + 1 !== gptResults.image?.length ? (
              <div onClick={onNextImgClick} className="absolute top-44 right-10 w-[25px] h-[25px] bg-white opacity-75  flex justify-center items-center rounded-full">
                {'>'}
              </div>
            ) : (
              <></>
            )}
            {visible !== 0 ? (
              <div onClick={onPrevImgClick} className="absolute top-44 left-10 w-[25px] h-[25px] bg-white opacity-75 flex justify-center items-center rounded-full">
                {'<'}
              </div>
            ) : (
              <></>
            )}

            <div className="bg-white mb-[12px]">
              <span>{gptResults.text}</span>
            </div>
          </div>
        </div>

        {/* 슬라이드 */}
        <div ref={myComponentRef} className="w-full  absolute bottom-0 left-0 px-3 ">
          <motion.div className=" mb-[32px] relative flex justify-center rounded-full items-center bg-[#303841] h-[80px] w-full" ref={constraintsRef}>
            <div className="text-white">
              Baam! <br /> Lets uploaded
            </div>
            <motion.div
              drag="x"
              style={{
                x,
                backgroundImage: 'url("/images/Baam.png")',
                backgroundSize: '100%',
                backgroundPosition: 'top',
                transform: 'scale(1.0)',
              }}
              className="absolute  flex justify-center items-center h-[70px] w-[70px]  rounded-full bg-white left-1 cursor-pointer"
              dragConstraints={constraintsRef}
              dragSnapToOrigin
            ></motion.div>
            <div className="absolute  right-[20px]">
              <ChevronRightAnimated />
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}
