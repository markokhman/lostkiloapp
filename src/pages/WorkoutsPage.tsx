import { useState } from 'react'
import { useSettings } from '../context/SettingsContext'
import { activityImages } from '../data/images'
import VideoOrText from '../components/VideoOrText'
import { getTranscript } from '../data/transcripts'
import { getThumbnailUrl } from '../lib/supabase'

const workouts = {
  practices: [
    { id: 'yoga', name: 'Йога практика', videoFile: 'Practice Yoga.MOV', duration: '20 мин', emoji: '🧘' },
    { id: 'breathing', name: 'Дыхательные упражнения', videoFile: 'Дыхание.MOV', duration: '10 мин', emoji: '🌬️' },
    { id: 'thai-1', name: 'Тайская практика 1', videoFile: 'Тайская практика 1.mp4', duration: '15 мин', emoji: '🙏' },
    { id: 'thai-2', name: 'Вторая тайская практика', videoFile: 'вторая тайская.mp4', duration: '15 мин', emoji: '🙏' }
  ],
  workouts: [
    { id: 'home-complex', name: 'Домашний комплекс', videoFile: 'Домашний комплекс.mp4', duration: '15 мин', emoji: '🏠' },
    { id: 'plank', name: 'Планка', videoFile: 'Планка.mp4', duration: '5 мин', emoji: '🧱' },
    { id: 'plank-advanced', name: 'Планка усложнённая', videoFile: 'планка усложненная.MOV', duration: '5 мин', emoji: '💪' },
    { id: 'abs', name: 'Пресс', videoFile: 'Пресс.mp4', duration: '10 мин', emoji: '🔥' },
    { id: 'core', name: 'Упражнения для кора', videoFile: 'кор.MOV', duration: '10 мин', emoji: '🎯' },
    { id: 'tonus', name: 'Упражнения для тонуса', videoFile: 'тонус.MOV', duration: '10 мин', emoji: '✨' },
    { id: 'squats', name: 'Приседания', videoFile: 'приседания.mp4', duration: '10 мин', emoji: '🦵' }
  ],
  cardio: [
    { id: 'jump-rope', name: 'Скакалка', videoFile: 'Скакалка.mp4', duration: '15 мин', emoji: '⚡' },
    { id: 'jump-rope-technique', name: 'Техника скакалки', videoFile: 'Скакалка Техника.mp4', duration: '5 мин', emoji: '📚' },
    { id: 'dance-warmup', name: 'Разминка перед танцами', videoFile: 'Разминка перед танцами.mp4', duration: '10 мин', emoji: '💃' }
  ],
  procedures: [
    { id: 'vacuum-massage', name: 'Вакуумный массаж', videoFile: 'вакуумный массаж.mp4', duration: '10 мин', emoji: '🌀' }
  ],
  sleep: [
    { id: 'sleep-mantra', name: 'Мантра перед сном', videoFile: 'перед сном.mp3', duration: '15 мин', emoji: '🎶' }
  ]
}

type Category = 'practices' | 'workouts' | 'cardio' | 'procedures' | 'sleep'

