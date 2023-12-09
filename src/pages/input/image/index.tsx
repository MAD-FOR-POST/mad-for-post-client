// TailwindExample.tsx
import { useRouter } from 'next/router'
import { BackButton } from '@/components/ui/button/BackButton'
import { NextButton } from '@/components/ui/button/NextButton'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChangeEvent, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { gptResultsAtom, userInputImagesAtom, userInputTextsAtom } from '@/stores/UserInfoAtom'
import { printLog } from '@/utils/LogUtil'
import { motion, AnimatePresence } from 'framer-motion'
import { postService } from '@/services/PostService'
import { AppRoutes } from '@/common/Constants'
import Layout from '@/components/layout'
import { TitleText } from '@/components/ui/typography/TitleText'
import Typewriter from 'typewriter-effect'
import { useMutation, useQuery } from 'react-query'

const fadeAnimation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function TailwindExample() {
  const router = useRouter()
  const [selectedImagesArray, setSelectedImagesArray] = useRecoilState(userInputImagesAtom)
  const [gptResults, setGPTResults] = useRecoilState(gptResultsAtom)
  const userInput = useRecoilValue(userInputTextsAtom)
  const [isLoading, setIsLoading] = useState(false)
  const { mutate: generatePostMutate, isLoading: gptLoading, error: gptDataFetchError, data: gptTextResult } = useMutation(postService.generatePost)
  const { mutate: generateImageMutate, isLoading: gptImgLoading, error: gptImgDataFetchError, data: gptImageResult } = useMutation(postService.generateImage)
  const loadingTextSplitted = gptLoading ? ['Magic is happening at the moment', 'if you close the magic will stop and need to start again'] : []

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

  const onDeleteImage = (index: number) => {
    // Copy the current array
    const newArray = [...selectedImagesArray]
    // Remove the image at the specified index
    newArray.splice(index, 1)
    // Update the Recoil state
    setSelectedImagesArray(newArray)
  }

  const generatePostWithReactQuery = async () => {
    generatePostMutate({
      keywords: userInput.keywords.toString(),
      description: userInput.detail ? userInput.detail : '.',
    })
    generateImageMutate({
      keywords: userInput.keywords.toString(),
      description: userInput.detail ? userInput.detail : '.',
    })
  }
  const onGPTGenerateButtonClicked = async () => {
    //keyword가 없는 경우 GPT 생성을 할 수 없으므로, 키워드 입력 페이지로 이동한다.
    if (userInput.keywords.length === 0) {
      router.replace(AppRoutes.inputText)
      alert('Please add keywords')
      return
    }
    setIsLoading(true)
    // Promises for text and image data

    try {
      // Wait for both promises to resolve
      generatePostWithReactQuery()

      // !gptLoading && router.push(AppRoutes.resultPage)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (gptTextResult) {
      setGPTResults({
        ...gptResults,
        text: gptTextResult,
        image: selectedImagesArray.length > 0 ? [...selectedImagesArray] : gptImageResult ? [gptImageResult] : [],
      })
      router.push(AppRoutes.resultPage)
    }
  }, [gptLoading, gptImgLoading])

  return (
    <Layout>
      {!gptLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="overflow-hidden flex flex-col justify-between items-center  bg-B5D9D9 w-full max-w-[428px] h-full pt-9 relative"
        >
          <BackButton />
          <TitleText>Do you have any pictures?</TitleText>
          <form
            className="relative grid grid-cols-3 gap-3 w-full h-[24rem]  px-[50px] pt-20 overflow-auto"
            style={{
              backgroundImage: 'url("/images/FormBackgroundLong.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'top',
              transform: 'scale(1.1)',
            }}
          >
            <input type="file" accept="image/*" className="hidden" id="imageInput" onChange={onImageChanged} />

            {selectedImagesArray.map((imgUrl, index) => (
              <motion.div key={`${index}${imgUrl}`} initial="hidden" animate="visible" exit="hidden" variants={fadeAnimation} transition={{ duration: 0.5 }} className="relative">
                <img key={index} src={imgUrl} alt="Selected" className="w-full h-full object-cover rounded-3xl  max-w-[100px] max-h-[100px]" />
                <span className="absolute top-0 right-0 bg-white p-1 rounded-full w-6 h-6 flex justify-center items-center cursor-pointer" onClick={() => onDeleteImage(index)}>
                  <FontAwesomeIcon icon={faXmark} />
                </span>
              </motion.div>
            ))}
            {selectedImagesArray.length! < 3 && (
              <label htmlFor="imageInput" className="bg-white w-full  z-10 rounded-3xl max-w-[100px] max-h-[100px] flex justify-center items-center cursor-pointer">
                <span className="text-slate-300 text-sm w-3/5 text-center">Add Picture</span>
              </label>
            )}
          </form>
          <NextButton onClick={onGPTGenerateButtonClicked}>Skip and generate</NextButton>
        </motion.div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="overflow-hidden flex flex-col justify-between items-center  bg-[#DADDBC] w-full max-w-[428px] h-full pt-9 relative"
          >
            <BackButton
              onClick={() => {
                setIsLoading(false)
              }}
            />
            <div className="flex  flex-col font-poppins text-4xl w-[220px] h-full   text-center  justify-center font-bold  ">
              <Typewriter
                options={{
                  strings: loadingTextSplitted,
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </Layout>
  )
}
