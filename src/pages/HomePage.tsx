import { Link } from 'react-router-dom'
import { useCourse } from '../context/CourseContext'
import { heroImages, foodImages, activityImages, avatarColors, lifestyleImages } from '../data/images'
import ProgressRing from '../components/ProgressRing'
import { ClipboardList, ShoppingCart, Play, ArrowRight, Sparkles, Rocket, Droplets, Footprints, Calendar, Utensils, Dumbbell, Trophy, Info, Settings, LayoutGrid } from 'lucide-react'

// Mock users on same day
const getMockSameDayUsers = (_day: number) => {
  const names = ['Анна', 'Мария', 'Елена', 'Ольга', 'Светлана']
  return names.slice(0, Math.floor(Math.random() * 4) + 2).map((name, idx) => ({
    name,
    emoji: ['👩', '👩‍🦰', '👩‍🦱', '👱‍♀️', '🧑'][idx],
    colorIndex: idx,
  }))
}

const HomePage = () => {
  const { progress, getCourseMode, startCourse } = useCourse()
  const mode = getCourseMode()
  const completedPercent = Math.round((progress.completedDays.length / 20) * 100)
  const today = new Date().toISOString().split('T')[0]
  const todayWater = progress.waterIntake[today] || 0
  const todaySteps = progress.stepsCount[today] || 0
  const sameDayUsers = getMockSameDayUsers(progress.currentDay || 1)

  return (
    <div className="min-h-screen bg-slate-900 pb-24">
      {/* Hero Section with Image */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={heroImages.healthy}
          alt="Healthy lifestyle"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/40 to-transparent" />
        
        {/* Decorative Icons instead of emojis */}
        <div className="absolute top-4 right-4 safe-area-pt text-emerald-400 opacity-60 animate-pulse">
           <Utensils size={32} />
        </div>
        <div className="absolute top-12 right-16 safe-area-pt text-teal-400 opacity-60 animate-pulse delay-700">
           <Dumbbell size={28} />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 pb-8">
          <h1 className="text-3xl font-bold text-white mb-1 drop-shadow-lg font-display">
            Total Detox
          </h1>
          <p className="text-emerald-300 text-sm drop-shadow font-medium">
            20-дневная трансформация тела
          </p>
        </div>
      </div>

      <div className="px-4 -mt-4 relative z-10">
        {/* Course Status Card */}
        {mode === 'not_started' ? (
          <div className="bg-gradient-to-br from-slate-800 to-slate-800/80 backdrop-blur-xl rounded-3xl p-6 mb-6 border border-slate-700/50 shadow-2xl">
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
                  <Rocket className="text-white" size={40} />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
                  <Sparkles size={16} fill="currentColor" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Готовы к переменам?</h2>
              <p className="text-slate-400 text-sm mb-6">
                20 дней до нового тела и образа жизни
              </p>
              
              <div className="space-y-3">
                <Link
                  to="/preparation"
                  className="flex items-center justify-between w-full py-3 px-4 bg-slate-700/50 hover:bg-slate-700 rounded-xl text-white transition-all group border border-transparent hover:border-slate-600"
                >
                  <span className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <ClipboardList size={20} />
                    </div>
                    <span className="font-medium">Чеклист подготовки</span>
                  </span>
                  <ArrowRight size={18} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </Link>
                <Link
                  to="/shopping"
                  className="flex items-center justify-between w-full py-3 px-4 bg-slate-700/50 hover:bg-slate-700 rounded-xl text-white transition-all group border border-transparent hover:border-slate-600"
                >
                  <span className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                      <ShoppingCart size={20} />
                    </div>
                    <span className="font-medium">Список покупок</span>
                  </span>
                  <ArrowRight size={18} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </Link>
                <button
                  onClick={startCourse}
                  className="w-full py-4 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl text-white font-bold transition-all shadow-lg shadow-emerald-500/25 transform hover:scale-[1.02] active:scale-[0.98] mt-2"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Play size={20} fill="currentColor" />
                    <span>Начать курс</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Active Course Card */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-800/80 backdrop-blur-xl rounded-3xl p-5 mb-4 border border-slate-700/50 shadow-2xl">
              <div className="flex items-center gap-4">
                <ProgressRing progress={completedPercent} size={90} strokeWidth={8} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-white">
                      День {progress.currentDay}
                    </h2>
                    <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-medium">
                      из 20
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mt-1">
                    {progress.completedDays.length} дней завершено
                  </p>
                  <Link
                    to={`/days/${progress.currentDay}`}
                    className="inline-flex items-center gap-2 mt-3 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl text-white text-sm font-medium transition-all shadow-lg shadow-emerald-500/20 transform hover:scale-105 active:scale-95"
                  >
                    <span>Продолжить</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

            {/* People on Same Day */}
            <Link 
              to="/leaderboard"
              className="block bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-2xl p-4 mb-4 border border-purple-500/30 hover:border-purple-500/50 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {sameDayUsers.slice(0, 4).map((user, idx) => (
                      <div 
                        key={idx}
                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColors[user.colorIndex]} flex items-center justify-center text-lg border-2 border-slate-900`}
                      >
                        {user.emoji}
                      </div>
                    ))}
                    {sameDayUsers.length > 4 && (
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white border-2 border-slate-900 font-medium">
                        +{sameDayUsers.length - 4}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">
                      {sameDayUsers.length} участников
                    </p>
                    <p className="text-purple-300 text-xs">на {progress.currentDay} дне курса</p>
                  </div>
                </div>
                <ArrowRight size={18} className="text-purple-300 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Today's Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Link to="/trackers" className="relative overflow-hidden bg-gradient-to-br from-blue-900/50 to-blue-800/30 rounded-2xl p-4 border border-blue-500/30 group hover:border-blue-500/50 transition-all">
                <img 
                  src={foodImages.water} 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity"
                />
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-2">
                    <Droplets size={20} fill="currentColor" className="opacity-80" />
                  </div>
                  <div className="text-2xl font-bold text-white">{todayWater}ml</div>
                  <div className="text-xs text-blue-300">из 3000ml</div>
                  <div className="mt-2 h-1.5 bg-slate-800/80 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all"
                      style={{ width: `${Math.min((todayWater / 3000) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </Link>
              <Link to="/trackers" className="relative overflow-hidden bg-gradient-to-br from-emerald-900/50 to-emerald-800/30 rounded-2xl p-4 border border-emerald-500/30 group hover:border-emerald-500/50 transition-all">
                <img 
                  src={activityImages.walking} 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity"
                />
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
                     <Footprints size={20} fill="currentColor" className="opacity-80" />
                  </div>
                  <div className="text-2xl font-bold text-white">{todaySteps.toLocaleString()}</div>
                  <div className="text-xs text-emerald-300">из {progress.currentDay >= 8 ? '15000' : '10000'}</div>
                  <div className="mt-2 h-1.5 bg-slate-800/80 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all"
                      style={{ width: `${Math.min((todaySteps / (progress.currentDay >= 8 ? 15000 : 10000)) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </Link>
            </div>
          </>
        )}

        {/* Quick Actions with Images */}
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <LayoutGrid size={20} className="text-emerald-400" />
          <span>Разделы курса</span>
        </h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { to: '/days', image: lifestyleImages.morning, Icon: Calendar, title: 'Дни курса', subtitle: '20 дней программы', gradient: 'from-emerald-600/40 to-teal-600/40', border: 'border-emerald-500/30' },
            { to: '/recipes', image: foodImages.salmon, Icon: Utensils, title: 'Рецепты', subtitle: 'Завтраки и ужины', gradient: 'from-orange-600/40 to-red-600/40', border: 'border-orange-500/30' },
            { to: '/workouts', image: activityImages.workout, Icon: Dumbbell, title: 'Тренировки', subtitle: 'Упражнения', gradient: 'from-purple-600/40 to-pink-600/40', border: 'border-purple-500/30' },
            { to: '/leaderboard', image: lifestyleImages.success, Icon: Trophy, title: 'Лидерборд', subtitle: 'Участники курса', gradient: 'from-amber-600/40 to-orange-600/40', border: 'border-amber-500/30' },
          ].map(({ to, image, Icon, title, subtitle, gradient, border }) => (
            <Link 
              key={to}
              to={to} 
              className={`relative overflow-hidden rounded-2xl border ${border} hover:scale-[1.02] transition-all group aspect-[4/3]`}
            >
              <img 
                src={image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
              <div className="relative p-4 h-full flex flex-col justify-end">
                <div className="absolute top-3 right-3 text-white/80 group-hover:scale-110 transition-transform bg-black/20 p-2 rounded-lg backdrop-blur-sm">
                    <Icon size={20} />
                </div>
                <div className="font-bold text-white text-lg leading-tight">{title}</div>
                <div className="text-xs text-white/80 mt-1 font-medium">{subtitle}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Utilities */}
        <div className="space-y-2">
          {[
            { to: '/preparation', Icon: ClipboardList, color: 'text-emerald-400', bg: 'bg-emerald-500/10', title: 'Подготовка к курсу', subtitle: `${progress.preparationChecklist.length}/8 выполнено` },
            { to: '/shopping', Icon: ShoppingCart, color: 'text-blue-400', bg: 'bg-blue-500/10', title: 'Список покупок', subtitle: 'Продукты и добавки' },
            { to: '/trackers', Icon: LayoutGrid, color: 'text-purple-400', bg: 'bg-purple-500/10', title: 'Трекеры', subtitle: 'Вода, шаги, замеры' },
            { to: '/info', Icon: Info, color: 'text-amber-400', bg: 'bg-amber-500/10', title: 'Информация', subtitle: 'Полезные материалы' },
            { to: '/profile', Icon: Settings, color: 'text-slate-400', bg: 'bg-slate-500/10', title: 'Настройки', subtitle: 'Коэффициент, режим' },
          ].map(({ to, Icon, color, bg, title, subtitle }) => (
            <Link 
              key={to}
              to={to} 
              className="flex items-center justify-between bg-slate-800/60 rounded-xl p-4 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
                   <Icon size={20} />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{title}</div>
                  <div className="text-xs text-slate-400">{subtitle}</div>
                </div>
              </div>
              <ArrowRight size={18} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage
