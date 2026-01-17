import { createContext, useContext, ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface SettingsContextType {
  textMode: boolean
  setTextMode: (value: boolean) => void
  toggleTextMode: () => void
  coefficient: number
  setCoefficient: (value: number) => void
}

const SettingsContext = createContext<SettingsContextType>({
  textMode: false,
  setTextMode: () => {},
  toggleTextMode: () => {},
  coefficient: 1.0,
  setCoefficient: () => {},
})

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [textMode, setTextMode] = useLocalStorage('text_mode', false)
  const [coefficient, setCoefficient] = useLocalStorage('user_coefficient', 1.0)

  const toggleTextMode = () => setTextMode(!textMode)

  return (
    <SettingsContext.Provider value={{ 
      textMode, 
      setTextMode,
      toggleTextMode,
      coefficient, 
      setCoefficient 
    }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => useContext(SettingsContext)






