import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getRecipeImage, foodImages } from '../data/images'
import { Utensils, Clock, Video, Ruler, Coffee, Salad, Citrus, ShoppingBag, ChefHat } from 'lucide-react'

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

const RecipesPage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('breakfasts')
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }))
  }

  const categories: { id: Category; label: string; Icon: any }[] = [
    { id: 'breakfasts', label: 'Завтраки', Icon: Coffee },
    { id: 'dinners', label: 'Ужины', Icon: Utensils },
    { id: 'garnishes', label: 'Гарниры', Icon: Salad },
    { id: 'sauces', label: 'Соусы', Icon: Citrus },
    { id: 'extras', label: 'Прочее', Icon: ShoppingBag }
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
            <ChefHat size={28} className="text-orange-400" />
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
          {categories.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all transform active:scale-95 ${
                activeCategory === id
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <div className="px-4">
        <div className="grid grid-cols-2 gap-3">
          {getItems().map((item: any, idx: number) => {
            const imageUrl = getRecipeImage(item.id)
            const hasError = imageErrors[item.id]
            const categoryConfig = categories.find(c => c.id === activeCategory)
            const CategoryIcon = categoryConfig?.Icon || Utensils

            return (
            <Link
              key={item.id}
              to={`/recipes/${item.id}`}
              className="group relative overflow-hidden rounded-2xl border border-slate-700/50 hover:border-orange-500/50 transition-all animate-fade-in transform hover:scale-[1.02] active:scale-[0.98]"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Image or gradient background */}
              {imageUrl && !hasError ? (
                <div className="aspect-[4/3] relative">
                  <img 
                    src={imageUrl} 
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={() => handleImageError(item.id)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                </div>
              ) : (
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-800 to-slate-900 relative flex items-center justify-center">
                  <div className="bg-slate-700/50 p-4 rounded-full">
                    <CategoryIcon size={32} className="text-slate-500" />
                  </div>
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
                          <Clock size={12} />
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
                      <Video size={12} />
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
               <Utensils size={128} />
            </div>
            <h3 className="font-semibold text-emerald-300 mb-4 flex items-center gap-2">
              <Utensils size={20} />
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
            <Ruler size={24} />
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