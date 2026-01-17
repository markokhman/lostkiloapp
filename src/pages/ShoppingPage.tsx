import { useState } from 'react'
import { useCourse } from '../context/CourseContext'

interface ShoppingItem {
  id: string
  name: string
  amount: string
  note?: string
}

interface ShoppingCategory {
  id: string
  title: string
  emoji: string
  items: ShoppingItem[]
}

const shoppingData: ShoppingCategory[] = [
  {
    id: 'supplements',
    title: 'Добавки (обязательные)',
    emoji: '💊',
    items: [
      { id: 'sup-1', name: 'Гарциния Камбоджийская', amount: 'упаковка', note: '2 капсулы за час до еды' },
      { id: 'sup-2', name: 'Калий (Potassium)', amount: '400 мг/день', note: 'с едой' },
      { id: 'sup-3', name: 'Капсаицин (Cayenne)', amount: 'упаковка', note: '2 капсулы после еды' },
      { id: 'sup-4', name: 'L-Триптофан', amount: '500-1000 мг/день', note: 'перед сном' },
      { id: 'sup-5', name: 'Яблочный уксус 5%', amount: '1 бутылка', note: 'или кокосовый' },
      { id: 'sup-6', name: 'MCT Oil (масло МСТ)', amount: '1 бутылка', note: 'спортивный магазин' },
      { id: 'sup-7', name: 'Магний (хелатная форма)', amount: '800-1000 мг/день', note: '5 дней пить, 2 дня перерыв' }
    ]
  },
  {
    id: 'supplements-opt',
    title: 'Добавки (рекомендуемые)',
    emoji: '✨',
    items: [
      { id: 'sup-opt-1', name: 'Хлорофилл жидкий', amount: '1 бутылка', note: '5 мл утром натощак' },
      { id: 'sup-opt-2', name: 'Псиллиум', amount: '1 упаковка', note: 'для рецептов' },
      { id: 'sup-opt-3', name: 'Витамины группы B', amount: '1 упаковка', note: 'помогает худеть' },
      { id: 'sup-opt-4', name: 'Инулин', amount: '1 упаковка', note: 'пребиотик' },
      { id: 'sup-opt-5', name: 'Электролиты', amount: '1 упаковка', note: 'Ca, Mg, K, Na' },
      { id: 'sup-opt-6', name: 'Витамин D', amount: '1 упаковка', note: '10000 IU → 5000 → 2000' },
      { id: 'sup-opt-7', name: 'Омега-3', amount: '1 упаковка', note: '4000 мг/день с едой' },
      { id: 'sup-opt-8', name: 'Цинк', amount: '1 упаковка', note: 'кожа, волосы, иммунитет' },
      { id: 'sup-opt-9', name: 'Ромашковый чай', amount: '1 упаковка', note: 'перед сном' }
    ]
  },
  {
    id: 'supplements-extra',
    title: 'Добавки (по необходимости)',
    emoji: '🌿',
    items: [
      { id: 'sup-ext-1', name: 'Кудзу (Kudzu)', amount: '1 упаковка', note: 'снимает тягу к алкоголю' },
      { id: 'sup-ext-2', name: 'Пустырник', amount: '1 упаковка', note: 'при головной боли' }
    ]
  },
  {
    id: 'protein',
    title: 'Белок на неделю',
    emoji: '🥩',
    items: [
      { id: 'prot-1', name: 'Яйца', amount: '20-30 шт' },
      { id: 'prot-2', name: 'Куриные бёдра/грудка', amount: '1-1.5 кг' },
      { id: 'prot-3', name: 'Лосось/форель', amount: '800г - 1кг' },
      { id: 'prot-4', name: 'Телятина', amount: '800 г' },
      { id: 'prot-5', name: 'Индейка', amount: '800 г' },
      { id: 'prot-6', name: 'Креветки', amount: '500 г' }
    ]
  },
  {
    id: 'dairy',
    title: 'Молочные продукты',
    emoji: '🥛',
    items: [
      { id: 'dairy-1', name: 'Сливки 33%', amount: '500 мл' },
      { id: 'dairy-2', name: 'Сливки 10-12%', amount: '500 мл' },
      { id: 'dairy-3', name: 'Сметана 30%', amount: '400 г' },
      { id: 'dairy-4', name: 'Сыр от 45% жирности', amount: '500 г' },
      { id: 'dairy-5', name: 'Моцарелла', amount: '300 г' },
      { id: 'dairy-6', name: 'Кефир от 3.5%', amount: '2-3 л' },
      { id: 'dairy-7', name: 'Масло Гхи', amount: '200 г' }
    ]
  },
  {
    id: 'vegetables',
    title: 'Овощи на неделю',
    emoji: '🥬',
    items: [
      { id: 'veg-1', name: 'Капуста белокочанная', amount: '2 кг', note: 'для салата' },
      { id: 'veg-2', name: 'Огурцы', amount: '1 кг' },
      { id: 'veg-3', name: 'Помидоры', amount: '500 г' },
      { id: 'veg-4', name: 'Перец болгарский', amount: '4-5 шт' },
      { id: 'veg-5', name: 'Морковь', amount: '3 шт' },
      { id: 'veg-6', name: 'Цукини/баклажаны', amount: '500 г' },
      { id: 'veg-7', name: 'Шампиньоны', amount: '300 г' },
      { id: 'veg-8', name: 'Листья салата/шпинат', amount: '300 г' },
      { id: 'veg-9', name: 'Чеснок', amount: '2 головки' },
      { id: 'veg-10', name: 'Лук', amount: '3-4 шт' },
      { id: 'veg-11', name: 'Лимоны', amount: '5-6 шт' },
      { id: 'veg-12', name: 'Зелень (укроп, петрушка)', amount: 'пучки' }
    ]
  },
  {
    id: 'other',
    title: 'Прочее',
    emoji: '📦',
    items: [
      { id: 'oth-1', name: 'Вода качественная', amount: '21-28 л', note: '3-4 л в день' },
      { id: 'oth-2', name: 'Кофе', amount: 'по потребности', note: 'до 3 эспрессо' },
      { id: 'oth-3', name: 'Оливковое масло Extra Virgin', amount: '500 мл' },
      { id: 'oth-4', name: 'Сушёные томаты', amount: '200 г' },
      { id: 'oth-5', name: 'Гималайская соль', amount: '1 упаковка' },
      { id: 'oth-6', name: 'Эритрит', amount: '200 г', note: 'заменитель сахара' },
      { id: 'oth-7', name: 'Куркума', amount: 'для латте' }
    ]
  }
]

