'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FiUser, FiCode, FiFolder, FiLink, FiArrowRight, FiArrowLeft, FiPlus, FiX } from 'react-icons/fi'
import { usePortfolioData } from '@/lib/hooks/usePortfolioData'
import toast from 'react-hot-toast'

const personalInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  title: z.string().min(2, 'Title must be at least 2 characters'),
  bio: z.string().min(50, 'Bio must be at least 50 characters').max(500, 'Bio must be less than 500 characters'),
  email: z.string().email('Invalid email address'),
  location: z.string().min(2, 'Location must be at least 2 characters'),
})

const skillsSchema = z.object({
  frontend: z.array(z.string()).min(1, 'Add at least one frontend skill'),
  backend: z.array(z.string()).min(1, 'Add at least one backend skill'),
  tools: z.array(z.string()).min(1, 'Add at least one tool'),
})

const projectSchema = z.object({
  projects: z.array(z.object({
    title: z.string().min(2, 'Title is required'),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    technologies: z.array(z.string()).min(1, 'Add at least one technology'),
    githubUrl: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
    liveUrl: z.string().url('Invalid live URL').optional().or(z.literal('')),
  })).min(1, 'Add at least one project'),
})

const socialSchema = z.object({
  github: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
  linkedin: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
  twitter: z.string().url('Invalid Twitter URL').optional().or(z.literal('')),
})

type PersonalInfoForm = z.infer<typeof personalInfoSchema>
type SkillsForm = z.infer<typeof skillsSchema>
type ProjectForm = z.infer<typeof projectSchema>
type SocialForm = z.infer<typeof socialSchema>

const steps = [
  { id: 'personal', title: 'Personal Info', icon: FiUser },
  { id: 'skills', title: 'Skills', icon: FiCode },
  { id: 'projects', title: 'Projects', icon: FiFolder },
  { id: 'social', title: 'Social Links', icon: FiLink },
]

