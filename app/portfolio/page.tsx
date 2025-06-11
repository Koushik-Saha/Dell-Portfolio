'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { FiArrowLeft, FiExternalLink, FiGithub } from 'react-icons/fi'
import { usePortfolioData } from '@/lib/hooks/usePortfolioData'
import BackgroundAnimation from '@/components/animations/BackgroundAnimation'
import ThemeToggle from '@/components/ui/ThemeToggle'

export default function PortfolioPage() {
  const { data } = usePortfolioData()
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredProjects = data.projects.filter(project => 
    activeFilter === 'all' || project.status === activeFilter
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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

      <div className="pt-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              My <span className="bg-gradient-to-r from-accent-500 to-accent-700 bg-clip-text text-transparent">Portfolio</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A collection of projects showcasing my skills and passion for creating exceptional digital experiences.
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-4 mb-12"
          >
            {['all', 'completed', 'in-progress'].map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-accent-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1).replace('-', ' ')}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="aspect-video bg-gradient-to-br from-accent-400 to-accent-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'completed' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-yellow-500 text-white'
                    }`}>
                      {project.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-accent-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    {project.links.github && (
                      <motion.a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-accent-600 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        <FiGithub />
                        Code
                      </motion.a>
                    )}
                    {project.links.live && (
                      <motion.a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-accent-600 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        <FiExternalLink />
                        Live Demo
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation to other sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-20 text-center"
          >
            <h2 className="text-2xl font-bold mb-8">Explore More</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {data.navigation.slice(1).map((item) => (
                <Link key={item.id} href={item.href}>
                  <motion.div
                    className="p-6 glass rounded-xl hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className="font-semibold mb-2">{item.label}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {getDescriptionForNavItem(item.id)}
                    </p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function getDescriptionForNavItem(id: string): string {
  const descriptions = {
    education: 'Academic background and certifications',
    experience: 'Professional work history and achievements',
    research: 'Published papers and ongoing research',
    contact: 'Get in touch and download resume'
  }
  return descriptions[id as keyof typeof descriptions] || ''
}