// Week-specific meal highlights
const weekMeals: Record<number, string[]> = {
  1: ['Омлет (2 дня)', 'Боул', 'Скрэмбл с лососем', 'Сырники', 'Фриттата', 'Котлеты', 'Шаверма', 'Пирог из капусты'],
  2: ['Омлет капрезе', 'Кокосовая каша', 'Французские блины', 'Льняная каша', 'Лосось с дор блю', 'Мидии в сливках', 'Фаршированные грудки', 'Баклажан с бурратой'],
  3: ['Творог деревенский', 'Йогурт с мюсли', 'Боул', 'Тартар из лосося', 'Севиче', 'Салат с креветками', 'Утка с черносливом']
}

const ShoppingPage = () => {
  const { progress, toggleShoppingItem } = useCourse()
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['supplements', 'protein'])
  const [selectedWeek, setSelectedWeek] = useState(1)

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const getCategoryProgress = (category: ShoppingCategory) => {
    const completed = category.items.filter(item => progress.shoppingChecklist.includes(item.id)).length
    return { completed, total: category.items.length }
  }

  const totalItems = shoppingData.reduce((acc, cat) => acc + cat.items.length, 0)
  const completedItems = progress.shoppingChecklist.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600/20 to-emerald-600/20 px-4 pt-6 pb-8">
        <h1 className="text-2xl font-bold text-white mb-2">🛒 Список покупок</h1>
        <p className="text-teal-200/70 text-sm">
          Продукты и добавки на неделю курса
        </p>
        
        {/* Week Selector */}
        <div className="mt-4 flex gap-2">
          {[1, 2, 3].map((week) => (
            <button
              key={week}
              onClick={() => setSelectedWeek(week)}
              className={`flex-1 py-2.5 px-3 rounded-xl font-medium text-sm transition-all ${
                selectedWeek === week
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/30'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Неделя {week}
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="mt-4 flex items-center gap-4">
          <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${(completedItems / totalItems) * 100}%` }}
            />
          </div>
          <span className="text-white font-medium">{completedItems}/{totalItems}</span>
        </div>
      </div>

      {/* Week Meals Info */}
      <div className="px-4 -mt-2 mb-3">
        <div className="bg-gradient-to-r from-purple-900/40 to-violet-900/40 border border-purple-500/30 rounded-xl p-4">
          <h3 className="font-semibold text-purple-300 mb-2 flex items-center gap-2">
            <span>🍽️</span>
            Блюда недели {selectedWeek}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {weekMeals[selectedWeek].map((meal, idx) => (
              <span key={idx} className="text-xs bg-purple-500/20 text-purple-200 px-2 py-1 rounded-lg">
                {meal}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 space-y-3">
        {shoppingData.map((category) => {
          const isExpanded = expandedCategories.includes(category.id)
          const { completed, total } = getCategoryProgress(category)
          const allCompleted = completed === total

          return (
            <div 
              key={category.id}
              className={`rounded-xl border overflow-hidden transition-all ${
                allCompleted 
                  ? 'bg-emerald-900/20 border-emerald-500/30' 
                  : 'bg-slate-800/80 border-slate-700/50'
              }`}
            >
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.emoji}</span>
                  <div className="text-left">
                    <div className={`font-medium ${allCompleted ? 'text-emerald-300' : 'text-white'}`}>
                      {category.title}
                    </div>
                    <div className="text-xs text-slate-400">
                      {completed}/{total} купили
                    </div>
                  </div>
                </div>
                <svg 
                  className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 space-y-2">
                  {category.items.map((item) => {
                    const isChecked = progress.shoppingChecklist.includes(item.id)
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleShoppingItem(item.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                          isChecked 
                            ? 'bg-emerald-900/30' 
                            : 'bg-slate-700/30 hover:bg-slate-700/50'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          isChecked 
                            ? 'bg-emerald-500 border-emerald-500' 
                            : 'border-slate-500'
                        }`}>
                          {isChecked && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <div className={`text-sm ${isChecked ? 'text-emerald-300 line-through' : 'text-white'}`}>
                            {item.name}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span>{item.amount}</span>
                            {item.note && <span>• {item.note}</span>}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}

        {/* Water brands */}
        <div className="bg-blue-900/30 border border-blue-500/30 rounded-xl p-4">
          <h3 className="font-semibold text-blue-300 mb-2">💧 Рекомендуемые марки воды</h3>
          <p className="text-blue-200/70 text-sm">
            Evian, Pirin, Volvic, Aquanika, San Benedetto, Essentia, Карпатська Джерельна, Tour Water, Пилигрим
          </p>
        </div>
      </div>
    </div>
  )
}

export default ShoppingPage





