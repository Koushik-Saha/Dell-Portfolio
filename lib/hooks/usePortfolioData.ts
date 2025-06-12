import { useState, useEffect } from 'react'
import portfolioData from '@/lib/data/portfolio.json'

export type PortfolioData = typeof portfolioData

export interface PersonalInfo {
  name: string
  title: string
  bio: string
  avatar: string
  accentColor: string
  email: string
  location: string
}

export interface NavigationItem {
  id: string
  label: string
  href: string
}

export interface Skill {
  business: string[]
  technical: string[]
  languages: string[]
  soft: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa: string
  description: string
  coursework: string[]
}

export interface Certificate {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate: string
  credentialId: string
  image: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string | null
  location: string
  description: string
  responsibilities: string[]
  technologies: string[]
  achievements: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  features: string[]
  links: {
    github: string
    live: string
  }
  status: 'completed' | 'in-progress' | 'planned'
  startDate: string
  endDate: string | null
}

export interface Research {
  id: string
  title: string
  description: string
  status: 'published' | 'in-progress' | 'submitted'
  publishDate?: string
  journal?: string
  authors?: string[]
  abstract: string
  keywords: string[]
  links: {
    paper?: string
    code?: string
  }
}

export interface Social {
  github: string
  linkedin: string
  twitter: string
  email: string
}

export const usePortfolioData = () => {
  const [data, setData] = useState<PortfolioData>(portfolioData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('portfolioData')
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        setData({ ...portfolioData, ...parsedData })
      }
    } catch (err) {
      console.error('Error loading portfolio data from localStorage:', err)
      setError('Failed to load saved data')
    }
  }, [])

  // Save data to localStorage when data changes
  useEffect(() => {
    try {
      localStorage.setItem('portfolioData', JSON.stringify(data))
    } catch (err) {
      console.error('Error saving portfolio data to localStorage:', err)
      setError('Failed to save data')
    }
  }, [data])

  const updatePersonalInfo = (personalInfo: Partial<PersonalInfo>) => {
    setData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        ...personalInfo
      }
    }))
  }

  const updateSkills = (skills: Partial<Skill>) => {
    setData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        ...skills
      }
    }))
  }

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      links: {
        github: project.links?.github || '',
        live: project.links?.live || '',
      }
    }
    setData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }))
  }

  const updateProject = (id: string, updates: Partial<Project>) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === id ? { ...project, ...updates } : project
      )
    }))
  }

  const deleteProject = (id: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== id)
    }))
  }

  const updateSocial = (social: Partial<Social>) => {
    setData(prev => ({
      ...prev,
      social: {
        ...prev.social,
        ...social
      }
    }))
  }

  const resetData = () => {
    setData(portfolioData)
    localStorage.removeItem('portfolioData')
  }

  return {
    data,
    isLoading,
    error,
    updatePersonalInfo,
    updateSkills,
    addProject,
    updateProject,
    deleteProject,
    updateSocial,
    resetData,
  }
}