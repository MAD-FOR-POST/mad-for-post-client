import React, { memo } from 'react'

interface LayoutProps {
  children: React.ReactNode
  backgroundColor?: string
}

const Layout: React.FC<LayoutProps> = ({ children, backgroundColor }) => {
  return (
    <div className={'flex items-center justify-center fixed left-0 top-0 right-0 bottom-0'} style={{ backgroundColor: backgroundColor ?? '#E2D9E2' }}>
      <div className={'flex flex-col justify-start box-border items-center bg-white w-[428px] h-full md:h-[926px] overflow-y-scroll hide-scrollbar'}>{children}</div>
    </div>
  )
}

export default memo(Layout)
