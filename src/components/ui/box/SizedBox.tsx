import React, { ReactNode } from 'react'

interface SizedBoxProps {
  width?: number
  height?: number
  children?: ReactNode
}

export const SizedBox: React.FC<SizedBoxProps> = ({ width, height, children }) => {
  const style = {
    width: width ? `${width}px` : undefined,
    height: height ? `${height}px` : undefined,
  }

  return <div style={style}>{children}</div>
}
