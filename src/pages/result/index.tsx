import { useRouter } from 'next/router'
import Layout from '@/components/layout'
import { useState,useEffect, useRef,} from 'react'
import { NextButton } from '@/components/ui/button/NextButton'
import { BackButton } from '@/components/ui/button/BackButton'
import { KeywordInput } from '@/components/ui/keyword/KeywordInput'
import { KeywordList } from '@/components/ui/keyword/KeywordList'
import { printLog } from '@/utils/LogUtil'
import { AppRoutes } from '@/common/Constants'
import { useRecoilState } from 'recoil'
import { userInputTexts } from '@/stores/UserAtom'
import Image from 'next/image'
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion'
import ChevronRightAnimated from '@/components/ui/icon/ChevronRightAnimated'

export default function ResultPage() {
    const SNSList=[
        {
            title:'instagram',
            image:'/images/SNS/InstagramIcon.png',
            link:'https://www.instagram.com/'
        },
        {
            title:'threads',
            image:'/images/SNS/ThreadsIcon.png',
            link:'https://www.instagram.com/'
        },
        {
            title:'X',
            image:'/images/SNS/XIcon.png' ,
            link:'https://twitter.com/'
        },
        {
            title:'wordpress',
            image:'/images/SNS/WIcon.png' ,
            link:'https://wordpress.com/ko/'
        },
        {
            title:'brunchstory',
            image:'/images/SNS/BIcon.png' ,
            link:'https://brunch.co.kr/'
        },
        {
            title:'blog',
            image:'/images/SNS/BlogIcon.png' ,
            link:'https://section.blog.naver.com/'
        }
    ]
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
                        {SNSList.map(({title,image,link})=>(
                            <li key={title} className={'mx-[7px] my-[8px]'}>
                                <a href={link}>
                                    <Image src={image} alt={title} width={70} height={70} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* <div className='pt-[63px] w-full flex flex-col items-center' style={{backgroundImage: 'url("/images/FormBackgroundLong.png")',backgroundSize: '110%',backgroundPosition: 'top',transform: 'scale(1.0)',overflowY:'scroll', height: '80%'}} > */}
                <div className='pt-[63px]' style={{backgroundImage: 'url("/images/FormBackgroundLong.png")',backgroundSize: '110%',backgroundPosition: 'top',transform: 'scale(1.0)'}} >
                    <div className=' w-full flex flex-col items-center h-[500px] overflow-y-scroll'>

                    <img src="https://via.placeholder.com/364" alt="샘플이미지" className='w-[364px] h-[364px] '/>
                    {/* 글 */}
                    <img src="/images/InstaEx.png" alt="샘플이미지" className='w-[364px]'/>
                    <div className='w-[90%] bg-white p-[8px] mb-[12px]'>
                        잔흔커버 콤보눈썹🖤
                        <br/>
                        회색+붉은 잔흔이 약간 남아있어
                        앞머리는 결작업, 뒷부분은 면작업으로
                        <br/>
                        세련된 쉐입으로 다시 재정비 완벽커버💗
                        <br/>
                        끝나자마자 너무 만족해주시구
                        실제로 보신 주변 지인분들 소개만 5명🫢
                        <br/>
                        절대 짱구눈썹 ❌
                        바로 일상생활가능하도록 예쁘게 🩷
                        <br/>
                        고객님 얼굴형 맞춤 디자인으로
                        요청사항 반영하여 시술합니다🤙🏻🤙🏻
                        
                    </div>

                    {/* 슬라이드 */}
                    {/* <div ref={myComponentRef} className='mx-[32px] mb-[32px]'> */}
                    <div ref={myComponentRef} className='w-full'>
                        <motion.div 
                            className="mx-[32px] mb-[32px] relative flex justify-center rounded-full items-center bg-[#303841] h-[80px]" 
                            ref={constraintsRef}
                            >
                            <div className="text-white">Baam! <br/> Lets uploaded</div>
                            <motion.div
                                drag="x"
                                style={{ 
                                    x ,
                                    backgroundImage: 'url("/images/Baam.png")',
                                    backgroundSize: '100%',
                                    backgroundPosition: 'top',
                                    transform: 'scale(1.0)',
                                }}
                                className="absolute  flex justify-center items-center h-[70px] w-[70px]  rounded-full bg-white left-1 cursor-pointer"
                                dragConstraints={constraintsRef}
                                dragSnapToOrigin
                                >
                            </motion.div>
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
