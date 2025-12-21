'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface TypewriterProps {
  text: string[]
  speed?: number
  loop?: boolean
  className?: string
}

export function Typewriter({
  text,
  speed = 100,
  loop = false,
  className,
}: TypewriterProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (text.length === 0) return

    const currentString = text[currentIndex] ?? ''
    let timeout: NodeJS.Timeout

    if (!isDeleting) {
      if (currentText.length < currentString.length) {
        timeout = setTimeout(() => {
          setCurrentText(currentString.slice(0, currentText.length + 1))
        }, speed)
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true)
        }, 2000)
      }
    } else {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1))
        }, speed / 2)
      } else {
        setIsDeleting(false)
        const nextIndex = loop
          ? (currentIndex + 1) % text.length
          : Math.min(currentIndex + 1, text.length - 1)
        setCurrentIndex(nextIndex)
      }
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [currentText, currentIndex, isDeleting, text, speed, loop])

  return (
    <span className={cn('inline-block', className)}>
      {currentText}
      <span className='animate-pulse'>|</span>
    </span>
  )
}