const WorkoutsPage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('workouts')
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const { textMode } = useSettings()

  const categories: { id: Category; label: string; emoji: string }[] = [
    { id: 'practices', label: 'Практики', emoji: '🧘' },
    { id: 'workouts', label: 'Тренировки', emoji: '💪' },
    { id: 'cardio', label: 'Кардио', emoji: '⚡' },
    { id: 'procedures', label: 'Процедуры', emoji: '🌀' },
    { id: 'sleep', label: 'Сон', emoji: '🌙' }
  ]

  const getItems = () => workouts[activeCategory]

  return (
    <div className="min-h-screen bg-slate-900 pb-24">
      {/* Hero Header with Image */}
      <div className="relative h-44 overflow-hidden">
        <img 
          src={activityImages.workout}
          alt="Workout"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-transparent" />
        
        {/* Floating elements */}
        <div className="absolute top-4 right-4 text-4xl animate-bounce">💪</div>
        <div className="absolute top-12 right-16 text-3xl animate-bounce" style={{ animationDelay: '0.5s' }}>🔥</div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="animate-pulse">🏋️</span>
            Тренировки
          </h1>
          <p className="text-purple-200/70 text-sm">
            Упражнения, практики и процедуры
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-4 -mt-4 mb-4 overflow-x-auto hide-scrollbar relative z-10">
        <div className="flex gap-2 pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all transform active:scale-95 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span className="text-lg">{cat.emoji}</span>
              <span className="text-sm font-medium">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Items List */}
      <div className="px-4 space-y-3">
        {getItems().map((item, idx) => {
          const isExpanded = expandedItem === item.id
          const transcript = getTranscript(item.videoFile)
          
          return (
            <div
              key={item.id}
              className={`group relative overflow-hidden bg-slate-800/60 rounded-2xl border transition-all animate-fade-in ${
                isExpanded ? 'border-purple-500/50' : 'border-slate-700/50 hover:border-purple-500/30'
              }`}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Header - always visible */}
              <button
                onClick={() => setExpandedItem(isExpanded ? null : item.id)}
                className="w-full"
              >
                <div className="flex">
                  {/* Image - use Supabase thumbnail */}
                  <div className="w-28 h-28 flex-shrink-0 relative overflow-hidden">
                    <img 
                      src={getThumbnailUrl(item.videoFile) || ''}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        // Hide broken image and show emoji fallback
                        (e.target as HTMLImageElement).style.display = 'none'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 to-pink-600/40 flex items-center justify-center">
                      <span className="text-4xl">{item.emoji}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-800/80" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-4 flex items-center">
                    <div className="flex-1 text-left">
                      <h3 className="font-medium text-white group-hover:text-purple-300 transition-colors">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <span>⏱️</span> {item.duration}
                        </span>
                        {item.videoFile.endsWith('.mp3') ? (
                          <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">🎵 Аудио</span>
                        ) : (
                          <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">📹 Видео</span>
                        )}
                      </div>
                    </div>
                    
                    {/* Expand/Collapse Button */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      isExpanded 
                        ? 'bg-purple-500 rotate-180' 
                        : 'bg-gradient-to-br from-purple-500 to-pink-500'
                    }`}>
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
              
              {/* Expanded content - video and transcript */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-slate-700/50">
                  <div className="pt-4">
                    <VideoOrText
                      videoFile={item.videoFile}
                      text={transcript}
                      title={item.name}
                      showBothByDefault={textMode}
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Plank Progression */}
      {activeCategory === 'workouts' && (
        <div className="px-4 mt-6">
          <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900/40 to-teal-900/40 rounded-2xl p-5 border border-emerald-500/30">
            <div className="absolute top-0 right-0 text-8xl opacity-10">🧱</div>
            <h3 className="font-semibold text-emerald-300 mb-4 flex items-center gap-2">
              <span className="text-2xl animate-pulse">🧱</span>
              Прогрессия планки
            </h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { week: 'Неделя 1', time: '60 сек', active: true },
                { week: 'Неделя 2', time: '70-120 сек', active: false },
                { week: 'Неделя 3', time: '120+ сек', active: false },
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className={`p-3 rounded-xl ${item.active ? 'bg-emerald-500/20 ring-2 ring-emerald-500/50' : 'bg-slate-800/50'}`}
                >
                  <div className="text-xs text-slate-400">{item.week}</div>
                  <div className={`text-lg font-bold ${item.active ? 'text-emerald-400' : 'text-white'}`}>{item.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Steps Info */}
      <div className="px-4 mt-4">
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-500/30 rounded-2xl p-4">
          <div className="absolute top-0 right-0 text-6xl opacity-10">👟</div>
          <h3 className="font-semibold text-blue-300 mb-3 flex items-center gap-2">
            <span className="text-xl">👟</span>
            Не забывайте о шагах!
          </h3>
          <div className="space-y-2 text-sm">
            {[
              { week: 'Неделя 1', steps: '10,000', color: 'text-blue-300' },
              { week: 'Неделя 2', steps: '15,000', color: 'text-cyan-300' },
              { week: 'Неделя 3', steps: '20,000', color: 'text-teal-300' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between bg-slate-800/30 rounded-lg px-3 py-2">
                <span className="text-slate-400">{item.week}</span>
                <span className={`font-semibold ${item.color}`}>{item.steps} шагов</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkoutsPage
