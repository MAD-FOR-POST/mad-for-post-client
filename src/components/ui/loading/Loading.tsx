import { AnimatePresence } from 'framer-motion'
import { BackButton } from '../button/BackButton'
import Typewriter from 'typewriter-effect'

function Loading() {
  const loadingTextSplitted = ['게시물에 활용할<br/>ai 생성 이미지를<br/>만드는 중이에요', '결과물까지<br/>최대 20초 정도<br/>소요됩니다.']

  return (
    <AnimatePresence>
      <div className="overflow-hidden flex flex-col justify-between items-center  bg-[#DADDBC] w-full max-w-[428px] h-full pt-9 relative">
        <div className="flex  flex-col font-poppins text-4xl w-[300px] h-full   text-center  justify-center font-bold  ">
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
