import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getRecipeImage, foodImages } from '../data/images'

// SVG Icons
const CookingIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const VideoIcon = () => (
  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
)

const RulerIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
)

const breakfasts = [
  { id: 'bowl', name: 'Боул (конструктор)', time: '15 мин' },
  { id: 'omelet-caprese', name: 'Омлет капрезе', time: '10 мин' },
  { id: 'coconut-porridge', name: 'Кокосовая каша', time: '15 мин' },
  { id: 'cottage-cheese', name: 'Творог деревенский', time: '5 мин' },
  { id: 'yogurt', name: 'Йогурт с мюсли', time: '5 мин' },
  { id: 'syrniki', name: 'Сырники', time: '20 мин' },
  { id: 'french-pancakes', name: 'Французские блины', time: '25 мин' },
  { id: 'scramble', name: 'Скрэмбл с лососем', time: '10 мин' },
  { id: 'flax-porridge', name: 'Льняная каша', time: '20 мин' }
]

const dinners = [
  { id: 'frittata', name: 'Пикантная фриттата', time: '25 мин', video: true },
  { id: 'cauliflower-pie', name: 'Пирог из цветной капусты', time: '40 мин', video: true },
  { id: 'simple-cutlets', name: 'Простейшие котлеты', time: '35 мин', video: true },
  { id: 'shawarma', name: 'Великолепная шаверма', time: '40 мин', video: true },
  { id: 'shrimp-avocado-salad', name: 'Салат с креветками', time: '15 мин' },
  { id: 'salmon-dor-blue', name: 'Лосось с дор блю', time: '30 мин' },
  { id: 'salmon-quinoa-cutlets', name: 'Биточки из лосося', time: '35 мин' },
  { id: 'squid-egg-salad', name: 'Салат с кальмаром', time: '20 мин' },
  { id: 'salmon-tartare', name: 'Тартар из лосося', time: '15 мин', video: true },
  { id: 'ceviche', name: 'Севиче', time: '70 мин', video: true },
  { id: 'mussels-cream', name: 'Мидии в сливках', time: '20 мин', video: true },
  { id: 'eggplant-burrata', name: 'Баклажан с бурратой', time: '20 мин', video: true },
  { id: 'stuffed-chicken', name: 'Куриные грудки фарш.', time: '35 мин', video: true },
  { id: 'duck-prunes', name: 'Утка с черносливом', time: '60 мин' }
]

const garnishes = [
  { id: 'cabbage-salad', name: 'Салат из капусты', note: '200-250г' },
  { id: 'fermented-vegetables', name: 'Квашеные овощи', note: 'до 100г' },
  { id: 'fresh-salad', name: 'Свежий салат', note: '180-200г' }
]

const sauces = [
  { id: 'balsamic', name: 'Оливки и бальзамик' },
  { id: 'honey-mustard', name: 'Медово-горчичная' },
  { id: 'pesto', name: 'Песто' },
  { id: 'ranch', name: 'Ранч' },
  { id: 'caesar', name: 'Цезарь' },
  { id: 'tonnato', name: 'Вителло Тоннато' }
]

const extras = [
  { id: 'smoothie-green-1', name: 'Смузи Green 1' },
  { id: 'smoothie-green-2', name: 'Смузи Green 2' },
  { id: 'flax-snacks', name: 'Льняные снэки' },
  { id: 'paleo-bread', name: 'Палео-хлеб' },
  { id: 'homemade-kefir', name: 'Домашний кефир' },
  { id: 'quick-bread', name: 'Быстрый хлеб' }
]

type Category = 'breakfasts' | 'dinners' | 'garnishes' | 'sauces' | 'extras'

// Category icons using SVG
const categoryIcons: Record<Category, JSX.Element> = {
  breakfasts: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  dinners: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  ),
  garnishes: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
    </svg>
  ),
  sauces: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  extras: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  )
}

