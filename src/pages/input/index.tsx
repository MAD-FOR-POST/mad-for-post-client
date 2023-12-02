// TailwindExample.tsx
import { useRouter } from 'next/router'
import Layout from '@/components/layout'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

export default function TailwindExample() {
  const router = useRouter()
  const x = useMotionValue(0)
  const newX = useTransform(x, [0, 300], [0.1, 1])
  const constraintsRef = useRef(null)

  useEffect(() => {
    // x.onChange(() => console.log(x.get()))
    newX.onChange(() => console.log(newX.get()))
  }, [x])
  return (
    <Layout>
      <div className="overflow-hidden flex flex-col justify-between items-center rounded-[20px] bg-white w-full max-w-[512px] h-full pt-9 relative">
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
        <div className="absolute flex flex-col  justify-between bg-white w-full h-1/2 bottom-0 p-12 pt-28">
          <div className="h-2/3">
            <div className="font-poppins text-4xl  text-center font-bold ">Let me just be efficient</div>
            <div className="text-center mt-3 text-gray-400  ">
              Generate SNS contents and boom!
              <br /> Upload done!
            </div>
          </div>
          <motion.div className="relative flex justify-center rounded-full items-center bg-orange-pink h-[80px] bottom-0 " ref={constraintsRef}>
            <div className="text-white">Start Experience</div>
            <motion.div
              drag="x"
              style={{ x }}
              className="absolute  flex justify-center items-center h-[75px] w-[75px] p-4 rounded-full bg-white left-1"
              dragConstraints={constraintsRef}
              dragSnapToOrigin
            >
              <span className="text-gray-400 text-xl">{'>'}</span>
              <span className="text-gray-600 text-xl">{'>'}</span>
              <span className="text-gray-800 text-xl">{'>'}</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}
