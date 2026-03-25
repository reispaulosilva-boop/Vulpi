'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface TypewriterEffectProps {
  text: string
  speed?: number
  delay?: number
  showCursor?: boolean
  className?: string
  onComplete?: () => void
}

export default function TypewriterEffect({
  text,
  speed = 55,
  delay = 0,
  showCursor = true,
  className = '',
  onComplete,
}: TypewriterEffectProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const indexRef = useRef(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const containerRef = useRef<HTMLSpanElement>(null)

  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  useEffect(() => {
    if (!isInView) return

    indexRef.current = 0
    setDisplayedText('')
    setIsComplete(false)

    const startDelay = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        const i = indexRef.current

        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1))
          indexRef.current = i + 1
        } else {
          clearInterval(intervalRef.current!)
          setIsComplete(true)
          onComplete?.()
        }
      }, speed)
    }, delay * 1000)

    return () => {
      clearTimeout(startDelay)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView])

  const cursorVariants = {
    blink: {
      opacity: [1, 1, 0, 0],
      transition: {
        duration: 0.9,
        repeat: Infinity,
        repeatType: 'loop' as const,
        ease: 'linear' as const,
      },
    },
  }

  return (
    <motion.span
      ref={containerRef}
      className={`inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4 }}
    >
      {displayedText}
      {showCursor && !isComplete && (
        <motion.span
          variants={cursorVariants}
          animate="blink"
          aria-hidden="true"
          className="inline-block ml-[2px] w-[1.5px] h-[0.9em] align-middle bg-current"
        />
      )}
    </motion.span>
  )
}
