import { useState } from 'react'
import { useSettings } from '../context/SettingsContext'
import VideoOrText from '../components/VideoOrText'
import { getTranscript } from '../data/transcripts'
import { getThumbnailUrl } from '../lib/supabase'

const infoItems = {
  intro: [
    { id: 'start', name: 'Начало курса', videoFile: 'Start.mp4', emoji: '🚀', description: 'Вводная информация о курсе' }
  ],
  basics: [
    { id: 'activity', name: 'Об активности', videoFile: 'Activity.mp4', emoji: '🏃', description: 'Как правильно организовать активность' },
    { id: 'steps', name: 'О шагах', videoFile: 'Steps.mp4', emoji: '👟', description: 'Почему важны 10-20 тысяч шагов' },
    { id: 'nutrition', name: 'О питании', videoFile: 'Питание.mp4', emoji: '🍽️', description: 'Принципы питания на курсе' },
    { id: 'sleep', name: 'О сне', videoFile: 'Sleep.mp4', emoji: '😴', description: 'Важность качественного сна' },
    { id: 'procedures', name: 'Процедуры', videoFile: 'Proceedures.MOV', emoji: '🧖', description: 'Дополнительные процедуры' }
  ],
  drinks: [
    { id: 'bronekafe', name: 'Бронекофе', videoFile: 'Бронекофе.mp4', emoji: '☕', description: 'Рецепт и польза бронекофе' },
    { id: 'kurkuma', name: 'Куркума латте', videoFile: 'Куркума.mp4', emoji: '🥛', description: 'Золотое молоко с куркумой' },
    { id: 'hot-water', name: 'Горячая вода', videoFile: 'Горячая вода.mp4', emoji: '♨️', description: 'Зачем пить тёплую воду' },
    { id: 'apple-cider', name: 'Яблочный уксус', videoFile: 'Яблочный уксус.mp4', emoji: '🍎', description: 'Как и зачем пить уксус' }
  ],
  supplements: [
    { id: 'mct', name: 'MCT масло', videoFile: 'МСТ.mp4', emoji: '🥥', description: 'Что такое MCT и как принимать' }
  ],
  food: [
    { id: 'grapefruit', name: 'Грейпфрут', videoFile: 'Грейпфрут.mp4', emoji: '🍊', description: 'Польза грейпфрута для похудения' },
    { id: 'cheese', name: 'О сыре', videoFile: 'Сыр.mp4', emoji: '🧀', description: 'Какой сыр можно на курсе' },
    { id: 'chocolate', name: 'Шоколад', videoFile: 'шоколад.mp4', emoji: '🍫', description: 'Можно ли шоколад?' }
  ],
  health: [
    { id: 'headache', name: 'Головная боль', videoFile: 'Головная боль.mp4', emoji: '🤕', description: 'Что делать при головной боли' },
    { id: 'edema', name: 'Отёки', videoFile: 'Отеки.mp4', emoji: '💧', description: 'Как бороться с отёками' },
    { id: 'diarrhea', name: 'Диарея', videoFile: 'Диарея.mp4', emoji: '⚠️', description: 'Что делать при расстройстве' },
    { id: 'constipation', name: 'Запор', videoFile: 'Запор.mp4', emoji: '⚠️', description: 'Как справиться с запором' }
  ],
  final: [
    { id: 'life-after', name: 'Жизнь после курса', videoFile: 'Жизнь после курса.mp4', emoji: '🌟', description: 'Как поддерживать результат' }
  ]
}

type Category = 'intro' | 'basics' | 'drinks' | 'supplements' | 'food' | 'health' | 'final'

const InfoPage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('basics')
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const { textMode } = useSettings()

  const categories: { id: Category; label: string; emoji: string }[] = [
    { id: 'intro', label: 'Старт', emoji: '🚀' },
    { id: 'basics', label: 'Основы', emoji: '📚' },
    { id: 'drinks', label: 'Напитки', emoji: '☕' },
    { id: 'supplements', label: 'Добавки', emoji: '💊' },
    { id: 'food', label: 'Продукты', emoji: '🍽️' },
    { id: 'health', label: 'Здоровье', emoji: '❤️' },
    { id: 'final', label: 'После курса', emoji: '🌟' }
  ]

  const getItems = () => infoItems[activeCategory]

  const toggleExpand = (itemId: string) => {
    setExpandedItem(expandedItem === itemId ? null : itemId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900/30 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 px-4 pt-6 pb-8">
        <h1 className="text-2xl font-bold text-white mb-2">📚 Информация</h1>
        <p className="text-blue-200/70 text-sm">
          Полезные материалы и видео
        </p>
      </div>

      {/* Category Tabs */}
      <div className="px-4 -mt-4 mb-4 overflow-x-auto hide-scrollbar">
        <div className="flex gap-2 pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id)
                setExpandedItem(null)
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span>{cat.emoji}</span>
              <span className="text-sm font-medium">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Items List */}
      <div className="px-4 space-y-3">
        {getItems().map((item) => {
          const isExpanded = expandedItem === item.id
          const transcript = getTranscript(item.videoFile)
          
          return (
            <div
              key={item.id}
              className={`bg-slate-800/80 rounded-xl overflow-hidden border transition-all ${
                isExpanded ? 'border-blue-500/50' : 'border-slate-700/50 hover:border-blue-500/30'
              }`}
            >
              {/* Item Header */}
              <button
                onClick={() => toggleExpand(item.id)}
                className="w-full p-4 flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-xl flex-shrink-0 overflow-hidden relative">
                  <img 
                    src={getThumbnailUrl(item.videoFile) || ''}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                  <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center">
                    <span className="text-2xl">{item.emoji}</span>
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-medium text-white">{item.name}</h3>
                  <p className="text-sm text-slate-400 mt-0.5">{item.description}</p>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isExpanded ? 'bg-blue-500 rotate-180' : 'bg-slate-700'
                }`}>
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-4 pb-4">
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
          <div className="bg-amber-900/30 border border-amber-500/30 rounded-xl p-4">
            <h3 className="font-semibold text-amber-300 mb-2">⚠️ Важно</h3>
            <p className="text-amber-200/70 text-sm">
              Эти материалы носят информационный характер. При серьёзных проблемах со здоровьем обратитесь к врачу.
            </p>
          </div>
        </div>
      )}

      {/* Text mode info */}
      {textMode && (
        <div className="px-4 mt-4">
          <div className="bg-emerald-900/30 border border-emerald-500/30 rounded-xl p-4">
            <h3 className="font-semibold text-emerald-300 mb-2">📖 Текстовый режим</h3>
            <p className="text-emerald-200/70 text-sm">
              Текстовый режим включён. Вы увидите транскрипцию вместе с видео.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default InfoPage