export default function OnboardingForm({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const { data, updatePersonalInfo, updateSkills, addProject, updateSocial } = usePortfolioData()

  const personalForm = useForm<PersonalInfoForm>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: data.personal.name,
      title: data.personal.title,
      bio: data.personal.bio,
      email: data.personal.email,
      location: data.personal.location,
    }
  })

  const skillsForm = useForm<SkillsForm>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      frontend: data.skills.frontend,
      backend: data.skills.backend,
      tools: data.skills.tools,
    }
  })

  const projectForm = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projects: [
        {
          title: '',
          description: '',
          technologies: [],
          githubUrl: '',
          liveUrl: '',
        }
      ]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: projectForm.control,
    name: 'projects'
  })

  const socialForm = useForm<SocialForm>({
    resolver: zodResolver(socialSchema),
    defaultValues: {
      github: data.social.github || '',
      linkedin: data.social.linkedin || '',
      twitter: data.social.twitter || '',
    }
  })

  const handleNext = async () => {
    let isValid = false
    
    switch (currentStep) {
      case 0:
        isValid = await personalForm.trigger()
        if (isValid) {
          const formData = personalForm.getValues()
          updatePersonalInfo(formData)
          toast.success('Personal info saved!')
        }
        break
      case 1:
        isValid = await skillsForm.trigger()
        if (isValid) {
          const formData = skillsForm.getValues()
          updateSkills(formData)
          toast.success('Skills saved!')
        }
        break
      case 2:
        isValid = await projectForm.trigger()
        if (isValid) {
          const formData = projectForm.getValues()
          formData.projects.forEach(project => {
            addProject({
              title: project.title,
              description: project.description,
              image: '/images/project-placeholder.jpg',
              technologies: project.technologies,
              features: [],
              links: {
                github: project.githubUrl || undefined,
                live: project.liveUrl || undefined,
              },
              status: 'completed',
              startDate: new Date().toISOString().split('T')[0],
              endDate: new Date().toISOString().split('T')[0],
            })
          })
          toast.success('Projects saved!')
        }
        break
      case 3:
        isValid = await socialForm.trigger()
        if (isValid) {
          const formData = socialForm.getValues()
          updateSocial({
            github: formData.github || undefined,
            linkedin: formData.linkedin || undefined,
            twitter: formData.twitter || undefined,
            email: data.personal.email,
          })
          toast.success('Social links saved!')
          onComplete()
          return
        }
        break
    }

    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center gap-2 ${
                index <= currentStep ? 'text-accent-600' : 'text-gray-400'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStep 
                  ? 'bg-accent-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}>
                <step.icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium hidden sm:block">{step.title}</span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-accent-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Form Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg"
        >
          {currentStep === 0 && (
            <PersonalInfoStep form={personalForm} />
          )}
          {currentStep === 1 && (
            <SkillsStep form={skillsForm} />
          )}
          {currentStep === 2 && (
            <ProjectsStep form={projectForm} fields={fields} append={append} remove={remove} />
          )}
          {currentStep === 3 && (
            <SocialStep form={socialForm} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <motion.button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={currentStep > 0 ? { scale: 1.05 } : {}}
          whileTap={currentStep > 0 ? { scale: 0.95 } : {}}
        >
          <FiArrowLeft />
          Previous
        </motion.button>

        <motion.button
          onClick={handleNext}
          className="flex items-center gap-2 px-8 py-3 bg-accent-600 hover:bg-accent-700 text-white rounded-full font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
          <FiArrowRight />
        </motion.button>
      </div>
    </div>
  )
}

function PersonalInfoStep({ form }: { form: any }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
        <p className="text-gray-600 dark:text-gray-400">Tell us about yourself</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            {...form.register('name')}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-white dark:bg-gray-800"
            placeholder="Your full name"
          />
          {form.formState.errors.name && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            {...form.register('title')}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-white dark:bg-gray-800"
            placeholder="e.g., Full Stack Developer"
          />
          {form.formState.errors.title && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.title.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Bio</label>
        <textarea
          {...form.register('bio')}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-white dark:bg-gray-800"
          placeholder="Tell us about your background, interests, and what drives you..."
        />
        <div className="flex justify-between mt-1">
          {form.formState.errors.bio && (
            <p className="text-red-500 text-sm">{form.formState.errors.bio.message}</p>
          )}
          <p className="text-gray-500 text-sm">
            {form.watch('bio')?.length || 0}/500
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            {...form.register('email')}
            type="email"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-white dark:bg-gray-800"
            placeholder="your@email.com"
          />
          {form.formState.errors.email && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <input
            {...form.register('location')}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-white dark:bg-gray-800"
            placeholder="City, Country"
          />
          {form.formState.errors.location && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.location.message}</p>
          )}
        </div>
      </div>
    </div>
  )
}

function SkillsStep({ form }: { form: any }) {
  const [newSkill, setNewSkill] = useState({ category: 'frontend', value: '' })

  const addSkill = () => {
    if (newSkill.value.trim()) {
      const currentSkills = form.getValues(newSkill.category) || []
      form.setValue(newSkill.category, [...currentSkills, newSkill.value.trim()])
      setNewSkill({ ...newSkill, value: '' })
    }
  }

  const removeSkill = (category: string, index: number) => {
    const currentSkills = form.getValues(category) || []
    form.setValue(category, currentSkills.filter((_: any, i: number) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Your Skills</h2>
        <p className="text-gray-600 dark:text-gray-400">Add your technical skills and expertise</p>
      </div>

      <div className="space-y-6">
        {['frontend', 'backend', 'tools'].map((category) => (
          <div key={category}>
            <label className="block text-sm font-medium mb-3 capitalize">{category} Skills</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {(form.watch(category) || []).map((skill: string, index: number) => (
                <span
                  key={index}
                  className="flex items-center gap-1 px-3 py-1 bg-accent-100 dark:bg-accent-900 text-accent-800 dark:text-accent-200 rounded-full text-sm"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(category, index)}
                    className="hover:text-red-600 transition-colors"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            {form.formState.errors[category] && (
              <p className="text-red-500 text-sm mb-2">{form.formState.errors[category].message}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <select
          value={newSkill.category}
          onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
        >
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="tools">Tools</option>
        </select>
        <input
          value={newSkill.value}
          onChange={(e) => setNewSkill({ ...newSkill, value: e.target.value })}
          onKeyPress={(e) => e.key === 'Enter' && addSkill()}
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-500 bg-white dark:bg-gray-800"
          placeholder="Add a skill..."
        />
        <motion.button
          type="button"
          onClick={addSkill}
          className="px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiPlus />
        </motion.button>
      </div>
    </div>
  )
}

function ProjectsStep({ form, fields, append, remove }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Your Projects</h2>
        <p className="text-gray-600 dark:text-gray-400">Showcase your best work</p>
      </div>

      <div className="space-y-6">
        {fields.map((field: any, index: number) => (
          <div key={field.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Project {index + 1}</h3>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiX />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Project Title</label>
                <input
                  {...form.register(`projects.${index}.title`)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-500 bg-white dark:bg-gray-800"
                  placeholder="My Awesome Project"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Technologies (comma-separated)</label>
                <input
                  {...form.register(`projects.${index}.technologies`)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-500 bg-white dark:bg-gray-800"
                  placeholder="React, Node.js, MongoDB"
                  onChange={(e) => {
                    const techs = e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                    form.setValue(`projects.${index}.technologies`, techs)
                  }}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                {...form.register(`projects.${index}.description`)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-500 bg-white dark:bg-gray-800"
                placeholder="Describe your project, its purpose, and key features..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-2">GitHub URL (optional)</label>
                <input
                  {...form.register(`projects.${index}.githubUrl`)}
                  type="url"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-500 bg-white dark:bg-gray-800"
                  placeholder="https://github.com/username/project"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Live URL (optional)</label>
                <input
                  {...form.register(`projects.${index}.liveUrl`)}
                  type="url"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-500 bg-white dark:bg-gray-800"
                  placeholder="https://myproject.com"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <motion.button
        type="button"
        onClick={() => append({
          title: '',
          description: '',
          technologies: [],
          githubUrl: '',
          liveUrl: '',
        })}
        className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-accent-500 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FiPlus />
        Add Another Project
      </motion.button>
    </div>
  )
}

function SocialStep({ form }: { form: any }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Social Links</h2>
        <p className="text-gray-600 dark:text-gray-400">Connect your social profiles (all optional)</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">GitHub Profile</label>
          <input
            {...form.register('github')}
            type="url"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-500 bg-white dark:bg-gray-800"
            placeholder="https://github.com/username"
          />
          {form.formState.errors.github && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.github.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">LinkedIn Profile</label>
          <input
            {...form.register('linkedin')}
            type="url"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-500 bg-white dark:bg-gray-800"
            placeholder="https://linkedin.com/in/username"
          />
          {form.formState.errors.linkedin && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.linkedin.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Twitter Profile</label>
          <input
            {...form.register('twitter')}
            type="url"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent-500 bg-white dark:bg-gray-800"
            placeholder="https://twitter.com/username"
          />
          {form.formState.errors.twitter && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.twitter.message}</p>
          )}
        </div>
      </div>
    </div>
  )
}