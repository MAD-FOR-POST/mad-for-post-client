// TailwindExample.tsx
import { useRouter } from 'next/router'
import { BackButton } from '@/components/ui/button/BackButton'
import { NextButton } from '@/components/ui/button/NextButton'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Layout from '@/components/layout'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { userInputImages } from '@/stores/UserAtom'
import { printLog } from '@/utils/LogUtil'
import { motion, AnimatePresence } from 'framer-motion'

export default function TailwindExample() {
  const router = useRouter()
  const [selectedImagesArray, setSelectedImagesArray] = useRecoilState(userInputImages)
  const [isLoading, setIsLoading] = useState(false)

  const onImageChange = (event: any) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        // setSelectedImage(reader.result as string)
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
  useEffect(() => {
    printLog(selectedImagesArray)
  }, [selectedImagesArray])

  return (
    <Layout>
      {!isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="overflow-hidden flex flex-col justify-between items-center  bg-B5D9D9 w-full max-w-[428px] h-full pt-9 relative"
        >
          <BackButton />
          <div className="font-poppins text-4xl w-[266px] text-center  font-bold ">Do you have any pictures?</div>
          <form
            className="relative grid grid-cols-3 gap-10 w-full h-96  px-10 pt-20 overflow-auto"
            style={{
              backgroundImage: 'url("/images/FormBackground.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'top',
              transform: 'scale(1.1)',
            }}
          >
            <input type="file" accept="image/*" className="hidden" id="imageInput" onChange={onImageChange} />

            {selectedImagesArray.map((imgUrl, index) => (
              <div key={`${index}${imgUrl}`} className="relative">
                <img key={index} src={imgUrl} alt="Selected" className="w-full h-full object-cover rounded-3xl  max-w-[100px] max-h-[100px]" />
                <span className="absolute top-0 right-2 bg-white p-1 rounded-full w-6 h-6 flex justify-center items-center cursor-pointer" onClick={() => onDeleteImage(index)}>
                  <FontAwesomeIcon icon={faXmark} />
                </span>
              </div>
            ))}
            {selectedImagesArray.length! < 3 && (
              <label htmlFor="imageInput" className="bg-white w-full  z-10 rounded-3xl max-w-[100px] max-h-[100px] flex justify-center items-center cursor-pointer">
                <span className="text-slate-300 text-sm w-3/5 text-center">Add Picture</span>
              </label>
            )}
          </form>
          <NextButton onClick={() => setIsLoading(true)}>Skip and generate</NextButton>
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
            <div className="flex  flex-col font-poppins text-4xl w-[220px] h-full  text-center mt-[256px] font-bold  ">
              <span className="mb-10"> Magic is happening at the moment</span>
              <span> if you close, the magic will stop and need to start again</span>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </Layout>
  )
}
