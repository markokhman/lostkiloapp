import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import DaysPage from './pages/DaysPage'
import DayDetailPage from './pages/DayDetailPage'
import RecipesPage from './pages/RecipesPage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import WorkoutsPage from './pages/WorkoutsPage'
import TrackersPage from './pages/TrackersPage'
import ProfilePage from './pages/ProfilePage'
import PreparationPage from './pages/PreparationPage'
import ShoppingPage from './pages/ShoppingPage'
import InfoPage from './pages/InfoPage'
import LeaderboardPage from './pages/LeaderboardPage'
import { TelegramContext, TelegramUser } from './context/TelegramContext'
import { SettingsProvider } from './context/SettingsContext'
import { CourseProvider } from './context/CourseContext'

function App() {
  const [user, setUser] = useState<TelegramUser | null>(null)
  const [webApp, setWebApp] = useState<typeof window.Telegram.WebApp | null>(null)
  const [initData, setInitData] = useState<string | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (tg) {
      tg.ready()
      tg.expand()
      tg.enableClosingConfirmation()
      
      setWebApp(tg)
      setInitData((tg as any).initData || null)
      
      if (tg.initDataUnsafe?.user) {
        setUser({
          id: tg.initDataUnsafe.user.id,
          firstName: tg.initDataUnsafe.user.first_name,
          lastName: tg.initDataUnsafe.user.last_name,
          username: tg.initDataUnsafe.user.username,
        })
      }
      
      // Apply Telegram theme
      document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color || '#0f172a')
      document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#f8fafc')
      document.documentElement.style.setProperty('--tg-theme-hint-color', tg.themeParams.hint_color || '#94a3b8')
      document.documentElement.style.setProperty('--tg-theme-button-color', tg.themeParams.button_color || '#22c55e')
      
      setIsReady(true)
    } else {
      // Development mode without Telegram
      setUser({
        id: 123456789,
        firstName: 'Тест',
        lastName: 'Пользователь',
        username: 'testuser',
      })
      setIsReady(true)
    }
  }, [])

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <TelegramContext.Provider value={{ user, webApp, isReady, initData }}>
      <SettingsProvider>
        <CourseProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="preparation" element={<PreparationPage />} />
              <Route path="shopping" element={<ShoppingPage />} />
              <Route path="days" element={<DaysPage />} />
              <Route path="days/:dayId" element={<DayDetailPage />} />
              <Route path="recipes" element={<RecipesPage />} />
              <Route path="recipes/:recipeId" element={<RecipeDetailPage />} />
              <Route path="workouts" element={<WorkoutsPage />} />
              <Route path="info" element={<InfoPage />} />
              <Route path="leaderboard" element={<LeaderboardPage />} />
              <Route path="trackers" element={<TrackersPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </CourseProvider>
      </SettingsProvider>
    </TelegramContext.Provider>
  )
}

export default App
