import React, { createContext, useContext, ReactNode } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

interface CourseProgress {
  currentDay: number
  startDate: string | null
  completedDays: number[]
  completedTasks: Record<string, string[]>
  measurements: {
    initial: { weight?: number; waist?: number; hips?: number; date?: string }
    week1: { weight?: number; waist?: number; hips?: number; date?: string }
    week2: { weight?: number; waist?: number; hips?: number; date?: string }
    final: { weight?: number; waist?: number; hips?: number; date?: string }
  }
  coefficient: number
  preparationChecklist: string[]
  shoppingChecklist: string[]
  waterIntake: Record<string, number>
  stepsCount: Record<string, number>
  notes: Record<string, string>
}

interface CourseContextType {
  progress: CourseProgress
  startCourse: () => void
  completeDay: (day: number) => void
  completeTask: (day: number, taskId: string) => void
  isTaskCompleted: (day: number, taskId: string) => boolean
  updateMeasurements: (period: keyof CourseProgress['measurements'], data: Partial<CourseProgress['measurements']['initial']>) => void
  setCoefficient: (value: number) => void
  togglePreparationItem: (itemId: string) => void
  toggleShoppingItem: (itemId: string) => void
  logWater: (date: string, amount: number) => void
  logSteps: (date: string, count: number) => void
  addNote: (date: string, note: string) => void
  getCourseMode: () => 'not_started' | 'preparation' | 'active' | 'completed'
  getDayStatus: (day: number) => 'locked' | 'current' | 'completed' | 'available'
}

const defaultProgress: CourseProgress = {
  currentDay: 0,
  startDate: null,
  completedDays: [],
  completedTasks: {},
  measurements: {
    initial: {},
    week1: {},
    week2: {},
    final: {}
  },
  coefficient: 1.0,
  preparationChecklist: [],
  shoppingChecklist: [],
  waterIntake: {},
  stepsCount: {},
  notes: {}
}

const CourseContext = createContext<CourseContextType | undefined>(undefined)

export const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useLocalStorage<CourseProgress>('courseProgress', defaultProgress)

  const startCourse = () => {
    setProgress(prev => ({
      ...prev,
      currentDay: 1,
      startDate: new Date().toISOString().split('T')[0]
    }))
  }

  const completeDay = (day: number) => {
    setProgress(prev => ({
      ...prev,
      completedDays: [...new Set([...prev.completedDays, day])],
      currentDay: Math.max(prev.currentDay, day + 1)
    }))
  }

  const completeTask = (day: number, taskId: string) => {
    const dayKey = `day-${day}`
    setProgress(prev => {
      const dayTasks = prev.completedTasks[dayKey] || []
      if (dayTasks.includes(taskId)) {
        return {
          ...prev,
          completedTasks: {
            ...prev.completedTasks,
            [dayKey]: dayTasks.filter(t => t !== taskId)
          }
        }
      }
      return {
        ...prev,
        completedTasks: {
          ...prev.completedTasks,
          [dayKey]: [...dayTasks, taskId]
        }
      }
    })
  }

  const isTaskCompleted = (day: number, taskId: string): boolean => {
    const dayKey = `day-${day}`
    return progress.completedTasks[dayKey]?.includes(taskId) || false
  }

  const updateMeasurements = (period: keyof CourseProgress['measurements'], data: Partial<CourseProgress['measurements']['initial']>) => {
    setProgress(prev => ({
      ...prev,
      measurements: {
        ...prev.measurements,
        [period]: { ...prev.measurements[period], ...data, date: new Date().toISOString().split('T')[0] }
      }
    }))
  }

  const setCoefficient = (value: number) => {
    setProgress(prev => ({ ...prev, coefficient: value }))
  }

  const togglePreparationItem = (itemId: string) => {
    setProgress(prev => {
      const items = prev.preparationChecklist
      if (items.includes(itemId)) {
        return { ...prev, preparationChecklist: items.filter(i => i !== itemId) }
      }
      return { ...prev, preparationChecklist: [...items, itemId] }
    })
  }

  const toggleShoppingItem = (itemId: string) => {
    setProgress(prev => {
      const items = prev.shoppingChecklist
      if (items.includes(itemId)) {
        return { ...prev, shoppingChecklist: items.filter(i => i !== itemId) }
      }
      return { ...prev, shoppingChecklist: [...items, itemId] }
    })
  }

  const logWater = (date: string, amount: number) => {
    setProgress(prev => ({
      ...prev,
      waterIntake: { ...prev.waterIntake, [date]: (prev.waterIntake[date] || 0) + amount }
    }))
  }

  const logSteps = (date: string, count: number) => {
    setProgress(prev => ({
      ...prev,
      stepsCount: { ...prev.stepsCount, [date]: count }
    }))
  }

  const addNote = (date: string, note: string) => {
    setProgress(prev => ({
      ...prev,
      notes: { ...prev.notes, [date]: note }
    }))
  }

  const getCourseMode = (): 'not_started' | 'preparation' | 'active' | 'completed' => {
    if (!progress.startDate) return 'not_started'
    if (progress.completedDays.length >= 20) return 'completed'
    return 'active'
  }

  const getDayStatus = (day: number): 'locked' | 'current' | 'completed' | 'available' => {
    if (progress.completedDays.includes(day)) return 'completed'
    if (day === progress.currentDay) return 'current'
    if (day < progress.currentDay) return 'available'
    return 'available' // Allow access to any day
  }

  return (
    <CourseContext.Provider value={{
      progress,
      startCourse,
      completeDay,
      completeTask,
      isTaskCompleted,
      updateMeasurements,
      setCoefficient,
      togglePreparationItem,
      toggleShoppingItem,
      logWater,
      logSteps,
      addNote,
      getCourseMode,
      getDayStatus
    }}>
      {children}
    </CourseContext.Provider>
  )
}

export const useCourse = () => {
  const context = useContext(CourseContext)
  if (context === undefined) {
    throw new Error('useCourse must be used within a CourseProvider')
  }
  return context
}





