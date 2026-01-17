import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getRecipeImage, foodImages } from '../data/images'
import { recipes, recipesByCategory, recipeCategories, Category } from '../data/recipes'
import { Utensils, Clock, Video, Ruler, ChefHat } from 'lucide-react'

const RecipesPage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('breakfasts')
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }))
  }

  const getItems = () => {
    const ids = recipesByCategory[activeCategory]
    return ids.map(id => recipes[id]).filter(Boolean)
  }

  return (
    <div className="min-h-screen bg-slate-900 pb-24">
      {/* Hero Header with Image */}
      <div className="relative h-64 overflow-hidden">
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
          {recipeCategories.map(({ id, label, Icon }) => (
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
            const categoryConfig = recipeCategories.find(c => c.id === activeCategory)
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