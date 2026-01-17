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
      <nav className="fixed bottom-0 left-0 right-0 bg-[#1c1c1d]/90 backdrop-blur-md border-t border-[#38383a] safe-area-pb z-50">
        <div className="flex justify-around items-center pt-3 pb-5">
          {navItems.map(({ path, Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center py-1 px-1 transition-colors w-full ${
                isActive(path)
                  ? 'text-emerald-500'
                  : 'text-[#8e8e93]'
              }`}
            >
              <Icon strokeWidth={2} size={26} className="mb-0.5" />
              <span className="text-[10px] font-medium leading-tight">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default Layout
