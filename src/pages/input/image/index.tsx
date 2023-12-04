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

export default function TailwindExample() {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedImagesArray, setSelectedImagesArray] = useRecoilState(userInputImages)

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
      {/* <div className="overflow-hidden flex flex-col justify-between items-center bg-white w-full max-w-[428px] h-full pt-9 relative"> */}

      <div className="overflow-hidden flex flex-col justify-between items-center  bg-B5D9D9 w-full max-w-[428px] h-full pt-9 relative">
        <BackButton
          onClick={() => {
            router.back()
          }}
        />
        <div className="font-poppins text-4xl w-[266px] text-center mt-[256px] font-bold ">Do you have any pictures?</div>
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
          {/* {selectedImage ? <img src={selectedImage} alt="Selected" className="w-full h-full object-cover rounded-3xl  max-w-[100px] max-h-[100px]" /> : <></>}
          {selectedImage ? <img src={selectedImage} alt="Selected" className="w-full h-full object-cover rounded-3xl  max-w-[100px] max-h-[100px]" /> : <></>} */}
          {selectedImagesArray.map((imgUrl, index) => (
            <div key={`${index}${imgUrl}`} className="relative">
              <img key={index} src={imgUrl} alt="Selected" className="w-full h-full object-cover rounded-3xl  max-w-[100px] max-h-[100px]" />
              <span className="absolute top-0 right-2 bg-white p-1 rounded-full w-6 h-6 flex justify-center items-center cursor-pointer" onClick={() => onDeleteImage(index)}>
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </div>
          ))}
          <label htmlFor="imageInput" className="bg-white w-full  z-10 rounded-3xl max-w-[100px] max-h-[100px] flex justify-center items-center cursor-pointer">
            {selectedImagesArray.length < 3 ? <span className="text-slate-300 text-sm w-3/5 text-center">Add Picture</span> : <></>}
          </label>
        </form>
        <NextButton>Skip and generate</NextButton>
      </div>
    </Layout>
  )
}
