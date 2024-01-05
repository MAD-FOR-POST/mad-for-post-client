// TailwindExample.tsx
import { useRouter } from 'next/router'
import { BackButton } from '@/components/ui/button/BackButton'
import { NextButton } from '@/components/ui/button/NextButton'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
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
import { KeywordModal } from '@/components/ui/modal/KeywordModal'

import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd'

export default function TailwindExample() {
  const router = useRouter()
  const [selectedImagesArray, setSelectedImagesArray] = useRecoilState(userInputImagesAtom)
  const [gptResults, setGPTResults] = useRecoilState(gptResultsAtom)

  const userInput = useRecoilValue(userInputTextsAtom)
  const [isLoading, setIsLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [stageError, setStageError] = useState(false)
  const [maxImgError, setMaxImgError] = useState(false)
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
    //사용자가 선택한 이미지가 없는 경우: 텍스트만 기다린다.
    if (gptImageResults) {
      updateResultsAndNavigate([...gptImageResults])
      console.log(gptImageResults)
      setClickedImg(gptImageResults[0])
      setClickedImgIndex(0)
      setIsLoading(false)
      return
    }
  }, [gptImgLoading, gptImageResults])

  useEffect(() => {
    if (gptResults.image?.length === 0) {
      onGPTGenerateButtonClicked()
    }
  }, [gptResults])

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (destination?.droppableId === source.droppableId && destination.droppableId === 'selectedImages') {
      setSelectedImagesArray((oldArray) => {
        const selectedArrCopy = [...oldArray]
        selectedArrCopy.splice(source.index, 1)
        selectedArrCopy.splice(destination.index, 0, draggableId)
        return selectedArrCopy
      })
    } else if (destination?.droppableId === 'selectedImages') {
      if (selectedImagesArray.length === 10) return

      setSelectedImagesArray((oldArray) => {
        const selectedArrCopy = [...oldArray]
        selectedArrCopy.splice(destination.index, 0, draggableId)
        return selectedArrCopy
      })
    }
    setMaxImgError(false)
  }
  const onDragStart = () => {
    selectedImagesArray.length === 10 && setMaxImgError(true)
  }

  const onClickDone = () => {
    if (selectedImagesArray.length === 0) {
      setStageError(true)
      return
    }
    router.push(AppRoutes.resultPage)
  }

  useEffect(() => {
    setMaxImgError(false)
  }, [selectedImagesArray])
  return (
    <Layout>
      {!isLoading ? (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="overflow-hidden flex flex-col justify-between items-center  bg-[#A7E4E4] w-full max-w-[428px] h-full pt-9 relative"
          >
            <div className="flex w-full items-center justify-between px-5">
              <BackButton />
              <div className="text-4xl font-bold">Ta-da!</div>
              <div className="text-2xl cursor-pointer " onClick={() => setModalOpen(true)}>
                <FontAwesomeIcon icon={faCircleQuestion} />
              </div>
            </div>

            <div className=" h-1/2 w-full rounded-3xl flex flex-col justify-between items-center pb-4">
              <div className="relative w-full flex justify-center items-center p-4 font-bold">
                <Droppable droppableId="mainImage">
                  {(magic) => (
                    <div {...magic.droppableProps} ref={magic.innerRef} className=" flex items-center justify-center">
                      <div
                        className=" bg-[#D3F1F2] shadow-[inset_0px_0px_15px_5px_rgba(0,0,0,0.2)]

  min-w-[180px] min-h-[180px] w-2/5 rounded-[40px] flex justify-center items-center"
                      >
                        <span className="items-center absolute z-0  w-1/3 text-center text-red-600 text-sm  ">{maxImgError && `You can only select max 10 pictures`}</span>
                        {gptResults?.image?.map(
                          (image) =>
                            image === clickedImg && (
                              <Draggable draggableId={clickedImg} index={0}>
                                {(magic) => (
                                  <div {...magic.dragHandleProps} {...magic.draggableProps} ref={magic.innerRef} className="flex justify-center ">
                                    {!selectedImagesArray.includes(clickedImg) && (
                                      <img
                                        src={clickedImg}
                                        className={`min-w-[180px] min-h-[180px] cursor-pointer w-1/2 items-center rounded-[40px] z-0  border-red-500 ${maxImgError && 'border-4'}`}
                                      />
                                    )}
                                  </div>
                                )}
                              </Draggable>
                            ),
                        )}
                        {magic.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
                <div className=" bg-[#DFBFC7] p-2 px-5 rounded-full cursor-pointer absolute bottom-6 right-10 z-0" onClick={onGPTGenerateButtonClicked}>
                  Regenerate
                </div>
              </div>
              <div className="flex transition-all overflow-scroll  w-full px-4 gap-1">
                {gptResults?.image?.map((image, index) => (
                  <img
                    key={index}
                    src={image} // Make sure `image` contains the correct URL
                    className={` min-w-[65px] min-h-[65px] w-1/2 border-black  cursor-pointer  ${index === clickedImgIndex && ' mx-1'}`}
                    alt={`Image ${index}`}
                    onClick={() => onImageClick(image, index)}
                  />
                ))}
              </div>
            </div>

            <form
              className="relative flex flex-col w-full h-[20rem]  px-10  pt-12 "
              style={{
                backgroundImage: 'url("/images/FormBackgroundLong.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                width: `${window.innerWidth + 40 > 468 ? 468 : window.innerWidth + 40}px`,
              }}
            >
              <div className="font-bold mb-4">Stage</div>
              <input type="file" accept="image/*" className="hidden" id="imageInput" onChange={onImageChanged} />
              <Droppable droppableId="selectedImages" direction="horizontal">
                {(provided) => (
                  <div className="flex  gap-3  overflow-scroll" {...provided.droppableProps} ref={provided.innerRef}>
                    {selectedImagesArray.map((imgUrl, index) => (
                      <Draggable draggableId={imgUrl} index={index} key={`${index}${imgUrl}`}>
                        {(provided) => (
                          <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef} key={`${index}${imgUrl}`} className="relative">
                            <img key={index} src={imgUrl} alt="Selected" className=" object-cover rounded-3xl  max-w-[100px] max-h-[100px] min-w-[100px] min-h-[100px] " />
                            <span
                              className="absolute top-0 right-0 bg-white p-1 rounded-full w-6 h-6 flex justify-center items-center cursor-pointer"
                              onClick={() => onDeleteImage(index)}
                            >
                              <FontAwesomeIcon icon={faXmark} />
                            </span>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder} {/* Include the placeholder here */}
                    {selectedImagesArray.length! < 10 && (
                      <label
                        htmlFor="imageInput"
                        className="bg-white w-full   rounded-3xl max-w-[100px] max-h-[100px] min-w-[100px] min-h-[100px]  flex justify-center items-center cursor-pointer "
                      >
                        <span className="text-slate-300 text-sm w-full text-center ">Drag & Drop pictures here</span>
                      </label>
                    )}
                  </div>
                )}
              </Droppable>
              {stageError && <div className="text-center text-red-500 ">Please select at least 1 photo</div>}
            </form>
            <NextButton onClick={onClickDone}>Done</NextButton>
            {modalOpen && (
              <KeywordModal setKeywordModalOpen={setModalOpen} title="Help">
                <div className="border-b-2 pb-2">
                  <div className={'text-[14px] mb-5'}>
                    1. Drag the ai-generated image and place it on the stage below! Posts are generated in the order of the images that are staged.
                  </div>
                  <div className={'text-[14px]'}>2. Pressing the regenerate button will create 10 new images in 9 seconds, and the images on the stage will not disappear.</div>
                </div>
              </KeywordModal>
            )}
          </motion.div>
        </DragDropContext>
      ) : (
        <Loading setIsLoading={setIsLoading} />
      )}
    </Layout>
  )
}
