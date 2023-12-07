import { useState, useEffect, useRef } from 'react'
import { BackButton } from '@/components/ui/button/BackButton'
import { useRecoilState, useRecoilValue } from 'recoil'
import { gptResultsAtom, userInputTextsAtom } from '@/stores/UserInfoAtom'
import Image from 'next/image'
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion'
import ChevronRightAnimated from '@/components/ui/icon/ChevronRightAnimated'
import { ISnsItem } from '@/interfaces/post/ISnsItem'
import Layout from '@/components/layout'

const SNSList: ISnsItem[] = [
  {
    title: 'instagram',
    image: '/images/SNS/InstagramIcon.png',
    link: 'https://www.instagram.com/',
  },
  {
    title: 'threads',
    image: '/images/SNS/ThreadsIcon.png',
    link: 'https://www.instagram.com/',
  },
  {
    title: 'X',
    image: '/images/SNS/XIcon.png',
    link: 'https://twitter.com/',
  },
  {
    title: 'wordpress',
    image: '/images/SNS/WIcon.png',
    link: 'https://wordpress.com/ko/',
  },
  {
    title: 'brunchstory',
    image: '/images/SNS/BIcon.png',
    link: 'https://brunch.co.kr/',
  },
  {
    title: 'blog',
    image: '/images/SNS/BlogIcon.png',
    link: 'https://section.blog.naver.com/',
  },
]

export default function ResultPage() {
  const gptResults = useRecoilValue(gptResultsAtom)

  const myComponentRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const [currentWidth, setCurrentWidth] = useState(0)

  const newX = useTransform(x, [0, currentWidth - 100], [0, 1])
  const constraintsRef = useRef(null)

  useEffect(() => {
    if (myComponentRef.current) {
      const componentWidth = myComponentRef.current.offsetWidth
      setCurrentWidth(componentWidth)
    }
  }, [])

  return (
    <Layout>
      <div className={'flex flex-col justify-between items-center bg-[#DDBCC5] w-full max-w-[428px] h-full pt-9 relative '}>
        <BackButton />
        <div>
          <div className={'text-center text-[#262A2F] text-[38px] font-bold '}>Boom!</div>
          <ul className={'flex flex-row flex-wrap justify-start w-[80%] m-auto'}>
            {SNSList.map(({ title, image, link }) => (
              <li key={title} className={'mx-[7px] my-[8px]'}>
                <a href={link}>
                  <Image src={image ?? ''} alt={title ?? ''} width={70} height={70} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* <div className='pt-[63px] w-full flex flex-col items-center' style={{backgroundImage: 'url("/images/FormBackgroundLong.png")',backgroundSize: '110%',backgroundPosition: 'top',transform: 'scale(1.0)',overflowY:'scroll', height: '80%'}} > */}
        <div
          className="pt-[63px]"
          style={{
            backgroundImage: 'url("/images/FormBackgroundLong.png")',
            backgroundSize: '110%',
            backgroundPosition: 'top',
            transform: 'scale(1.0)',
          }}
        >
          <div className=" w-full flex flex-col items-center h-[500px] overflow-y-scroll hide-scrollbar">
            <img src="https://via.placeholder.com/364" alt="샘플이미지" className="w-[364px] h-[364px] " />
            {/* 글 */}
            <img src="/images/InstaEx.png" alt="샘플이미지" className="w-[364px]" />
            <div className="w-[90%] bg-white p-[8px] mb-[12px]">
              <span>{gptResults.text}</span>
            </div>

            {/* 슬라이드 */}
            {/* <div ref={myComponentRef} className='mx-[32px] mb-[32px]'> */}
            <div ref={myComponentRef} className="w-full">
              <motion.div className="mx-[32px] mb-[32px] relative flex justify-center rounded-full items-center bg-[#303841] h-[80px]" ref={constraintsRef}>
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
        </div>
      </div>
    </Layout>
  )
}
