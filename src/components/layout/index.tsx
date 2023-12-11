import React, { memo, useEffect, useState } from 'react'

interface LayoutProps {
  children: React.ReactNode
  backgroundColor?: string
}

const Layout: React.FC<LayoutProps> = ({ children, backgroundColor }) => {
  const [layoutHeight, setLayoutHeight] = useState<number | string>('100vh') // 기본값으로 브라우저 높이를 사용

  const updateLayoutHeight = () => {
    const isMdMedia = window.matchMedia('(min-width: 768px)').matches
    if (isMdMedia) {
      const windowHeight = Math.min(window.innerHeight, 926)
      setLayoutHeight(windowHeight + 'px')
    } else {
      setLayoutHeight('100vh')
    }
  }

  const init = () => {
    updateLayoutHeight()
    window.addEventListener('resize', updateLayoutHeight)
  }

  const deInit = () => {
    window.removeEventListener('resize', updateLayoutHeight)
  }

  useEffect(() => {
    init()
    return () => {
      deInit()
    }
  }, [])

  return (
    <div className={'flex items-center justify-center fixed left-0 top-0 right-0 bottom-0'} style={{ backgroundColor: backgroundColor ?? '#E2D9E2' }}>
      <div style={{ height: layoutHeight }} className={'flex flex-col justify-start box-border items-center bg-white w-[428px] h-full overflow-y-scroll hide-scrollbar'}>
        {children}
      </div>
    </div>
  )
}

export default memo(Layout)
