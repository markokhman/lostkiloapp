import { useState } from 'react'
import { useSettings } from '../context/SettingsContext'
import VideoOrText from '../components/VideoOrText'
import { getTranscript } from '../data/transcripts'
import { getThumbnailUrl } from '../lib/supabase'
import { Rocket, BookOpen, Coffee, Pill, Utensils, Heart, Star, Play, ChevronDown, AlertTriangle, FileText, Info } from 'lucide-react'

const infoItems = {
  intro: [
    { id: 'start', name: 'Начало курса', videoFile: 'Start.mp4', description: 'Вводная информация о курсе' }
  ],
  basics: [
    { id: 'activity', name: 'Об активности', videoFile: 'Activity.mp4', description: 'Как правильно организовать активность' },
    { id: 'steps', name: 'О шагах', videoFile: 'Steps.mp4', description: 'Почему важны 10-20 тысяч шагов' },
    { id: 'nutrition', name: 'О питании', videoFile: 'Питание.mp4', description: 'Принципы питания на курсе' },
    { id: 'sleep', name: 'О сне', videoFile: 'Sleep.mp4', description: 'Важность качественного сна' },
    { id: 'procedures', name: 'Процедуры', videoFile: 'Proceedures.MOV', description: 'Дополнительные процедуры' }
  ],
  drinks: [
    { id: 'bronekafe', name: 'Бронекофе', videoFile: 'Бронекофе.mp4', description: 'Рецепт и польза бронекофе' },
    { id: 'kurkuma', name: 'Куркума латте', videoFile: 'Куркума.mp4', description: 'Золотое молоко с куркумой' },
    { id: 'hot-water', name: 'Горячая вода', videoFile: 'Горячая вода.mp4', description: 'Зачем пить тёплую воду' },
    { id: 'apple-cider', name: 'Яблочный уксус', videoFile: 'Яблочный уксус.mp4', description: 'Как и зачем пить уксус' }
  ],
  supplements: [
    { id: 'mct', name: 'MCT масло', videoFile: 'МСТ.mp4', description: 'Что такое MCT и как принимать' }
  ],
  food: [
    { id: 'grapefruit', name: 'Грейпфрут', videoFile: 'Грейпфрут.mp4', description: 'Польза грейпфрута для похудения' },
    { id: 'cheese', name: 'О сыре', videoFile: 'Сыр.mp4', description: 'Какой сыр можно на курсе' },
    { id: 'chocolate', name: 'Шоколад', videoFile: 'шоколад.mp4', description: 'Можно ли шоколад?' }
  ],
  health: [
    { id: 'headache', name: 'Головная боль', videoFile: 'Головная боль.mp4', description: 'Что делать при головной боли' },
    { id: 'edema', name: 'Отёки', videoFile: 'Отеки.mp4', description: 'Как бороться с отёками' },
    { id: 'diarrhea', name: 'Диарея', videoFile: 'Диарея.mp4', description: 'Что делать при расстройстве' },
    { id: 'constipation', name: 'Запор', videoFile: 'Запор.mp4', description: 'Как справиться с запором' }
  ],
  final: [
    { id: 'life-after', name: 'Жизнь после курса', videoFile: 'Жизнь после курса.mp4', description: 'Как поддерживать результат' }
  ]
}

type Category = 'intro' | 'basics' | 'drinks' | 'supplements' | 'food' | 'health' | 'final'

const InfoPage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('basics')
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const { textMode } = useSettings()

  const categories: { id: Category; label: string; Icon: any }[] = [
    { id: 'intro', label: 'Старт', Icon: Rocket },
    { id: 'basics', label: 'Основы', Icon: BookOpen },
    { id: 'drinks', label: 'Напитки', Icon: Coffee },
    { id: 'supplements', label: 'Добавки', Icon: Pill },
    { id: 'food', label: 'Продукты', Icon: Utensils },
    { id: 'health', label: 'Здоровье', Icon: Heart },
    { id: 'final', label: 'После курса', Icon: Star }
  ]

  const getItems = () => infoItems[activeCategory]

  const toggleExpand = (itemId: string) => {
    setExpandedItem(expandedItem === itemId ? null : itemId)
  }

  return (
    <div className="min-h-screen bg-slate-900 pb-24">
      {/* Header */}
      <div className="relative h-52 overflow-hidden mb-4">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-900" />
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:16px_16px]" />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900 to-transparent">
          <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <Info size={28} className="text-blue-400" />
            Информация
          </h1>
          <p className="text-blue-200/70 text-sm">
            Полезные материалы, видео и рекомендации
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-4 -mt-4 mb-4 overflow-x-auto hide-scrollbar relative z-10">
        <div className="flex gap-2 pb-2">
          {categories.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => {
                setActiveCategory(id)
                setExpandedItem(null)
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all transform active:scale-95 ${
                activeCategory === id
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
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
              className={`bg-slate-800/60 rounded-2xl border transition-all animate-fade-in overflow-hidden ${
                isExpanded ? 'border-blue-500/50' : 'border-slate-700/50 hover:border-blue-500/30'
              }`}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Item Header */}
              <button
                onClick={() => toggleExpand(item.id)}
                className="w-full p-4 flex items-center gap-4 text-left"
              >
                <div className="w-16 h-16 rounded-xl flex-shrink-0 overflow-hidden relative bg-slate-900 group">
                  <img 
                    src={getThumbnailUrl(item.videoFile) || ''}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                  {/* Default fallback if image fails */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 -z-10" />
                  
                  {/* Play Icon Overlay - No Emoji */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play size={14} fill="currentColor" className="text-white ml-0.5" />
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white truncate pr-2">{item.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{item.description}</p>
                </div>
                
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                  isExpanded ? 'bg-blue-500 rotate-180 text-white' : 'bg-slate-700/50 text-slate-400'
                }`}>
                  <ChevronDown size={18} />
                </div>
              </button>
              
              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-0">
                  <div className="h-px w-full bg-slate-700/50 mb-4" />
                  <VideoOrText
                    videoFile={item.videoFile}
                    text={transcript}
                    title={item.name}
                    showBothByDefault={textMode}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Health Issues Note */}
      {activeCategory === 'health' && (
        <div className="px-4 mt-4">
          <div className="bg-amber-900/20 border border-amber-500/20 rounded-xl p-4 flex gap-3">
            <AlertTriangle size={24} className="text-amber-400 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-amber-300 text-sm mb-1">Важно</h3>
              <p className="text-amber-200/70 text-xs leading-relaxed">
                Эти материалы носят информационный характер. При серьёзных проблемах со здоровьем обратитесь к врачу.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Text mode info */}
      {textMode && (
        <div className="px-4 mt-4">
          <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-xl p-4 flex gap-3">
            <FileText size={24} className="text-emerald-400 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-emerald-300 text-sm mb-1">Текстовый режим</h3>
              <p className="text-emerald-200/70 text-xs leading-relaxed">
                Включён текстовый режим. Вы увидите транскрипцию вместе с видео.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InfoPage