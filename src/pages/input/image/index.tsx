// TailwindExample.tsx
import { useRouter } from 'next/router'
import { BackButton } from '@/components/ui/button/BackButton'
import { NextButton } from '@/components/ui/button/NextButton'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { gptResultsAtom, userInputImagesAtom, userInputTextsAtom } from '@/stores/UserInfoAtom'
import { printLog } from '@/utils/LogUtil'
import { motion, AnimatePresence } from 'framer-motion'
import { postService } from '@/services/PostService'
import { AppRoutes } from '@/common/Constants'
import Layout from '@/components/layout'

import { useMutation, useQuery } from 'react-query'
import Loading from '@/components/ui/loading/Loading'

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

  const { mutate: generateImageMutate, isLoading: gptImgLoading, error: gptImgDataFetchError, data: gptImageResults } = useMutation(postService.generateImages)

  const [clickedImg, setClickedImg] = useState(gptResults.image ? gptResults.image[0] : '')
  const [clickedImgIndex, setClickedImgIndex] = useState(0)

  const onDeleteImage = (index: number) => {
    const confirmed = confirm('Do you want to delete?')
    if (confirmed) {
      // Copy the current array
      const newArray = [...selectedImagesArray]
      // Remove the image at the specified index
      newArray.splice(index, 1)
      // Update the Recoil state
      setSelectedImagesArray(newArray)
    }
  }

  const generatePostWithReactQuery = async () => {
    try {
      const response = await generateImageMutate({
        keywords: userInput.keywords.toString(),
        description: userInput.detail ? userInput.detail : '.',
      })

      console.log(response)
      return response // Assuming you want to return the response to the caller
    } catch (error) {
      console.error(error)
      throw error // Rethrow the error for further handling if needed
    }
  }

  const onGPTGenerateButtonClicked = async () => {
    //keyword가 없는 경우 GPT 생성을 할 수 없으므로, 키워드 입력 페이지로 이동한다.
    if (userInput.keywords.length === 0) {
      router.replace(AppRoutes.inputTextKeyword)
      alert('Please add keywords')
      return
    }
    setIsLoading(true)
    // Promises for text and image data

    try {
      // Wait for both promises to resolve
      await generatePostWithReactQuery()
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const updateResultsAndNavigate = useCallback(
    (images: string[]) => {
      setGPTResults((prevResults) => ({
        ...prevResults,
        text: prevResults.text,
        image: images,
      }))
    },
    [setGPTResults],
  )

  const onImageClick = (imageUrl: string, index: number) => {
    setClickedImg(imageUrl)
    setClickedImgIndex(index)
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
    // console.log('result', gptResults?.image)

    //사용자가 선택한 이미지가 없는 경우: 텍스트만 기다린다.
    if (gptImageResults) {
      printLog('11111')
      updateResultsAndNavigate([...gptImageResults])
      console.log(gptImageResults)
      setClickedImg(gptImageResults[0])
      setClickedImgIndex(0)
      setIsLoading(false)
      return
    }

    // //사용자가 선택한 이미지가 1개이상 있는 경우: 텍스트만 기다린다.
    // if ( gptTextResult) {
    //   updateResultsAndNavigate([...selectedImagesArray])
    //   // router.push(AppRoutes.resultPage)
    //   return
    // }
  }, [gptImgLoading, gptImageResults])

  useEffect(() => {
    if (gptImageResults) {
    }
  }, [gptImageResults])

  return (
    <Layout>
      {!isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="overflow-hidden flex flex-col justify-between items-center  bg-B5D9D9 w-full max-w-[428px] h-full pt-9 relative"
        >
          <div className="flex w-full items-center justify-between px-5">
            <BackButton />
          </div>

          <div className="h-1/2 w-full bg-[#95BABA] rounded-3xl flex flex-col justify-between items-center pb-4">
            <div className=" w-full flex justify-between items-center p-4 font-bold">
              <div className="text-2xl ">AI Images</div>
              <div className="text-xl bg-[#5BAFC1] p-2 rounded-full cursor-pointer" onClick={onGPTGenerateButtonClicked}>
                Regenerate
              </div>
            </div>
            <img src={clickedImg} className="w-[200px] h-[200px] items-center" />
            <div className="flex items-center justify-center">
              {/* {gptResults.image && gptResults?.image?.map((image, index) => <div key={index} className="w-[40px] h-[40px] border-black border cursor-pointer"></div>)} */}
              {gptResults?.image?.map((image, index) => (
                <img
                  key={index}
                  src={image} // Make sure `image` contains the correct URL
                  className={`transition w-[40px] h-[40px] border-black border cursor-pointer ${index === clickedImgIndex && 'scale-125 '}`}
                  alt={`Image ${index}`}
                  onClick={() => onImageClick(image, index)}
                />
              ))}{' '}
            </div>
          </div>
          <form
            className="relative flex flex-col gap-3 w-full h-[20rem]  px-10  pt-12 overflow-auto"
            style={{
              backgroundImage: 'url("/images/FormBackgroundLong.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'top',
              transform: 'scale(1.1)',
            }}
          >
            <input type="file" accept="image/*" className="hidden" id="imageInput" onChange={onImageChanged} />
            <div className="flex  gap-3  h-full">
              {selectedImagesArray.map((imgUrl, index) => (
                <motion.div key={`${index}${imgUrl}`} initial="hidden" animate="visible" exit="hidden" variants={fadeAnimation} transition={{ duration: 0.5 }} className="relative">
                  <img key={index} src={imgUrl} alt="Selected" className=" object-cover rounded-3xl  max-w-[100px] max-h-[100px] min-w-[100px] min-h-[100px] " />
                  <span className="absolute top-0 right-0 bg-white p-1 rounded-full w-6 h-6 flex justify-center items-center cursor-pointer" onClick={() => onDeleteImage(index)}>
                    <FontAwesomeIcon icon={faXmark} />
                  </span>
                </motion.div>
              ))}
              {selectedImagesArray.length! < 10 && (
                <label
                  htmlFor="imageInput"
                  className="bg-white w-full  z-10 rounded-3xl max-w-[100px] max-h-[100px] min-w-[100px] min-h-[100px]  flex justify-center items-center cursor-pointer"
                >
                  <span className="text-slate-300 text-sm w-3/5 text-center">Add Picture</span>
                </label>
              )}
            </div>
          </form>
          <NextButton onClick={onGPTGenerateButtonClicked}>Skip and generate</NextButton>
        </motion.div>
      ) : (
        <Loading setIsLoading={setIsLoading} />
      )}
    </Layout>
  )
}
