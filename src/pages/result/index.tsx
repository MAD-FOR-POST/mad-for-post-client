import { useState, useEffect, useRef, useCallback } from 'react'
import { BackButton } from '@/components/ui/button/BackButton'
import { useRecoilState, useRecoilValue } from 'recoil'
import { gptResultsAtom, userInputImagesAtom, userInputTextsAtom } from '@/stores/UserInfoAtom'
import Image from 'next/image'
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion'
import ChevronRightAnimated from '@/components/ui/icon/ChevronRightAnimated'
import { ISnsItem } from '@/interfaces/post/ISnsItem'
import Layout from '@/components/layout'
import { NextButton } from '@/components/ui/button/NextButton'
import axios from 'axios'
import { EditButton } from '@/components/ui/button/EditButton'
import { CopySuccessModal } from '@/components/ui/modal/CopySuccessModal'
import { FloatingButton } from '@/components/ui/button/FloatingButton'
import { useMutation } from 'react-query'
import { postService } from '@/services/PostService'

const SNSList: ISnsItem[] = [
  {
    title: 'instagram',
    image: '/images/SNS/InstagramIcon.png',
    link: 'https://www.instagram.com/',
  },
  // {
  //   title: 'threads',
  //   image: '/images/SNS/ThreadsIcon.png',
  //   // link: 'https://www.instagram.com/',
  // },
  // {
  //   title: 'X',
  //   image: '/images/SNS/XIcon.png',
  //   // link: 'https://twitter.com/',
  // },
  // {
  //   title: 'wordpress',
  //   image: '/images/SNS/WIcon.png',
  //   // link: 'https://wordpress.com/ko/',
  // },
  // {
  //   title: 'brunchstory',
  //   image: '/images/SNS/BIcon.png',
  //   // link: 'https://brunch.co.kr/',
  // },
  // {
  //   title: 'blog',
  //   image: '/images/SNS/BlogIcon.png',
  //   // link: 'https://section.blog.naver.com/',
  // },
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
  // const gptResults = useRecoilValue(gptResultsAtom)
  const [gptResults, setGptResults] = useRecoilState(gptResultsAtom)
  const selectedImagesArray = useRecoilValue(userInputImagesAtom)

  const myComponentRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const [currentWidth, setCurrentWidth] = useState(0)

  const newX = useTransform(x, [0, currentWidth - 100], [0, 1])
  const [visible, setVisible] = useState(0)
  const [clickedSNS, setClickedSNS] = useState(SNSList[0].title)
  const [back, setBack] = useState(false)

  const constraintsRef = useRef(null)

  const [modify, setModify] = useState(false) //'텍스트수정'버튼 눌렀을때 구분하기 위해서
  const [modifySuccess, setModifySuccess] = useState(false) //수정한 부분 '저장'버튼 눌렀을때 알기위해
  const [showButton, setShowButton] = useState(false)
  const [modifyContent, setModifyContent] = useState(gptResults.text)
  const [copySuccess, setCopySuccess] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState(false)
  const [swipe, setSwipe] = useState(false)

  const { mutate: generatePostMutate, isLoading: gptLoading, error: gptDataFetchError, data: gptTextResult } = useMutation(postService.generatePost)
  const userInput = useRecoilValue(userInputTextsAtom)

  const [imgWidth, setImgWidth] = useState(0)

  // console.log('이거 뭐냐', selectedImagesArray) // 최종 선택 이미지들

  //텍스트 수정 파트
  useEffect(() => {
    if (modifySuccess) {
      //저장 버튼 눌렀을때 리코일로 변경사항 저장
      setGptResults((prevGptResults) => ({
        ...prevGptResults,
        text: modifyContent,
      }))
      setShowButton(true)
      // const timeoutId = setTimeout(() => {
      //   setShowButton(false)
      //   setModifySuccess(false)
      // }, 100000)
      // return () => clearTimeout(timeoutId)
    }
  }, [modifySuccess])

  const copyToClipboard = () => {
    const textToCopy = modifyContent || '' // 복사하고 싶은 내용을 지정하세요

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        console.log('클립보드에 복사되었습니다.')
        setCopySuccess(true)
      })
      .catch((error) => {
        console.error('클립보드 복사 실패:', error)
      })
  }
  const onNextImgClick = async () => {
    await setBack(false)

    setVisible((prev) => (prev === selectedImagesArray?.length ? selectedImagesArray.length : prev + 1))
  }
  const onPrevImgClick = () => {
    setBack(true)
    setVisible((prev) => (prev === 0 ? 0 : prev - 1))
  }
  const onSNSClick = (current: string) => {
    setClickedSNS(current)
  }

  const onImgDownload = async (url: string, index: number, time: string) => {
    await axios
      .get(url, { responseType: 'blob' })
      .then((response) => {
        const imageUrl = URL.createObjectURL(response.data)
        // Now you can use imageUrl as the source for an image tag, or save it, etc.
        const link = document.createElement('a')
        link.href = imageUrl
        link.download = `${time}_${index}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
      .catch((error: any) => {
        console.error(error)
      })
  }

  const generatePostWithReactQuery = async () => {
    try {
      const response = await generatePostMutate({
        keywords: userInput.keywords.toString(),
        description: userInput.detail ? userInput.detail : '.',
      })
      return response // Assuming you want to return the response to the caller
    } catch (error) {
      console.error(error)
      throw error // Rethrow the error for further handling if needed
    }
  }

  const onRegenerateClick = () => {
    !gptLoading && generatePostWithReactQuery()
  }

  const handleImageLoad = (event: any) => {
    console.log(event.target.width)
    setImgWidth(event.target.width)
  }

  // useEffect(() => {
  //   copySuccess &&
  //     setTimeout(() => {
  //       setCopySuccess(false)
  //     }, 5000)
  // }, [copySuccess])

  useEffect(() => {
    if (gptTextResult) {
      setModifyContent(gptTextResult)
      setGptResults((prevGptResults) => ({
        ...prevGptResults,
        text: gptTextResult,
      }))
    }
  }, [gptLoading])

  useEffect(() => {
    if (myComponentRef.current) {
      const componentWidth = myComponentRef.current.offsetWidth
      setCurrentWidth(componentWidth)
    }
  }, [])

  useEffect(() => {
    console.log('x', newX)
    newX.onChange(() => {
      if (newX.get() > 0.9) {
        setSwipe(true)
      }
    })
  }, [x])

  useEffect(() => {
    if (swipe) {
      const currentDate = new Date()

      // Get Current Time
      const year = currentDate.getFullYear()
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0') // Months are zero-based
      const day = currentDate.getDate().toString().padStart(2, '0')
      const hours = currentDate.getHours().toString().padStart(2, '0')
      const minutes = currentDate.getMinutes().toString().padStart(2, '0')
      const seconds = currentDate.getSeconds().toString().padStart(2, '0')
      const formattedTime = `${year}${month}${day}${hours}${minutes}${seconds}`

      copyToClipboard()
      setDownloadSuccess(true)
      selectedImagesArray.forEach((url, index) => {
        onImgDownload(url, index, formattedTime)
        // console.log(index)
      })
    }
  }, [swipe])

  useEffect(() => {
    console.log(imgWidth)
  }, [imgWidth])
  return (
    <Layout>
      <div className={'flex flex-col  justify-front items-front bg-[#DDBCC5] w-full max-w-[428px] h-full pt-9  relative '}>
        <div className="flex w-full items-center justify-between px-5">
          <BackButton />
          {modify ? <div className="text-4xl font-bold">텍스트 수정 중</div> : <div className="text-4xl font-bold">Boom!</div>}
          <div>
            <ul className={'flex flex-row flex-wrap mt-3 justify-center gap-2 w-[80%] m-auto'}>
              {SNSList.map(({ title, image, link }) => (
                <a key={title} className={` transition-all ${clickedSNS === title ? 'rounded-3xl shadow-lg scale-110' : ''}`} href={link}>
                  <Image src={image ?? ''} alt={title ?? ''} width={60} height={60} />
                </a>
              ))}
            </ul>
          </div>
        </div>

        <div className=" flex flex-col  w-full h-full overflow-scroll">
          <img src="/images/FormBackgroundTop100.png" className={'relative top-[7px]'} />
          <div className="relative bg-white w-full h-full flex flex-col items-center  overflow-y-scroll hide-scrollbar px-8 overflow-hidden pb-[100px]">
            <div className="relative min-w-full min-h-[70%] text-white">
              {selectedImagesArray && (
                <AnimatePresence custom={back}>
                  {downloadSuccess && (
                    <div className={` h-full	w-full  bg-[#000000]/50 absolute z-10 flex flex-col justify-center items-center `}>
                      <img src="/images/check-square.png" className="w-[40%]" />
                      <div className=" font-bold text-[22px] text-center">
                        사진 전체
                        <br />
                        다운로드 완료!
                      </div>
                    </div>
                  )}
                  {selectedImagesArray.map((imgBase64Data, index) =>
                    index === visible ? (
                      <div key={index} className=" flex flex-col w-full h-full absolute top-0">
                        <motion.img
                          src={imgBase64Data}
                          custom={back}
                          variants={box}
                          initial="entry"
                          animate="center"
                          exit="exit"
                          alt="샘플이미지"
                          className="w-full h-full object-contain  z-1 top-0 absolute bg-black"
                          style={{ objectPosition: '50% 50%' }} // Center the image within the container
                          onLoad={handleImageLoad}
                        />
                      </div>
                    ) : null,
                  )}
                </AnimatePresence>
              )}
            </div>

            {/* 이동 버튼 */}
            <div className=" flex w-full justify-end my-4">
              {/* <img src="/images/InstaEx.png" alt="샘플이미지" className="w-[364px]" /> */}
              {!modify && (
                <div className="flex justify-between w-full items-center">
                  <div className="absoute z-20 flex justify-between  px-2">
                    <FloatingButton onClick={onRegenerateClick} text={gptLoading ? 'Generating...' : 'Regenerate'} bgColor="#DFBFC7" />
                  </div>
                  <div onClick={() => setModify(true)} className="text-[#116AEF] text-[16px]  cursor-pointer w-fit">
                    텍스트 수정
                  </div>
                </div>
              )}
            </div>
            {visible + 1 !== selectedImagesArray?.length ? (
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

            <div className="bg-white mb-[12px] w-full flex-1">
              {modify ? (
                <textarea className="w-full resize-y h-[500px]" value={modifyContent} onChange={(e) => setModifyContent(e.target.value)} />
              ) : (
                <div className="relative">
                  {showButton && (
                    <div className="absolute translate-x-[130%] top-[25%] flex text-[22px] bg-[#5B5B5B] w-[104px] h-[53px] rounded-[60px] items-center justify-center text-white">
                      저장!
                    </div>
                  )}
                  {copySuccess && <CopySuccessModal link={SNSList[0].link} />}
                  <span dangerouslySetInnerHTML={{ __html: (modifyContent ?? '').replace(/\n/g, '<br />') }} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 슬라이드 */}
        {modify ? (
          <div className="flex justify-center bg-red-700">
            <NextButton
              onClick={() => {
                setModify(false)
                setModifySuccess(true)
              }}
            >
              저장
            </NextButton>
          </div>
        ) : (
          <div ref={myComponentRef} className="w-full  absolute bottom-0 left-0 px-3 ">
            <motion.div className=" mb-[32px] relative flex justify-center rounded-full items-center bg-[#303841] h-[80px] w-full" ref={constraintsRef}>
              <div className="text-white animate-blink">
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
        )}
      </div>
    </Layout>
  )
}
