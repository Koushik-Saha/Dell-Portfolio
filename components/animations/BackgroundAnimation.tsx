'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface BackgroundAnimationProps {
  className?: string
}

export default function BackgroundAnimation({ className = '' }: BackgroundAnimationProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsVisible(!mediaQuery.matches)

    const handleChange = () => setIsVisible(!mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height
        setMousePosition({ x, y })
      }
    }

    const throttledMouseMove = throttle(handleMouseMove, 50)
    window.addEventListener('mousemove', throttledMouseMove)

    return () => window.removeEventListener('mousemove', throttledMouseMove)
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: -1 }}
    >
      {/* Cursor-following gradient */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{
          background: `radial-gradient(circle, hsl(var(--accent-400)) 0%, transparent 70%)`,
          left: `${mousePosition.x * 100}%`,
          top: `${mousePosition.y * 100}%`,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating shapes */}
      {Array.from({ length: 6 }).map((_, i) => (
        <FloatingShape key={i} index={i} />
      ))}

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>
    </div>
  )
}

function FloatingShape({ index }: { index: number }) {
  const shapes = ['circle', 'square', 'triangle']
  const shape = shapes[index % shapes.length]
  
  const size = 20 + (index * 10)
  const duration = 20 + (index * 5)
  const delay = index * 2

  return (
    <motion.div
      className="absolute opacity-5 blur-sm"
      initial={{
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        rotate: 0,
      }}
      animate={{
        x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
        y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
        rotate: [0, 360],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {shape === 'circle' && (
        <div
          className="rounded-full bg-gradient-to-r from-accent-300 to-accent-500"
          style={{ width: size, height: size }}
        />
      )}
      {shape === 'square' && (
        <div
          className="bg-gradient-to-r from-accent-400 to-accent-600 rotate-45"
          style={{ width: size, height: size }}
        />
      )}
      {shape === 'triangle' && (
        <div
          className="bg-gradient-to-r from-accent-500 to-accent-700"
          style={{
            width: 0,
            height: 0,
            borderLeft: `${size/2}px solid transparent`,
            borderRight: `${size/2}px solid transparent`,
            borderBottom: `${size}px solid currentColor`,
          }}
        />
      )}
    </motion.div>
  )
}

// Utility function to throttle events
function throttle(func: Function, limit: number) {
  let inThrottle: boolean
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}