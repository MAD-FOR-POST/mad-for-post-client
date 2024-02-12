// TailwindExample.tsx
import { useRouter } from 'next/router'
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { AppRoutes } from '@/common/Constants'
import ChevronRightAnimated from '@/components/ui/icon/ChevronRightAnimated'
import Layout from '@/components/layout'
import { useResetRecoilState } from 'recoil'
import { gptResultsAtom, userInputImagesAtom, userInputTextsAtom } from '@/stores/UserInfoAtom'
import { inputText } from '@/text'

import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { authService } from '@/services/AuthService'
import { cookieService } from '@/services/CookieService'

interface MyJwtPayload {
  email: string
  // Add other custom properties that you expect in your JWT payload
}

export default function TailwindExample() {
  const router = useRouter()
  const [currentWidth, setCurrentWidth] = useState(0) //to set max width depending on current width size

  const { kr: titleKr } = inputText.title

  const resetInputText = useResetRecoilState(userInputTextsAtom)
  const resetInputImages = useResetRecoilState(userInputImagesAtom)
  useEffect(() => {
    resetInputText()
    resetInputImages()
  }, [])

  const login = async (email: string) => {
    try {
      const response = await authService.requestLogin(email)
      if (response.accessToken && response.refreshToken) {
        cookieService.setAccessToken(response.accessToken)
        cookieService.setRefreshToken(response.refreshToken)
        router.push(AppRoutes.inputTextSelect)
      }
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  const decodeToken = (token: string) => {
    const result = jwtDecode<MyJwtPayload>(token)
    return result.email
  }

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
              <div className="font-poppins text-4xl text-center font-bold">{titleKr.kr1}</div>
              <div className="font-poppins text-4xl text-center font-bold">{titleKr.kr2}</div>
              <div className="text-center mt-[24px] text-gray-400  ">{inputText.subTitle.kr}</div>
            </div>
            <div>
              <div className={'flex flex-col items-center w-full max-w-[428px] h-full pt-9 relative '}>
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    if (credentialResponse.credential) {
                      const email = decodeToken(credentialResponse.credential)
                      login(email)
                    }
                  }}
                  onError={() => {
                    console.log('Login Failed')
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </Layout>
  )
}
