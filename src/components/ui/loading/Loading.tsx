import { AnimatePresence } from 'framer-motion'
import { BackButton } from '../button/BackButton'
import Typewriter from 'typewriter-effect'

function Loading({ setIsLoading }: any) {
  const loadingTextSplitted = ['게시물에 활용할 ai 생성 이미지를 만드는 중이에요', '거의 다 되었으니 3초만 더 기다려주세요']

  return (
    <AnimatePresence>
      <div className="overflow-hidden flex flex-col justify-between items-center  bg-[#DADDBC] w-full max-w-[428px] h-full pt-9 relative">
        {/* <div className="flex w-full items-center justify-between px-5">
          <BackButton
            onClick={() => {
              setIsLoading(false)
            }}
          />
        </div> */}

        <div className="flex  flex-col font-poppins text-4xl w-[220px] h-full   text-center  justify-center font-bold  ">
          <Typewriter
            options={{
              strings: loadingTextSplitted,
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
    </AnimatePresence>
  )
}

export default Loading
