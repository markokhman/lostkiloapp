import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Home, Calendar, Trophy, Utensils, User } from 'lucide-react'

const Layout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const navItems = [
    { path: '/', Icon: Home, label: 'Главная' },
    { path: '/days', Icon: Calendar, label: 'Дни' },
    { path: '/leaderboard', Icon: Trophy, label: 'Рейтинг' },
    { path: '/recipes', Icon: Utensils, label: 'Рецепты' },
    { path: '/profile', Icon: User, label: 'Профиль' }
  ]

  // Main pages where BackButton should be hidden
  const mainPages = ['/', '/days', '/recipes', '/leaderboard', '/profile', '/workouts', '/trackers']
  const isMainPage = mainPages.includes(location.pathname)

  // Telegram BackButton integration
  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (!tg) return

    const handleBack = () => {
      navigate(-1)
    }

    if (isMainPage) {
      tg.BackButton.hide()
    } else {
      tg.BackButton.show()
      tg.BackButton.onClick(handleBack)
    }

    return () => {
      tg.BackButton.offClick(handleBack)
    }
  }, [location.pathname, navigate, isMainPage])

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Outlet />
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 safe-area-pb">
        <div className="flex justify-around items-center py-2">
          {navItems.map(({ path, Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all ${
                isActive(path)
                  ? 'text-emerald-500'
                  : 'text-slate-500 hover:text-slate-400'
              }`}
            >
              <Icon strokeWidth={isActive(path) ? 2.5 : 2} size={24} className="mb-1" />
              <span className="text-[10px] font-medium leading-none">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default Layout