const RecipesPage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('breakfasts')

  const categories: { id: Category; label: string }[] = [
    { id: 'breakfasts', label: 'Завтраки' },
    { id: 'dinners', label: 'Ужины' },
    { id: 'garnishes', label: 'Гарниры' },
    { id: 'sauces', label: 'Соусы' },
    { id: 'extras', label: 'Прочее' }
  ]

  const getItems = () => {
    switch (activeCategory) {
      case 'breakfasts': return breakfasts
      case 'dinners': return dinners
      case 'garnishes': return garnishes
      case 'sauces': return sauces
      case 'extras': return extras
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 pb-24">
      {/* Hero Header with Image */}
      <div className="relative h-44 overflow-hidden">
        <img 
          src={foodImages.salmon}
          alt="Delicious food"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <CookingIcon />
            Рецепты
          </h1>
          <p className="text-orange-200/70 text-sm">
            Вкусная и здоровая еда
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
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {categoryIcons[cat.id]}
              <span className="text-sm font-medium">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <div className="px-4">
        <div className="grid grid-cols-2 gap-3">
          {getItems().map((item: any, idx: number) => {
            const imageUrl = getRecipeImage(item.id)
            return (
            <Link
              key={item.id}
              to={`/recipes/${item.id}`}
              className="group relative overflow-hidden rounded-2xl border border-slate-700/50 hover:border-orange-500/50 transition-all animate-fade-in transform hover:scale-[1.02] active:scale-[0.98]"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Image or gradient background */}
              {imageUrl ? (
                <div className="aspect-[4/3] relative">
                  <img 
                    src={imageUrl} 
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                </div>
              ) : (
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 relative">
                  {/* Decorative pattern instead of emoji */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-4 left-4 w-8 h-8 border-2 border-orange-400/50 rounded-full" />
                    <div className="absolute bottom-8 right-4 w-6 h-6 border-2 border-orange-400/50 rounded-lg rotate-45" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 border-orange-400/30 rounded-full" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                </div>
              )}
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-white text-sm leading-tight">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {item.time && (
                        <span className="text-xs text-orange-300/80 flex items-center gap-1">
                          <ClockIcon />
                          {item.time}
                        </span>
                      )}
                      {item.note && (
                        <span className="text-xs text-slate-400">{item.note}</span>
                      )}
                    </div>
                  </div>
                  {item.video && (
                    <span className="text-xs bg-orange-500/30 backdrop-blur-sm text-orange-200 px-2 py-1 rounded-lg flex items-center gap-1">
                      <VideoIcon />
                    </span>
                  )}
                </div>
              </div>
            </Link>
          )}
          )}
        </div>

        {/* Dinner Constructor Info */}
        {activeCategory === 'dinners' && (
          <div className="mt-6 bg-gradient-to-br from-emerald-900/40 to-teal-900/40 rounded-2xl p-5 border border-emerald-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="font-semibold text-emerald-300 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Конструктор ужина
            </h3>
            <div className="space-y-4 text-sm relative">
              {[
                { num: 1, title: 'Открываемся сыром', desc: '50г сыра от 45% (× коэффициент)' },
                { num: 2, title: 'Выбираем мясо', desc: 'Курица 180-200г / Рыба 220г / Телятина 200г' },
                { num: 3, title: 'Добавляем гарнир', desc: 'Салат из капусты / Свежие овощи / Квашеные овощи' },
              ].map((step) => (
                <div key={step.num} className="flex items-start gap-3">
                  <span className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-lg flex-shrink-0">
                    {step.num}
                  </span>
                  <div>
                    <span className="text-white font-medium">{step.title}</span>
                    <p className="text-emerald-200/70 text-xs mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Coefficient reminder */}
        <div className="mt-4 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30 rounded-2xl p-4 flex items-center gap-4">
          <div className="text-blue-400">
            <RulerIcon />
          </div>
          <div>
            <h3 className="font-semibold text-blue-300">Коэффициент</h3>
            <p className="text-blue-200/70 text-sm">
              Все порции умножаются на ваш персональный коэффициент
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipesPage
