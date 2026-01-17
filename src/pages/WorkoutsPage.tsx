import { useState } from 'react'
import { useSettings } from '../context/SettingsContext'
import { activityImages } from '../data/images'
import VideoOrText from '../components/VideoOrText'
import { getTranscript } from '../data/transcripts'
import { getThumbnailUrl } from '../lib/supabase'
import { Play, Dumbbell, Wind, Moon, Zap, Clock, Music, Video, ChevronDown, Activity, Footprints } from 'lucide-react'

const workouts = {
  practices: [
    { id: 'yoga', name: 'Йога практика', videoFile: 'Practice Yoga.MOV', duration: '20 мин' },
    { id: 'breathing', name: 'Дыхательные упражнения', videoFile: 'Дыхание.MOV', duration: '10 мин' },
    { id: 'thai-1', name: 'Тайская практика 1', videoFile: 'Тайская практика 1.mp4', duration: '15 мин' },
    { id: 'thai-2', name: 'Вторая тайская практика', videoFile: 'вторая тайская.mp4', duration: '15 мин' }
  ],
  workouts: [
    { id: 'home-complex', name: 'Домашний комплекс', videoFile: 'Домашний комплекс.mp4', duration: '15 мин' },
    { id: 'plank', name: 'Планка', videoFile: 'Планка.mp4', duration: '5 мин' },
    { id: 'plank-advanced', name: 'Планка усложнённая', videoFile: 'планка усложненная.MOV', duration: '5 мин' },
    { id: 'abs', name: 'Пресс', videoFile: 'Пресс.mp4', duration: '10 мин' },
    { id: 'core', name: 'Упражнения для кора', videoFile: 'кор.MOV', duration: '10 мин' },
    { id: 'tonus', name: 'Упражнения для тонуса', videoFile: 'тонус.MOV', duration: '10 мин' },
    { id: 'squats', name: 'Приседания', videoFile: 'приседания.mp4', duration: '10 мин' }
  ],
  cardio: [
    { id: 'jump-rope', name: 'Скакалка', videoFile: 'Скакалка.mp4', duration: '15 мин' },
    { id: 'jump-rope-technique', name: 'Техника скакалки', videoFile: 'Скакалка Техника.mp4', duration: '5 мин' },
    { id: 'dance-warmup', name: 'Разминка перед танцами', videoFile: 'Разминка перед танцами.mp4', duration: '10 мин' }
  ],
  procedures: [
    { id: 'vacuum-massage', name: 'Вакуумный массаж', videoFile: 'вакуумный массаж.mp4', duration: '10 мин' }
  ],
  sleep: [
    { id: 'sleep-mantra', name: 'Мантра перед сном', videoFile: 'перед сном.mp3', duration: '15 мин' }
  ]
}

type Category = 'practices' | 'workouts' | 'cardio' | 'procedures' | 'sleep'

const WorkoutsPage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('workouts')
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const { textMode } = useSettings()

  const categories: { id: Category; label: string; Icon: any }[] = [
    { id: 'practices', label: 'Практики', Icon: Wind },
    { id: 'workouts', label: 'Тренировки', Icon: Dumbbell },
    { id: 'cardio', label: 'Кардио', Icon: Zap },
    { id: 'procedures', label: 'Процедуры', Icon: Activity },
    { id: 'sleep', label: 'Сон', Icon: Moon }
  ]

  const getItems = () => workouts[activeCategory]

  return (
    <div className="min-h-screen bg-slate-900 pb-24">
      {/* Hero Header with Image */}
      <div className="relative h-80 overflow-hidden">
        <img 
          src={activityImages.workout}
          alt="Workout"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 pb-14">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Dumbbell size={28} className="text-purple-400 animate-pulse" />
            Тренировки
          </h1>
          <p className="text-purple-200/70 text-sm mt-1">
            Упражнения, практики и процедуры
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-4 -mt-6 mb-6 overflow-x-auto hide-scrollbar relative z-10">
        <div className="flex gap-2 pb-2">
          {categories.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all transform active:scale-95 ${
                activeCategory === id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{label}</span>
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
                  <div className="w-28 h-28 flex-shrink-0 relative overflow-hidden bg-slate-900">
                    <img 
                      src={getThumbnailUrl(item.videoFile) || ''}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none'
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Play size={20} fill="currentColor" className="text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-4 flex items-center">
                    <div className="flex-1 text-left">
                      <h3 className="font-medium text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock size={12} /> {item.duration}
                        </span>
                        {item.videoFile.endsWith('.mp3') ? (
                          <span className="text-xs bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Music size={10} /> Аудио
                          </span>
                        ) : (
                          <span className="text-xs bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Video size={10} /> Видео
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Expand/Collapse Button */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ml-2 ${
                      isExpanded 
                        ? 'bg-purple-500 rotate-180 text-white' 
                        : 'bg-slate-700/50 text-slate-400 group-hover:bg-purple-500/20 group-hover:text-purple-300'
                    }`}>
                      <ChevronDown size={18} />
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
            <h3 className="font-semibold text-emerald-300 mb-4 flex items-center gap-2">
              <Activity size={20} />
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
          <h3 className="font-semibold text-blue-300 mb-3 flex items-center gap-2">
            <Footprints size={20} />
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
