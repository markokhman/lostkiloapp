import { Link } from 'react-router-dom'
import { useCourse } from '../context/CourseContext'
import { activityImages, getDayImage } from '../data/images'
import { getThumbnailUrl } from '../lib/supabase'
import { Calendar, CheckCircle, Lock, ArrowRight, Target } from 'lucide-react'

// Get thumbnail for each day from Supabase (video thumbnail or AI-generated image)
const getDayThumbnail = (dayNumber: number): string => {
  // Try video thumbnail first, fall back to AI-generated day image
  const videoThumb = getThumbnailUrl(`День ${dayNumber}.MOV`)
  if (videoThumb) return videoThumb
  return getDayImage(dayNumber)
}

const DaysPage = () => {
  const { progress } = useCourse()
  const currentDay = progress.currentDay || 1
  const completedDays = progress.completedDays || []

  const days = Array.from({ length: 20 }, (_, i) => ({
    number: i + 1,
    title: `День ${i + 1}`,
    thumbnail: getDayThumbnail(i + 1),
    aiImage: getDayImage(i + 1),
    isCompleted: completedDays.includes(i + 1),
    isCurrent: i + 1 === currentDay,
    isLocked: i + 1 > currentDay && !completedDays.includes(i + 1)
  }))

  // Group into weeks
  const weeks = [
    { title: 'Неделя 1', days: days.slice(0, 7) },
    { title: 'Неделя 2', days: days.slice(7, 14) },
    { title: 'Неделя 3', days: days.slice(14, 20) }
  ]

  return (
    <div className="min-h-screen bg-slate-900 pb-24">
      {/* Header */}
      <div className="relative h-36 overflow-hidden">
        <img 
          src={activityImages.morning}
          alt="Course days"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Calendar size={28} className="text-emerald-400" />
            Дни курса
          </h1>
          <p className="text-emerald-200/70 text-sm">
            {completedDays.length} из 20 дней завершено
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 -mt-2 relative z-10 mb-4">
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Общий прогресс</span>
            <span className="text-emerald-400 font-semibold">{Math.round((completedDays.length / 20) * 100)}%</span>
          </div>
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
              style={{ width: `${(completedDays.length / 20) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {[1, 5, 10, 15, 20].map((day) => (
              <span 
                key={day}
                className={`text-xs ${completedDays.includes(day) ? 'text-emerald-400' : 'text-slate-500'}`}
              >
                {day}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Weeks */}
      <div className="px-4 space-y-6">
        {weeks.map((week, weekIdx) => (
          <div key={week.title} className="animate-fade-in" style={{ animationDelay: `${weekIdx * 100}ms` }}>
            <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
              {week.title}
            </h2>
            
            <div className="grid grid-cols-7 gap-2">
              {week.days.map((day) => (
                <Link
                  key={day.number}
                  to={`/days/${day.number}`}
                  className={`relative aspect-square rounded-xl overflow-hidden group transition-all transform hover:scale-105 active:scale-95 ${
                    day.isLocked ? 'opacity-50 pointer-events-none' : ''
                  }`}
                >
                  {/* Background Image from Supabase */}
                  {day.thumbnail && (
                    <img 
                      src={day.thumbnail}
                      alt={day.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none'
                      }}
                    />
                  )}
                  {/* Fallback gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-800/50 to-teal-900/50" />
                  
                  {/* Overlays */}
                  <div className={`absolute inset-0 ${
                    day.isCurrent 
                      ? 'bg-gradient-to-t from-emerald-900/90 to-emerald-600/30 ring-2 ring-emerald-500' 
                      : day.isCompleted
                        ? 'bg-gradient-to-t from-slate-900/90 to-slate-600/30'
                        : 'bg-gradient-to-t from-slate-900/80 to-transparent'
                  } transition-all`} />
                  
                  {/* Day Number / Status Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {day.isCompleted ? (
                      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                        <CheckCircle size={20} className="text-white" />
                      </div>
                    ) : day.isLocked ? (
                      <div className="w-8 h-8 rounded-full bg-slate-600/80 flex items-center justify-center">
                        <Lock size={16} className="text-slate-400" />
                      </div>
                    ) : (
                      <span className={`text-xl font-bold ${day.isCurrent ? 'text-emerald-300' : 'text-white'}`}>
                        {day.number}
                      </span>
                    )}
                  </div>
                  
                  {/* Current Day Indicator */}
                  {day.isCurrent && (
                    <div className="absolute top-1 right-1">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="px-4 mt-6">
        <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/50">
          <h3 className="text-sm font-medium text-slate-400 mb-3">Обозначения</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-t from-emerald-900/90 to-emerald-600/30 ring-2 ring-emerald-500 flex items-center justify-center text-xs font-bold text-emerald-300">1</div>
              <span className="text-sm text-slate-400">Текущий</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                  <CheckCircle size={14} className="text-white" />
                </div>
              </div>
              <span className="text-sm text-slate-400">Завершён</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-700 opacity-50 flex items-center justify-center">
                <Lock size={16} className="text-slate-400" />
              </div>
              <span className="text-sm text-slate-400">Заблокирован</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="px-4 mt-4">
        <Link
          to={`/days/${currentDay}`}
          className="flex items-center justify-between w-full p-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl text-white font-medium hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/20"
        >
          <span className="flex items-center gap-3">
            <Target size={20} />
            <span>Перейти к дню {currentDay}</span>
          </span>
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  )
}

export default DaysPage
