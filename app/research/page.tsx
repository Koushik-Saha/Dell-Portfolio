'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FiArrowLeft, FiFileText, FiCalendar, FiUsers, FiExternalLink, FiSearch, FiBookOpen, FiTrendingUp } from 'react-icons/fi'
import { usePortfolioData } from '@/lib/hooks/usePortfolioData'
import BackgroundAnimation from '@/components/animations/BackgroundAnimation'
import ThemeToggle from '@/components/ui/ThemeToggle'

export default function ResearchPage() {
  const { data } = usePortfolioData()
  const [mounted, setMounted] = useState(false)
  const [selectedResearch, setSelectedResearch] = useState<any>(null)

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
              Research & <span className="bg-gradient-to-r from-accent-500 to-accent-700 bg-clip-text text-transparent">Innovation</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Exploring cutting-edge technologies and methodologies to solve complex software engineering challenges and drive innovation in web development.
            </p>
          </motion.div>

          {/* Research Stats */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-20"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatCard 
                icon={FiFileText}
                value={data.research.length}
                label="Research Papers"
                color="from-blue-500 to-purple-500"
              />
              <StatCard 
                icon={FiBookOpen}
                value={data.research.filter((r: any) => r.status === 'completed').length}
                label="Published Works"
                color="from-green-500 to-teal-500"
              />
              <StatCard 
                icon={FiTrendingUp}
                value={data.research.filter((r: any) => r.status === 'in-progress').length}
                label="Ongoing Research"
                color="from-orange-500 to-red-500"
              />
              <StatCard 
                icon={FiUsers}
                value={6}
                label="Years Experience"
                color="from-pink-500 to-rose-500"
              />
            </div>
          </motion.section>

          {/* Research Areas */}
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
              Research Focus Areas
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ResearchAreaCard 
                title="Frontend Architecture"
                description="Micro-frontend systems, performance optimization, and scalable UI architectures"
                icon="🏗️"
                technologies={["React.js", "Micro Frontend", "Performance"]}
              />
              <ResearchAreaCard 
                title="Dynamic Systems"
                description="JSON-driven rendering, dynamic content management, and automated deployment"
                icon="⚡"
                technologies={["JSON", "Dynamic Rendering", "Automation"]}
              />
              <ResearchAreaCard 
                title="User Experience"
                description="User engagement optimization, PWA implementation, and accessibility research"
                icon="👥"
                technologies={["PWA", "User Engagement", "UX"]}
              />
            </div>
          </motion.section>

          {/* Research Papers */}
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
              Published Research
            </motion.h2>
            
            <div className="space-y-8">
              {data.research.map((research: any, index: number) => (
                <ResearchCard 
                  key={research.id} 
                  research={research} 
                  index={index}
                  onSelect={() => setSelectedResearch(research)}
                />
              ))}
            </div>
          </motion.section>

          {/* Future Research */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl font-bold mb-12 text-center"
            >
              Future Research Directions
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FutureResearchCard 
                title="AI-Powered Development Tools"
                description="Exploring the integration of AI in automated code generation and development workflows."
                timeline="2024-2025"
              />
              <FutureResearchCard 
                title="Sustainable Web Technologies"
                description="Research on energy-efficient web applications and green computing practices."
                timeline="2024-2026"
              />
              <FutureResearchCard 
                title="Real-time Collaboration Systems"
                description="Advanced real-time collaboration features for distributed development teams."
                timeline="2025-2026"
              />
              <FutureResearchCard 
                title="Next-Generation PWAs"
                description="Pushing the boundaries of Progressive Web Apps with emerging web standards."
                timeline="2025-2027"
              />
            </div>
          </motion.section>
        </div>
      </div>

      {/* Research Detail Modal */}
      {selectedResearch && (
        <ResearchModal 
          research={selectedResearch} 
          onClose={() => setSelectedResearch(null)} 
        />
      )}
    </div>
  )
}

function StatCard({ icon: Icon, value, label, color }: any) {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
    >
      <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      
      <div className="text-2xl md:text-3xl font-bold mb-2">{value}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
    </motion.div>
  )
}

function ResearchAreaCard({ title, description, icon, technologies }: any) {
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
      className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
    >
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold mb-3 group-hover:text-accent-600 transition-colors">
        {title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech: string, index: number) => (
          <span
            key={index}
            className="px-2 py-1 bg-accent-100 dark:bg-accent-900 text-accent-800 dark:text-accent-200 rounded text-xs font-medium"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

function ResearchCard({ research, index, onSelect }: any) {
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
      className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
      onClick={onSelect}
    >
      <div className="flex items-start gap-6">
        <div className="w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <FiFileText className="w-8 h-8 text-white" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                research.status === 'completed' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              }`}>
                {research.status === 'completed' ? 'Published' : 'In Progress'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FiCalendar className="w-4 h-4" />
              {research.publishDate ? formatDate(research.publishDate) : `Expected: ${research.expectedCompletion}`}
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-3 group-hover:text-accent-600 transition-colors">
            {research.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {research.description}
          </p>
          
          {research.authors && (
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <FiUsers className="w-4 h-4" />
              <span>Authors: {research.authors.join(', ')}</span>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 mb-4">
            {research.keywords.map((keyword: string, keyIndex: number) => (
              <span
                key={keyIndex}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm"
              >
                #{keyword}
              </span>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <motion.button
              className="flex items-center gap-2 text-accent-600 hover:text-accent-700 transition-colors"
              whileHover={{ x: 2 }}
            >
              <FiSearch className="w-4 h-4" />
              View Details
            </motion.button>
            
            {research.links.paper && (
              <motion.a
                href={research.links.paper}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-accent-600 transition-colors"
                whileHover={{ x: 2 }}
                onClick={(e) => e.stopPropagation()}
              >
                <FiExternalLink className="w-4 h-4" />
                Read Paper
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function FutureResearchCard({ title, description, timeline }: any) {
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
      className="bg-gradient-to-r from-gray-50 to-accent-50 dark:from-gray-800 dark:to-accent-900/20 rounded-xl p-6 border-2 border-dashed border-accent-300 dark:border-accent-700 hover:border-accent-500 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <span className="text-sm text-accent-600 font-medium">{timeline}</span>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        {description}
      </p>
      
      <div className="mt-4 text-sm text-accent-600">
        🚀 Coming Soon
      </div>
    </motion.div>
  )
}

function ResearchModal({ research, onClose }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-2xl font-bold">{research.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Abstract</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {research.abstract}
            </p>
          </div>
          
          {research.authors && (
            <div>
              <h3 className="font-semibold mb-2">Authors</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {research.authors.join(', ')}
              </p>
            </div>
          )}
          
          <div>
            <h3 className="font-semibold mb-2">Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {research.keywords.map((keyword: string, index: number) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-accent-100 dark:bg-accent-900 text-accent-800 dark:text-accent-200 rounded text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          
          {research.collaborators && (
            <div>
              <h3 className="font-semibold mb-2">Collaborators</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {research.collaborators.join(', ')}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
}