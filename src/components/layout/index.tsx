import React, { memo, useEffect, useState } from 'react'
import { motion, Variants, Transition } from 'framer-motion'

interface LayoutProps {
  children: React.ReactNode
  backgroundColor?: string
}

const pageVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
}
const Layout: React.FC<LayoutProps> = ({ children, backgroundColor }) => {
  const [layoutHeight, setLayoutHeight] = useState<number | string>('100vh')
  const [isMdMedia, setIsMdMedia] = useState<boolean>(false) // 모바일이 아닌 경우를 판단하는 상태

  const updateLayoutHeight = () => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')
    setIsMdMedia(mediaQuery.matches) // 미디어 쿼리 상태 업데이트

    if (mediaQuery.matches) {
      const windowHeight = Math.min(window.innerHeight, 926)
      setLayoutHeight(windowHeight + 'px')
    } else {
      setLayoutHeight('100vh')
    }
  }

  useEffect(() => {
    updateLayoutHeight()
    window.addEventListener('resize', updateLayoutHeight)

    return () => {
      window.removeEventListener('resize', updateLayoutHeight)
    }
  }, [])

  return (
    <div className={'flex items-center justify-center fixed left-0 top-0 right-0 bottom-0 overscroll-y-contain	 '} style={{ backgroundColor: backgroundColor ?? '#E2D9E2' }}>
      <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} className={'flex items-center justify-center w-full h-full'}>
        {isMdMedia ? (
          // 모바일이 아닌 경우에만 적용되는 스타일
          <div style={{ height: layoutHeight }} className={'flex flex-col justify-start box-border items-center bg-white w-[428px] h-full overflow-y-scroll hide-scrollbar'}>
            {children}
          </div>
        ) : (
          // 모바일 환경에서 적용되는 기본 스타일
          <div className={'flex flex-col justify-start box-border items-center bg-white w-full h-full overflow-y-scroll hide-scrollbar'}>{children}</div>
        )}
      </motion.div>
    </div>
  )
}

export default memo(Layout)
