'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'
import OnboardingForm from '@/components/forms/OnboardingForm'
import BackgroundAnimation from '@/components/animations/BackgroundAnimation'
import ThemeToggle from '@/components/ui/ThemeToggle'
import toast from 'react-hot-toast'

export default function OnboardingPage() {
  const router = useRouter()
  const [isCompleted, setIsCompleted] = useState(false)

  const handleComplete = () => {
    setIsCompleted(true)
    toast.success('Portfolio setup complete! 🎉')
    
    setTimeout(() => {
      router.push('/portfolio')
    }, 2000)
  }

  return (
    <div className="min-h-screen relative">
      <BackgroundAnimation />
      
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 p-6"
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/">
            <motion.button
              className="flex items-center gap-2 text-sm font-medium hover:text-accent-600 transition-colors"
              whileHover={{ x: -2 }}
            >
              <FiArrowLeft />
              Back to Home
            </motion.button>
          </Link>
          <ThemeToggle />
        </div>
      </motion.nav>

      <div className="pt-24 px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Let's Build Your{' '}
              <span className="bg-gradient-to-r from-accent-500 to-accent-700 bg-clip-text text-transparent">
                Portfolio
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Complete this quick setup to personalize your portfolio. All information can be updated later.
            </p>
          </motion.div>

          {/* Form */}
          {!isCompleted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <OnboardingForm onComplete={handleComplete} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-4">Setup Complete!</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Your portfolio is ready. Redirecting you to view your work...
              </p>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-600"></div>
              </div>
            </motion.div>
          )}

          {/* Features Preview */}
          {!isCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-20"
            >
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold mb-4">What You'll Get</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  A beautiful, responsive portfolio with modern features
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  className="text-center p-6 glass rounded-xl"
                  whileHover={{ y: -2 }}
                >
                  <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-accent-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">Responsive Design</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Looks perfect on all devices and screen sizes
                  </p>
                </motion.div>

                <motion.div
                  className="text-center p-6 glass rounded-xl"
                  whileHover={{ y: -2 }}
                >
                  <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-accent-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">Modern Tech Stack</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Built with Next.js, TypeScript, and Tailwind CSS
                  </p>
                </motion.div>

                <motion.div
                  className="text-center p-6 glass rounded-xl"
                  whileHover={{ y: -2 }}
                >
                  <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-accent-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">Smooth Animations</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Delightful interactions powered by Framer Motion
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}