import React from 'react'
import BubbleBackground from '../bubble-background'

export default function PageLayout({ children }: React.PropsWithChildren) {
  return (
    <>
        <BubbleBackground />
        {children}
    </>
  )
}
