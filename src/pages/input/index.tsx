// TailwindExample.tsx
import { useRouter } from 'next/router'
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { AppRoutes } from '@/common/Constants'
import ChevronRightAnimated from '@/components/ui/icon/ChevronRightAnimated'
import Layout from '@/components/layout'
import { useResetRecoilState } from 'recoil'
import { userInputTextsAtom } from '@/stores/UserInfoAtom'

export default function TailwindExample() {
  const router = useRouter()
  const [currentWidth, setCurrentWidth] = useState(0) //to set max width depending on current width size
  const [routerPushed, setRouterPushed] = useState(false)

  const x = useMotionValue(0)
  const myComponentRef = useRef<HTMLDivElement>(null)

  const newX = useTransform(x, [0, currentWidth - 100], [0, 1])
  const constraintsRef = useRef(null)

  const resetInputText = useResetRecoilState(userInputTextsAtom)
  useEffect(() => {
    resetInputText()
  }, [])

  useEffect(() => {
    newX.onChange(() => {
      if (newX.get() > 0.6 && !routerPushed) {
        setRouterPushed(true)
        router.push(AppRoutes.inputTextKeyword)
      }
    })
  }, [x])

  useEffect(() => {
    if (myComponentRef.current) {
      const componentWidth = myComponentRef.current.offsetWidth
      setCurrentWidth(componentWidth)
    }
  }, [])

  return (
    <Layout>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="overflow-hidden flex flex-col justify-between items-center bg-white w-full max-w-[428px] h-full pt-9 relative"
        >
          <div className=" flex flex-col font-poppins text-4xl w-[266px] text-center  font-bold -rotate-[9deg]">
            {/* <img src="/images/SocialIcons.png" className="scale-[7]  transition ease-linear translate-x-[500px] animation-move-left   duration-[12000ms]   mb-[100px]" /> */}
            <div className="animate-slidein">
              <img src="/images/SocialIcons.png" className="scale-[8]  mb-[120px] " />
            </div>
            <div className="animate-slideout">
              <img src="/images/SocialIcons.png" className="scale-[8]  mb-[120px]  translate-x-[500px] " />
            </div>
            <div className="animate-slidein">
              <img src="/images/SocialIcons.png" className="scale-[8]  mb-[120px]  translate-x-[-700px]" />
            </div>
            <div className="animate-slideout">
              <img src="/images/SocialIcons.png" className="scale-[8]  mb-[120px] " />
            </div>
          </div>
          <div className="absolute  flex flex-col  justify-between  shadow-3xl w-full min-h-[320px] bg-white bottom-0 p-[24px] ">
            <div className="h-2/3 flex flex-col items-center">
              <div className="font-poppins text-4xl text-center font-bold">Let me just be efficient</div>
              <div className="text-center mt-[24px] text-gray-400  ">
                Generate SNS contents and boom!
                <br /> Upload done!
              </div>
            </div>
            <div ref={myComponentRef}>
              <motion.div className="relative flex justify-center rounded-full items-center bg-orange-pink h-[80px] bottom-0 " ref={constraintsRef}>
                <div className="text-white animate-blink">Start Experience</div>
                <motion.div
                  drag="x"
                  style={{ x }}
                  className="absolute  flex justify-center items-center h-[70px] w-[70px] z-10  rounded-full bg-white left-1 cursor-pointer"
                  dragConstraints={constraintsRef}
                  dragSnapToOrigin
                >
                  <ChevronRightAnimated />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </Layout>
  )
}
