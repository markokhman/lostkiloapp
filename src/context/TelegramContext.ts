import { createContext, useContext } from 'react'

export interface TelegramUser {
  id: number
  firstName: string
  lastName?: string
  username?: string
}

interface TelegramContextType {
  user: TelegramUser | null
}

export const TelegramContext = createContext<TelegramContextType>({ user: null })

export const useTelegram = () => {
  return useContext(TelegramContext)
}
