import { useState, useEffect, useRef, useCallback, ChangeEvent } from 'react'
import { BackButton } from '@/components/ui/button/BackButton'
import { useRecoilState, useRecoilValue } from 'recoil'
import { gptResultsAtom, promptDetail, promptSelection, userInputImagesAtom, userInputTextsAtom } from '@/stores/UserInfoAtom'
import Image from 'next/image'
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion'
import ChevronRightAnimated from '@/components/ui/icon/ChevronRightAnimated'
import { ISnsItem } from '@/interfaces/post/ISnsItem'
import Layout from '@/components/layout'
import { NextButton } from '@/components/ui/button/NextButton'
import axios from 'axios'

import { CopySuccessModal } from '@/components/ui/modal/CopySuccessModal'
import { FloatingButton } from '@/components/ui/button/FloatingButton'
import { useMutation } from 'react-query'
import { postService } from '@/services/PostService'

import { FileWithPath, useDropzone } from 'react-dropzone'

const SNSList: ISnsItem[] = [
  {
    title: 'instagram',
    image: '/images/SNS/InstagramIcon.png',
    link: '/edit',
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
  const [selectedImagesArray, setSelectedImagesArray] = useRecoilState(userInputImagesAtom)
  const savedDetail = useRecoilValue(promptDetail)
  const promptOption = useRecoilValue(promptSelection)

  const myComponentRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const [currentWidth, setCurrentWidth] = useState(0)

  const newX = useTransform(x, [0, currentWidth - 100], [0, 1])
  const [visible, setVisible] = useState(0)
  const [clickedSNS, setClickedSNS] = useState(SNSList[0].title)
  const [back, setBack] = useState(false)

  const constraintsRef = useRef(null)

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

  const [modify, setModify] = useState(false) //'텍스트수정'버튼 눌렀을때 구분하기 위해서
  const [modifySuccess, setModifySuccess] = useState(false) //수정한 부분 '저장'버튼 눌렀을때 알기위해
  const [showButton, setShowButton] = useState(false)
  const [modifyContent, setModifyContent] = useState(gptResults)
  const [copySuccess, setCopySuccess] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState(false)
  const [swipe, setSwipe] = useState(false)

  const { mutate: generatePostMutate, isLoading: gptLoading, error: gptDataFetchError, data: gptTextResult } = useMutation(postService.generatePost)
  const userInput = useRecoilValue(userInputTextsAtom)

  const [imgWidth, setImgWidth] = useState(0)

  const { mutate: uploadPostMutate, isLoading: isUploadLoading, error: uploadError, data: uploadData } = useMutation(postService.uploadPost)

  //텍스트 수정 파트
  useEffect(() => {
    if (modifySuccess) {
      //저장 버튼 눌렀을때 리코일로 변경사항 저장
      setGptResults(modifyContent)
      setShowButton(true)
      const timeoutId = setTimeout(() => {
        setShowButton(false)
        setModifySuccess(false)
      }, 3000)
      return () => clearTimeout(timeoutId)
    }
  }, [modifySuccess])
  const copyToClipboard = () => {
    const textToCopy = modifyContent || ''

    // // clipboard API O
    try {
      setCopySuccess(true)
      navigator.clipboard.writeText(textToCopy).then(() => {})
    } catch (err) {
      const textarea = document.createElement('textarea')
      textarea.value = textToCopy
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)

      console.error('Clipboard copy failed:', err)
    }
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
      generatePostMutate({
        keywords: `${promptOption.prompt} 목적으로 ${savedDetail} 에 대해 작성해줘`,
        description: '.',
      })
    } catch (error) {
      console.error(error)
      throw error // Rethrow the error for further handling if needed
    }
  }

  const onRegenerateClick = () => {
    !gptLoading && generatePostWithReactQuery()
  }

  const handleImageLoad = (event: any) => {
    setImgWidth(event.target.width)
  }

  const onSelectArea = () => {
    const text = document.getElementById('text')
  }

  const onImageChanged = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.files) return

    const file = event?.target?.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImagesArray((prevStringArray) => [...prevStringArray, reader.result as string])
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    if (gptTextResult) {
      setModifyContent(gptTextResult)
      setGptResults(gptTextResult)
    }
  }, [gptLoading])

  useEffect(() => {
    if (myComponentRef.current) {
      const componentWidth = myComponentRef.current.offsetWidth
      setCurrentWidth(componentWidth)
    }
  }, [])

  useEffect(() => {
    newX.onChange(() => {
      if (newX.get() > 0.8) {
        setSwipe(true)
      } else {
        setSwipe(false)
      }
    })
  }, [x])

  useEffect(() => {
    if (swipe) {
      // const currentDate = new Date()

      const uploadPost = async () => {
        await uploadPostMutate({
          images: selectedImagesArray,
          description: modifyContent,
        })
      }

      uploadPost()
      setDownloadSuccess(true)
    }
  }, [swipe])

  useEffect(() => {
    console.log(selectedImagesArray)
  }, [selectedImagesArray])
  return (
    <Layout>
      <div className={'flex flex-col  justify-front items-front bg-[#DDBCC5] w-full max-w-[428px] h-full pt-9  relative '}>
        <div className="flex w-full items-center justify-between px-5">
          <BackButton />
          <div className="text-4xl font-bold">Boom!</div>
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
          <input type="file" accept="image/*" className="hidden" id="imageInput" onChange={onImageChanged} />
          <div className="relative bg-white w-full h-full flex flex-col items-center  overflow-y-scroll hide-scrollbar px-8 overflow-hidden pb-[100px]">
            <div className="relative flex items-center justify-center min-w-full min-h-[50%] bg-gray-400 ">
              {selectedImagesArray && (
                <AnimatePresence custom={back}>
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
              <label htmlFor="imageInput" className="flex items-center justify-center text-8xl bg-gray-500 w-24 h-24 pt-4 rounded-2xl cursor-pointer">
                +
              </label>
            </div>

            {/* 이동 버튼 */}
            <div className=" flex w-full justify-end my-4">
              {/* <img src="/images/InstaEx.png" alt="샘플이미지" className="w-[364px]" /> */}

              <div className="flex justify-end w-full items-center ">
                <FloatingButton onClick={onRegenerateClick} text={gptLoading ? '재생성중...' : '글 재생성'} bgColor="#DFBFC7" />
              </div>
            </div>
            {visible !== selectedImagesArray?.length ? (
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
              <textarea className="w-full resize-none h-[500px]" value={modifyContent} id="text" onChange={(e) => setModifyContent(e.target.value)} />
            </div>
          </div>
        </div>
        {/* 슬라이드 */}
        {/* <div ref={myComponentRef} className="w-full  absolute bottom-0 left-0 px-4 ">
          <motion.div className=" mb-[32px] relative flex justify-center rounded-full items-center bg-[#303841] h-[80px] w-full" ref={constraintsRef}>
            <div className="text-white animate-blink text-[14px]">오른쪽으로 스와이프해서 업로드하기</div>
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
              <ChevronRightAnimated last={true} />
            </div>
          </motion.div>
        </div> */}
      </div>
    </Layout>
  )
}
