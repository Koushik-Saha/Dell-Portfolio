'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { FiArrowLeft, FiCalendar, FiMapPin, FiAward, FiExternalLink } from 'react-icons/fi'
import { usePortfolioData } from '@/lib/hooks/usePortfolioData'
import BackgroundAnimation from '@/components/animations/BackgroundAnimation'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { useEffect, useState } from 'react'

export default function EducationPage() {
  const { data } = usePortfolioData()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

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
              Education & <span className="bg-gradient-to-r from-accent-500 to-accent-700 bg-clip-text text-transparent">Certificates</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              My academic journey and professional certifications that have shaped my expertise in software engineering and technology leadership.
            </p>
          </motion.div>

          {/* Education Section */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-20"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl font-bold mb-12 text-center"
            >
              Academic Background
            </motion.h2>
            
            <div className="space-y-8">
              {data.education.map((edu, index) => (
                <EducationCard key={edu.id} education={edu} index={index} />
              ))}
            </div>
          </motion.section>

          {/* Certificates Section */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-20"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl font-bold mb-12 text-center"
            >
              Professional Certifications
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.certificates.map((cert, index) => (
                <CertificateCard key={cert.id} certificate={cert} index={index} />
              ))}
            </div>
          </motion.section>

          {/* Skills Summary */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl font-bold mb-12 text-center"
            >
              Technical Expertise
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(data.skills).map(([category, skills], index) => (
                <SkillCategory key={category} category={category} skills={skills} index={index} />
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  )
}

function EducationCard({ education, index }: { education: any, index: number }) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="relative"
    >
      {/* Timeline connector */}
      <div className="absolute left-4 top-16 bottom-0 w-0.5 bg-gradient-to-b from-accent-500 to-transparent hidden md:block" />
      
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 ml-0 md:ml-12 relative">
        {/* Timeline dot */}
        <div className="absolute -left-12 top-8 w-4 h-4 bg-accent-500 rounded-full hidden md:block" />
        
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-accent-600 mb-2">{education.institution}</h3>
                <h4 className="text-xl font-semibold mb-1">{education.degree}</h4>
                <p className="text-gray-600 dark:text-gray-400">{education.field}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                  <FiCalendar className="w-4 h-4" />
                  {formatDate(education.startDate)} - {formatDate(education.endDate)}
                </div>
                <div className="text-sm font-medium text-accent-600">GPA: {education.gpa}</div>
              </div>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">{education.description}</p>
            
            <div>
              <h5 className="font-semibold mb-3">Key Coursework:</h5>
              <div className="flex flex-wrap gap-2">
                {education.coursework.map((course: string, courseIndex: number) => (
                  <motion.span
                    key={courseIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.2 + courseIndex * 0.1 }}
                    className="px-3 py-1 bg-accent-100 dark:bg-accent-900 text-accent-800 dark:text-accent-200 rounded-full text-sm"
                  >
                    {course}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function CertificateCard({ certificate, index }: { certificate: any, index: number }) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group"
    >
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <FiAward className="w-8 h-8 text-white" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2 group-hover:text-accent-600 transition-colors">
            {certificate.name}
          </h3>
          <p className="text-accent-600 font-medium mb-2">{certificate.issuer}</p>
          
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <FiCalendar className="w-4 h-4" />
              <span>Issued: {formatDate(certificate.issueDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiExternalLink className="w-4 h-4" />
              <span>Validity: {certificate.expiryDate}</span>
            </div>
            <div className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
              ID: {certificate.credentialId}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function SkillCategory({ category, skills, index }: { category: string, skills: string[], index: number }) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const categoryColors = {
    frontend: 'from-blue-500 to-purple-500',
    backend: 'from-green-500 to-teal-500',
    tools: 'from-orange-500 to-red-500',
    soft: 'from-pink-500 to-rose-500'
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className={`w-12 h-12 bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]} rounded-lg flex items-center justify-center mb-4`}>
        <span className="text-white font-bold text-lg">{category.charAt(0).toUpperCase()}</span>
      </div>
      
      <h3 className="text-lg font-bold mb-4 capitalize">{category}</h3>
      
      <div className="space-y-2">
        {skills.slice(0, 6).map((skill, skillIndex) => (
          <motion.div
            key={skillIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent-600 transition-colors cursor-default"
          >
            • {skill}
          </motion.div>
        ))}
        {skills.length > 6 && (
          <div className="text-xs text-gray-500 mt-2">
            +{skills.length - 6} more skills
          </div>
        )}
      </div>
    </motion.div>
  )
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
}