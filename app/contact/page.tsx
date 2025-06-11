'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FiArrowLeft, FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub, FiTwitter, FiDownload, FiSend, FiUser, FiMessageSquare } from 'react-icons/fi'
import { usePortfolioData } from '@/lib/hooks/usePortfolioData'
import BackgroundAnimation from '@/components/animations/BackgroundAnimation'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const { data } = usePortfolioData()
  const [mounted, setMounted] = useState(false)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const onSubmit = async (formData: any) => {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    toast.success('Message sent successfully! I\'ll get back to you soon.')
    reset()
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get In <span className="bg-gradient-to-r from-accent-500 to-accent-700 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Let's collaborate on your next project! I'm always interested in discussing new opportunities, innovative ideas, and challenging problems.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <ContactItem 
                    icon={FiMail}
                    label="Email"
                    value={data.personal.email}
                    href={`mailto:${data.personal.email}`}
                    color="from-blue-500 to-blue-600"
                  />
                  
                  <ContactItem 
                    icon={FiPhone}
                    label="Phone"
                    value={data.personal.phone}
                    href={`tel:${data.personal.phone}`}
                    color="from-green-500 to-green-600"
                  />
                  
                  <ContactItem 
                    icon={FiMapPin}
                    label="Location"
                    value={data.personal.location}
                    color="from-red-500 to-red-600"
                  />
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-bold mb-4">Social Networks</h3>
                
                <div className="flex gap-4">
                  <SocialLink 
                    icon={FiLinkedin}
                    href={data.social.linkedin}
                    label="LinkedIn"
                    color="from-blue-600 to-blue-700"
                  />
                  
                  <SocialLink 
                    icon={FiGithub}
                    href={data.social.github}
                    label="GitHub"
                    color="from-gray-700 to-gray-800"
                  />
                  
                  <SocialLink 
                    icon={FiTwitter}
                    href={data.social.twitter}
                    label="Twitter"
                    color="from-blue-400 to-blue-500"
                  />
                </div>
              </motion.div>

              {/* Resume Download */}
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-bold mb-4">Resume</h3>
                
                <motion.button
                  className="group flex items-center gap-3 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white px-6 py-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiDownload className="w-5 h-5 group-hover:animate-bounce" />
                  Download Resume
                  <span className="text-sm opacity-80">(PDF)</span>
                </motion.button>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Get a detailed overview of my experience, skills, and achievements.
                </p>
              </motion.div>

              {/* Availability */}
              <motion.div 
                variants={itemVariants}
                className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-semibold text-green-700 dark:text-green-400">Available for new opportunities</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Currently seeking full-time software engineering positions and exciting freelance projects. 
                  Open to remote work and relocation opportunities.
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                variants={itemVariants}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-2xl font-bold mb-6">Send me a message</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <div className="relative">
                        <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          {...register('name', { required: 'Name is required' })}
                          type="text"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-white dark:bg-gray-800 transition-colors"
                          placeholder="Your full name"
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message as string}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <div className="relative">
                        <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          {...register('email', { 
                            required: 'Email is required',
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: 'Invalid email address'
                            }
                          })}
                          type="email"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-white dark:bg-gray-800 transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <input
                      {...register('subject', { required: 'Subject is required' })}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-white dark:bg-gray-800 transition-colors"
                      placeholder="What's this about?"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{errors.subject.message as string}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <div className="relative">
                      <FiMessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <textarea
                        {...register('message', { 
                          required: 'Message is required',
                          minLength: {
                            value: 10,
                            message: 'Message must be at least 10 characters'
                          }
                        })}
                        rows={6}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-white dark:bg-gray-800 transition-colors resize-none"
                        placeholder="Tell me about your project, idea, or just say hello!"
                      />
                    </div>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message as string}</p>
                    )}
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-4 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                    whileHover={!isSubmitting ? { scale: 1.02, y: -1 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          </div>

          {/* Quick Stats */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-20"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl font-bold mb-12 text-center"
            >
              Why Work With Me?
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <QuickStat 
                number="6+"
                label="Years Experience"
                description="Professional software development"
              />
              <QuickStat 
                number="1M+"
                label="Users Impacted"
                description="Through applications I've built"
              />
              <QuickStat 
                number="20+"
                label="Technologies"
                description="Mastered and actively used"
              />
              <QuickStat 
                number="100%"
                label="Client Satisfaction"
                description="Committed to quality delivery"
              />
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  )
}

function ContactItem({ icon: Icon, label, value, href, color }: any) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const content = (
    <div className="flex items-center gap-4 group">
      <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      
      <div>
        <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
        <div className="font-medium group-hover:text-accent-600 transition-colors">{value}</div>
      </div>
    </div>
  )

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {href ? (
        <motion.a
          href={href}
          className="block"
          whileHover={{ x: 2 }}
        >
          {content}
        </motion.a>
      ) : (
        content
      )}
    </motion.div>
  )
}

function SocialLink({ icon: Icon, href, label, color }: any) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-12 h-12 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      title={label}
    >
      <Icon className="w-6 h-6" />
    </motion.a>
  )
}

function QuickStat({ number, label, description }: any) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
    >
      <div className="text-3xl font-bold text-accent-600 mb-2">{number}</div>
      <div className="font-semibold mb-2">{label}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{description}</div>
    </motion.div>
  )
}