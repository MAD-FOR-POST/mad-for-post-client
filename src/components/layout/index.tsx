import React, { memo } from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={'flex w-screen h-screen'}>
      <div className={'flex flex-1 flex-col'}>{children}</div>
    </div>
  )
}

export default memo(Layout)
