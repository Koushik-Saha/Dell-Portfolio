'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import BackgroundAnimation from '@/components/animations/BackgroundAnimation'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { usePortfolioData } from '@/lib/hooks/usePortfolioData'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const { data } = usePortfolioData()
  const [typedText, setTypedText] = useState('')
  const fullText = data.personal.title

  useEffect(() => {
    setMounted(true)
    
    // Typewriter effect
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [fullText])

  if (!mounted) return null

  return (
    <div className="min-h-screen relative">
      <BackgroundAnimation />
      
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 p-6"
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold"
          >
            Koushik Saha
          </motion.div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6">
              {data.navigation.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="text-sm font-medium hover:text-accent-600 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <main className="flex items-center justify-center min-h-screen px-6">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-8"
            >
              {/* Main Heading */}
              <div className="space-y-4">
                <motion.h1 
                  className="text-6xl md:text-8xl font-extrabold tracking-tight"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  Hi, I'm{' '}
                  <span className="bg-gradient-to-r from-accent-500 to-accent-700 bg-clip-text text-transparent">
                    {data.personal.name.split(' ')[0]}
                  </span>
                </motion.h1>
                
                <motion.div 
                  className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400 min-h-[2em]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  {typedText}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="ml-1"
                  >
                    |
                  </motion.span>
                </motion.div>
              </div>

              {/* Bio */}
              <motion.p 
                className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                {data.personal.bio}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <Link href="/portfolio">
                  <motion.button
                    className="group px-8 py-4 bg-accent-600 hover:bg-accent-700 text-white rounded-full font-medium text-lg flex items-center justify-center gap-2 transition-all duration-300"
                    whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View My Work
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
                
                <Link href="/contact">
                  <motion.button
                    className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 hover:border-accent-600 dark:hover:border-accent-400 rounded-full font-medium text-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get In Touch
                  </motion.button>
                </Link>
              </motion.div>

              {/* Social Links */}
              <motion.div 
                className="flex justify-center gap-6 mt-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.6 }}
              >
                {data.social.github && (
                  <motion.a
                    href={data.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full glass hover:scale-110 transition-all duration-300"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiGithub className="w-6 h-6" />
                  </motion.a>
                )}
                
                {data.social.linkedin && (
                  <motion.a
                    href={data.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full glass hover:scale-110 transition-all duration-300"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiLinkedin className="w-6 h-6" />
                  </motion.a>
                )}
                
                <motion.a
                  href={`mailto:${data.social.email}`}
                  className="p-3 rounded-full glass hover:scale-110 transition-all duration-300"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiMail className="w-6 h-6" />
                </motion.a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}