'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { FiArrowLeft, FiCalendar, FiMapPin, FiBriefcase, FiTrendingUp, FiUsers, FiCode } from 'react-icons/fi'
import { usePortfolioData } from '@/lib/hooks/usePortfolioData'
import BackgroundAnimation from '@/components/animations/BackgroundAnimation'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { useEffect, useState } from 'react'
import CountUp from 'react-countup'

export default function ExperiencePage() {
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
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
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
              Work <span className="bg-gradient-to-r from-accent-500 to-accent-700 bg-clip-text text-transparent">Experience</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Over 6 years of professional software engineering experience, building scalable applications and leading development teams across multiple industries.
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-20"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatCard 
                icon={FiCalendar}
                value={6}
                suffix="+"
                label="Years Experience"
                color="from-blue-500 to-purple-500"
              />
              <StatCard 
                icon={FiBriefcase}
                value={4}
                suffix=""
                label="Companies"
                color="from-green-500 to-teal-500"
              />
              <StatCard 
                icon={FiUsers}
                value={1000000}
                suffix="+"
                label="Users Served"
                color="from-orange-500 to-red-500"
                isLarge
              />
              <StatCard 
                icon={FiTrendingUp}
                value={30}
                suffix="%"
                label="Performance Boost"
                color="from-pink-500 to-rose-500"
              />
            </div>
          </motion.section>

          {/* Experience Timeline */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-500 via-accent-400 to-transparent transform md:-translate-x-0.5" />
            
            <div className="space-y-12">
              {data.experience.map((exp, index) => (
                <ExperienceCard key={exp.id} experience={exp} index={index} />
              ))}
            </div>
          </motion.section>

          {/* Volunteer Section */}
          {data.volunteer && (
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
                Community Involvement
              </motion.h2>
              
              <div className="max-w-4xl mx-auto">
                {data.volunteer.map((vol: any, index: number) => (
                  <VolunteerCard key={vol.id} volunteer={vol} index={index} />
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, value, suffix, label, color, isLarge = false }: any) {
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
      
      <div className="text-2xl md:text-3xl font-bold mb-2">
        {inView && (
          <CountUp
            end={value}
            duration={2}
            suffix={suffix}
            separator={isLarge ? "," : ""}
          />
        )}
      </div>
      
      <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
    </motion.div>
  )
}

function ExperienceCard({ experience, index }: { experience: any, index: number }) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const isLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`relative ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto'} md:w-1/2`}
    >
      {/* Timeline dot */}
      <div className="absolute left-6 md:left-auto md:right-auto md:top-8 top-8 w-6 h-6 bg-accent-500 rounded-full border-4 border-white dark:border-gray-900 z-10 md:transform md:-translate-x-3" 
           style={{ left: isLeft ? 'auto' : '32px', right: isLeft ? '-12px' : 'auto' }} />
      
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 ml-12 md:ml-0"
      >
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <FiCalendar className="w-4 h-4" />
            {formatDate(experience.startDate)} - {experience.endDate === 'present' ? 'Present' : formatDate(experience.endDate)}
          </div>
          
          <h3 className="text-2xl font-bold text-accent-600 mb-2">{experience.position}</h3>
          <h4 className="text-xl font-semibold mb-2">{experience.company}</h4>
          
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
            <FiMapPin className="w-4 h-4" />
            {experience.location}
          </div>
          
          <p className="text-gray-700 dark:text-gray-300">{experience.description}</p>
        </div>

        {/* Responsibilities */}
        <div className="mb-6">
          <h5 className="font-semibold mb-3 flex items-center gap-2">
            <FiCode className="w-4 h-4" />
            Key Responsibilities
          </h5>
          <ul className="space-y-2">
            {experience.responsibilities.map((resp: string, respIndex: number) => (
              <motion.li
                key={respIndex}
                initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2 + respIndex * 0.1 }}
                className="text-gray-600 dark:text-gray-400 text-sm flex items-start gap-2"
              >
                <span className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2 flex-shrink-0" />
                {resp}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div className="mb-6">
          <h5 className="font-semibold mb-3">Technologies Used</h5>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech: string, techIndex: number) => (
              <motion.span
                key={techIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.2 + techIndex * 0.05 }}
                className="px-3 py-1 bg-accent-100 dark:bg-accent-900 text-accent-800 dark:text-accent-200 rounded-full text-sm font-medium"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h5 className="font-semibold mb-3 flex items-center gap-2">
            <FiTrendingUp className="w-4 h-4" />
            Key Achievements
          </h5>
          <ul className="space-y-2">
            {experience.achievements.map((achievement: string, achIndex: number) => (
              <motion.li
                key={achIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2 + achIndex * 0.1 }}
                className="text-green-600 dark:text-green-400 text-sm flex items-start gap-2"
              >
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                {achievement}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  )
}

function VolunteerCard({ volunteer, index }: { volunteer: any, index: number }) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 shadow-lg"
    >
      <div className="flex items-start gap-6">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
          <FiUsers className="w-8 h-8 text-white" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <FiCalendar className="w-4 h-4" />
            {formatDate(volunteer.startDate)} - {volunteer.endDate === 'present' ? 'Present' : formatDate(volunteer.endDate)}
          </div>
          
          <h3 className="text-2xl font-bold mb-2">{volunteer.organization}</h3>
          <h4 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-4">{volunteer.role}</h4>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">{volunteer.description}</p>
          
          <div>
            <h5 className="font-semibold mb-3">Impact & Achievements</h5>
            <ul className="space-y-2">
              {volunteer.achievements.map((achievement: string, achIndex: number) => (
                <motion.li
                  key={achIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: achIndex * 0.1 }}
                  className="text-gray-600 dark:text-gray-400 text-sm flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  {achievement}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
}