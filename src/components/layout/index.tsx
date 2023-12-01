import React, { memo } from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={'flex fixed left-0 right-0 top-0 bottom-0 bg-[#E2D9E2]'}>
      <div className={'flex flex-1 flex-col justify-center items-center sm:py-[96px]'}>{children}</div>
    </div>
  )
}
 
export default memo(Layout)
