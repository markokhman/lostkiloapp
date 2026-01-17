import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export interface TelegramUser {
  id: number
  firstName: string
  lastName?: string
  username?: string
  languageCode?: string
}

// Get WebApp type from window.Telegram
type TelegramWebApp = NonNullable<typeof window.Telegram>['WebApp']

interface TelegramContextType {
  user: TelegramUser | null
  webApp: TelegramWebApp | null
  isReady: boolean
  initData: string | null
}

export const TelegramContext = createContext<TelegramContextType>({
  user: null,
  webApp: null,
  isReady: false,
  initData: null
})

export function TelegramProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<TelegramUser | null>(null)
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [initData, setInitData] = useState<string | null>(null)

  useEffect(() => {
    const tg = window.Telegram?.WebApp

    if (tg) {
      // Initialize the Web App
      tg.ready()
      tg.expand()
      
      // Store the webApp instance
      setWebApp(tg)
      
      // Get initData (raw string for backend verification)
      setInitData((tg as any).initData || null)

      // Get user from initDataUnsafe
      const tgUser = tg.initDataUnsafe?.user
      if (tgUser) {
        setUser({
          id: tgUser.id,
          firstName: tgUser.first_name,
          lastName: tgUser.last_name,
          username: tgUser.username,
          languageCode: tgUser.language_code
        })
        console.log('Telegram user loaded:', tgUser)
      } else {
        console.log('No Telegram user found in initData')
        // For development outside Telegram
        if (process.env.NODE_ENV === 'development') {
          setUser({
            id: 123456789,
            firstName: 'Test',
            lastName: 'User',
            username: 'testuser'
          })
        }
      }

      setIsReady(true)

      // Set theme colors
      document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color || '#1e293b')
      document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#ffffff')
      document.documentElement.style.setProperty('--tg-theme-button-color', tg.themeParams.button_color || '#10b981')
      document.documentElement.style.setProperty('--tg-theme-button-text-color', tg.themeParams.button_text_color || '#ffffff')
    } else {
      console.log('Telegram WebApp not available')
      // For development outside Telegram
      if (process.env.NODE_ENV === 'development') {
        setUser({
          id: 123456789,
          firstName: 'Test',
          lastName: 'User',
          username: 'testuser'
        })
        setIsReady(true)
      }
    }
  }, [])

  return (
    <TelegramContext.Provider value={{ user, webApp, isReady, initData }}>
      {children}
    </TelegramContext.Provider>
  )
}

export const useTelegram = () => useContext(TelegramContext)

// Helper hooks
export const useTelegramUser = () => {
  const { user } = useTelegram()
  return user
}

export const useHapticFeedback = () => {
  const { webApp } = useTelegram()
  
  return {
    impact: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'medium') => {
      webApp?.HapticFeedback?.impactOccurred(style)
    },
    notification: (type: 'error' | 'success' | 'warning') => {
      webApp?.HapticFeedback?.notificationOccurred(type)
    },
    selection: () => {
      webApp?.HapticFeedback?.selectionChanged()
    }
  }
}
