import { useCourse } from '../context/CourseContext'

const preparationItems = [
  { id: 'prep-1', category: 'measurements', title: 'Сделайте замеры', description: 'Запишите начальный вес, объём талии, бёдер', emoji: '📏', required: true },
  { id: 'prep-2', category: 'equipment', title: 'Купите весы', description: 'Кухонные весы для точного взвешивания продуктов', emoji: '⚖️', required: true },
  { id: 'prep-3', category: 'equipment', title: 'Подготовьте посуду', description: 'Сковорода, духовка или аэрогриль', emoji: '🍳', required: true },
  { id: 'prep-4', category: 'supplements', title: 'Закупите добавки', description: 'Гарциния, калий, капсаицин, L-триптофан', emoji: '💊', required: true },
  { id: 'prep-5', category: 'food', title: 'Закупите базовые продукты', description: 'Яйца, сливки, сыр, овощи, мясо/рыба', emoji: '🥚', required: true },
  { id: 'prep-6', category: 'food', title: 'Приготовьте квашеные овощи', description: 'Займёт 3-5 дней для заквашивания', emoji: '🥒', required: true },
  { id: 'prep-7', category: 'food', title: 'Приготовьте салат из капусты', description: 'По рецепту из курса', emoji: '🥗', required: false },
  { id: 'prep-8', category: 'lifestyle', title: 'Настройте режим сна', description: 'Минимум 8 часов сна', emoji: '😴', required: true }
]

const PreparationPage = () => {
  const { progress, togglePreparationItem } = useCourse()
  const totalRequired = preparationItems.filter(i => i.required).length
  const completedRequired = preparationItems.filter(i => i.required && progress.preparationChecklist.includes(i.id)).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 px-4 pt-6 pb-8">
        <h1 className="text-2xl font-bold text-white mb-2">📋 Подготовка к курсу</h1>
        <p className="text-amber-200/70 text-sm">
          Выполните эти пункты до начала курса
        </p>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
              style={{ width: `${(completedRequired / totalRequired) * 100}%` }}
            />
          </div>
          <span className="text-white font-medium">{completedRequired}/{totalRequired}</span>
        </div>
      </div>

      <div className="px-4 -mt-4">
        <div className="space-y-3">
          {preparationItems.map((item) => {
            const isCompleted = progress.preparationChecklist.includes(item.id)
            return (
              <button
                key={item.id}
                onClick={() => togglePreparationItem(item.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  isCompleted 
                    ? 'bg-emerald-900/30 border-emerald-500/50' 
                    : 'bg-slate-800/80 border-slate-700/50 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                    isCompleted 
                      ? 'bg-emerald-500 border-emerald-500' 
                      : 'border-slate-500'
                  }`}>
                    {isCompleted && (
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{item.emoji}</span>
                      <span className={`font-medium ${isCompleted ? 'text-emerald-300' : 'text-white'}`}>
                        {item.title}
                      </span>
                      {item.required && !isCompleted && (
                        <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded">обязательно</span>
                      )}
                    </div>
                    <p className={`text-sm mt-1 ${isCompleted ? 'text-emerald-300/60' : 'text-slate-400'}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Tips */}
        <div className="mt-6 bg-blue-900/30 border border-blue-500/30 rounded-xl p-4">
          <h3 className="font-semibold text-blue-300 mb-2">💡 Совет</h3>
          <p className="text-blue-200/70 text-sm">
            Квашеные овощи готовятся 4-5 дней. Начните их готовить заранее, чтобы они были готовы к началу курса!
          </p>
        </div>

        {completedRequired === totalRequired && (
          <div className="mt-6 bg-emerald-900/30 border border-emerald-500/30 rounded-xl p-4 text-center">
            <span className="text-3xl">🎉</span>
            <h3 className="font-semibold text-emerald-300 mt-2">Вы готовы!</h3>
            <p className="text-emerald-200/70 text-sm mt-1">
              Все обязательные пункты выполнены. Можете начинать курс!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PreparationPage





