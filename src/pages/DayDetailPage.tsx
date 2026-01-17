import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { useCourse } from '../context/CourseContext'
import { useSettings } from '../context/SettingsContext'
import VideoOrText from '../components/VideoOrText'
import { getTranscript } from '../data/transcripts'

// Type definitions for meals
interface KefirMeals {
  type: 'kefir'
  preMeal: string
  schedule: { time: string; item: string }[]
}

interface NormalMeals {
  type: 'normal'
  preMeal: string
  lunch: { time: string; id: string | null; name: string; skippable: boolean } | null
  dinner: { time: string; id: string; name: string } | null
  garnish: string[]
  snack: string[] | null
}

type Meals = KefirMeals | NormalMeals

// Highlights for each day from course transcripts
const dayHighlights: Record<number, string[]> = {
  1: [
    '🔥 Первые 2 дня — это 80% успеха всего курса!',
    '🚿 Контрастный душ — обязательно каждое утро',
    '⏰ Завтрак отодвигаем на после 12:00',
    '♨️ Начинаем день с тёплой воды (50-60°C)'
  ],
  4: [
    '🧬 Можно полностью без еды — запускается аутофагия!',
    '💪 Лучший день для максимальной активности (зал, бег)',
    '💊 Запор? Добавьте магний!',
    '😴 Триптофан увеличить до 1000 мг перед сном'
  ],
  6: [
    '🍵 Ромашковый чай перед сном для крепкого сна',
    '🌿 Отдых и восстановление'
  ],
  7: [
    '📏 ЗАМЕРЫ! Вес, талия, бёдра',
    '🧘 День гармонии — убираем стресс',
    '📋 Подготовьтесь к следующей неделе'
  ],
  8: [
    '👟 Шаги увеличить до 15000!',
    '🏃 Новые упражнения для тонуса и кора'
  ],
  14: [
    '📏 ЗАМЕРЫ! Вес, талия, бёдра — сравните с первой неделей',
    '🎯 Финишная прямая — осталась одна неделя!'
  ],
  15: [
    '💊 МАГНИЙ — важнейшая добавка! 800-1000 мг в день',
    '🐟 Омега-3 (4000 мг) — базовая добавка на постоянку',
    '☀️ Витамин D — обязательно добавить',
    '🔬 Цинк, селен, витамины группы B для здоровья'
  ],
  16: [
    '🥚 Яйца — основа питания! Холестерин из яиц полезен',
    '🌿 Качество яиц важно: био, фермерские, перепелиные',
    '🧠 Холестерин нужен для мозга и гормонов'
  ],
  20: [
    '🎓 Правила жизни после курса',
    '⏰ Интервальное голодание: 14/10, 16/8 или 18/6',
    '💊 Добавки: 5 дней пить, 2 дня перерыв',
    '🌿 Кудзу (Kudzu) — против тяги к алкоголю',
    '📏 Сравните замеры с началом курса!'
  ]
}

// Shopping reminders for specific days
const shoppingReminders: Record<number, { message: string; nextWeek: number }> = {
  7: { message: 'Завтра начинается вторая неделя! Проверьте список покупок.', nextWeek: 2 },
  14: { message: 'Завтра начинается третья неделя! Проверьте список покупок.', nextWeek: 3 }
}

// Meal plan for each day
const mealPlanByDay: Record<number, { lunch: string | null; lunchName: string; dinner: string; dinnerName: string } | { type: 'kefir' }> = {
  // Week 1
  1: { lunch: 'omelet', lunchName: 'Омлет', dinner: 'constructor', dinnerName: 'Конструктор ужина' },
  2: { lunch: 'omelet', lunchName: 'Омлет', dinner: 'constructor', dinnerName: 'Конструктор ужина' },
  3: { lunch: 'bowl', lunchName: 'Боул (конструктор)', dinner: 'frittata', dinnerName: 'Пикантная фриттата' },
  4: { type: 'kefir' },
  5: { lunch: null, lunchName: 'Пропуск (по желанию)', dinner: 'simple-cutlets', dinnerName: 'Простейшие котлеты' },
  6: { lunch: 'scramble', lunchName: 'Скрэмбл с лососем', dinner: 'shawarma', dinnerName: 'Великолепная шаверма' },
  7: { lunch: 'syrniki', lunchName: 'Сырники', dinner: 'cauliflower-pie', dinnerName: 'Пирог из цветной капусты' },
  // Week 2
  8: { type: 'kefir' },
  9: { lunch: 'omelet-caprese', lunchName: 'Омлет капрезе', dinner: 'constructor', dinnerName: 'Конструктор ужина' },
  10: { lunch: 'coconut-porridge', lunchName: 'Кокосовая каша', dinner: 'salmon-dor-blue', dinnerName: 'Лосось с дор блю' },
  11: { type: 'kefir' },
  12: { lunch: null, lunchName: 'Пропуск (по желанию)', dinner: 'mussels-cream', dinnerName: 'Мидии в сливках' },
  13: { lunch: 'french-pancakes', lunchName: 'Французские блины', dinner: 'stuffed-chicken', dinnerName: 'Фаршированные грудки' },
  14: { lunch: 'flax-porridge', lunchName: 'Льняная каша', dinner: 'eggplant-burrata', dinnerName: 'Баклажан с бурратой' },
  // Week 3
  15: { type: 'kefir' },
  16: { lunch: 'cottage-cheese', lunchName: 'Творог деревенский', dinner: 'salmon-tartare', dinnerName: 'Тартар из лосося' },
  17: { lunch: 'yogurt', lunchName: 'Йогурт с мюсли', dinner: 'ceviche', dinnerName: 'Севиче' },
  18: { type: 'kefir' },
  19: { lunch: null, lunchName: 'Пропуск (по желанию)', dinner: 'shrimp-avocado-salad', dinnerName: 'Салат с креветками' },
  20: { lunch: 'bowl', lunchName: 'Боул (конструктор)', dinner: 'duck-prunes', dinnerName: 'Утка с черносливом' }
}

// Simplified day data - in production this would come from course-data.json
const getDayData = (day: number) => {
  const baseSupplements = [
    { id: `sup-${day}-1`, name: 'Гарциния камбоджийская', dosage: '2 капсулы', timing: 'за час до еды' },
    { id: `sup-${day}-2`, name: 'Калий', dosage: '400 мг', timing: 'с едой' },
    { id: `sup-${day}-3`, name: 'Капсаицин', dosage: '2 капсулы', timing: 'после еды' },
    { id: `sup-${day}-4`, name: 'Триптофан', dosage: day >= 4 ? '1000 мг' : '500 мг', timing: 'перед сном' },
    { id: `sup-${day}-5`, name: 'Магний', dosage: '800-1000 мг', timing: '5 дней пить, 2 перерыв' }
  ]

  const stepsGoal = day >= 15 ? 20000 : day >= 8 ? 15000 : 10000
  const plankDuration = day >= 8 ? 60 + (day - 8) * 10 : undefined

  const isKefirDay = [4, 8, 11, 15, 18].includes(day)
  
  return {
    day,
    title: day === 1 ? 'День 1 - Старт курса' : 
           day === 7 ? 'День 7 - Конец первой недели' :
           day === 14 ? 'День 14 - Конец второй недели' :
           day === 20 ? 'День 20 - Финал! 🎉' :
           isKefirDay ? `День ${day} - Кефирный день` :
           `День ${day}`,
    subtitle: day === 1 ? 'Поздравляем с началом курса!' :
              day === 7 || day === 14 ? 'Сделайте замеры!' :
              day === 20 ? 'Финальные замеры! Сравните с началом' :
              isKefirDay ? 'Кефирный день или день без пищи' :
              '',
    isKefirDay,
    highlights: dayHighlights[day] || [],
    shoppingReminder: shoppingReminders[day] || null,
    morning: [
      { id: `morning-${day}-1`, text: 'Контрастный душ', emoji: '🚿' },
      { id: `morning-${day}-2`, text: '2 стакана тёплой воды', emoji: '♨️' },
      { id: `morning-${day}-3`, text: 'Практика (йога/дыхание)', emoji: '🧘' }
    ],
    water: { amount: '3-4 литра', goal: 3000 },
    supplements: baseSupplements,
    activity: {
      steps: stepsGoal,
      plankDuration,
      exercises: [
        { id: `ex-${day}-1`, name: 'Шаги', note: `минимум ${stepsGoal.toLocaleString()}` },
        { id: `ex-${day}-2`, name: 'Пресс', note: 'утром или вечером' },
        ...(plankDuration ? [{ id: `ex-${day}-3`, name: 'Планка', note: `${plankDuration} секунд` }] : []),
        { id: `ex-${day}-4`, name: 'Домашний комплекс', note: 'по желанию' }
      ]
    },
    meals: (isKefirDay ? {
      type: 'kefir' as const,
      preMeal: 'Вода + яблочный уксус + лимон',
      schedule: [
        { time: '14:00', item: 'Кефир 500 мл' },
        { time: '16:00', item: 'Кефир 500 мл' },
        { time: '18:00', item: 'Кефир 500 мл' },
        { time: '20:00', item: 'Кефир 500 мл' }
      ]
    } : (() => {
      const plan = mealPlanByDay[day]
      const hasLunch = plan && 'lunch' in plan
      return {
        type: 'normal' as const,
        preMeal: 'Вода + 1-2 ст.л. яблочного уксуса + сок лимона',
        lunch: hasLunch ? {
          time: day >= 3 ? 'После 14:00' : '12:00 - 14:00',
          id: plan.lunch,
          name: plan.lunchName,
          skippable: day >= 5
        } : null,
        dinner: hasLunch ? {
          time: '19:00 - 21:00',
          id: plan.dinner,
          name: plan.dinnerName
        } : null,
        garnish: ['Квашеные овощи до 100г', 'Свежий салат 180-200г', 'ИЛИ салат из капусты 200-250г'],
        snack: day >= 3 ? ['200 мл кефира', '100г скира', '150г дыни'] : null
      }
    })()) as Meals,
    evening: [
      { id: `eve-${day}-1`, text: 'Вечерняя прогулка', emoji: '🚶' },
      { id: `eve-${day}-2`, text: 'Дыхательные упражнения', emoji: '🌬️' },
      { id: `eve-${day}-3`, text: 'Сон минимум 8 часов', emoji: '😴' },
      { id: `eve-${day}-4`, text: 'Мантра перед сном', emoji: '🎶', optional: true }
    ],
    videoFile: `День ${day}.MOV`
  }
}

const DayDetailPage = () => {
  const { dayId } = useParams()
  const day = parseInt(dayId || '1')
  const dayData = getDayData(day)
  
  const { progress, completeTask, isTaskCompleted, completeDay, logWater, logSteps } = useCourse()
  const { textMode } = useSettings()
  const [activeTab, setActiveTab] = useState<'tasks' | 'meals' | 'info'>('tasks')
  
  const today = new Date().toISOString().split('T')[0]
  const todayWater = progress.waterIntake[today] || 0
  const todaySteps = progress.stepsCount[today] || 0

  const allTasksCompleted = () => {
    const allTasks = [
      ...dayData.morning.map(t => t.id),
      ...dayData.activity.exercises.map(t => t.id),
      ...dayData.evening.filter(t => !t.optional).map(t => t.id)
    ]
    return allTasks.every(taskId => isTaskCompleted(day, taskId))
  }

  const handleAddWater = (amount: number) => {
    logWater(today, amount)
  }

  const handleUpdateSteps = () => {
    const steps = prompt('Введите количество шагов:', todaySteps.toString())
    if (steps && !isNaN(parseInt(steps))) {
      logSteps(today, parseInt(steps))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-24">
      {/* Header */}
      <div className={`px-4 pt-6 pb-8 ${
        dayData.isKefirDay 
          ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20' 
          : 'bg-gradient-to-r from-emerald-600/20 to-teal-600/20'
      }`}>
        <div className="flex items-center gap-2 mb-2">
          <Link to="/days" className="text-slate-400 hover:text-white">
            ← Назад
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-white">{dayData.title}</h1>
        {dayData.subtitle && (
          <p className={`text-sm mt-1 ${dayData.isKefirDay ? 'text-blue-200/70' : 'text-emerald-200/70'}`}>
            {dayData.subtitle}
          </p>
        )}
      </div>

      {/* Shopping Reminder Banner */}
      {dayData.shoppingReminder && (
        <div className="px-4 -mt-2 mb-2">
          <Link 
            to="/shopping"
            className="block bg-gradient-to-r from-amber-600/30 to-orange-600/30 border border-amber-500/50 rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🛒</span>
              <div>
                <div className="text-amber-200 font-medium">{dayData.shoppingReminder.message}</div>
                <div className="text-amber-300/70 text-sm">Перейти к списку покупок →</div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Highlights Banner */}
      {dayData.highlights.length > 0 && (
        <div className="px-4 -mt-2 mb-2">
          <div className="bg-gradient-to-r from-violet-600/20 to-purple-600/20 border border-violet-500/30 rounded-xl p-4">
            <h3 className="font-semibold text-violet-300 mb-2">⭐ Важное на сегодня</h3>
            <ul className="space-y-1.5">
              {dayData.highlights.map((highlight, idx) => (
                <li key={idx} className="text-violet-200/90 text-sm">{highlight}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="px-4 -mt-4 mb-4">
        <div className="flex bg-slate-800/80 rounded-xl p-1">
          {[
            { id: 'tasks', label: '✅ Задачи' },
            { id: 'meals', label: '🍽️ Питание' },
            { id: 'info', label: 'ℹ️ Инфо' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4">
        {activeTab === 'tasks' && (
          <div className="space-y-4">
            {/* Morning */}
            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
              <h3 className="font-semibold text-amber-300 mb-3">🌅 Утро</h3>
              <div className="space-y-2">
                {dayData.morning.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => completeTask(day, task.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                      isTaskCompleted(day, task.id)
                        ? 'bg-emerald-900/30'
                        : 'bg-slate-700/30 hover:bg-slate-700/50'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isTaskCompleted(day, task.id)
                        ? 'bg-emerald-500 border-emerald-500'
                        : 'border-slate-500'
                    }`}>
                      {isTaskCompleted(day, task.id) && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-xl">{task.emoji}</span>
                    <span className={isTaskCompleted(day, task.id) ? 'text-emerald-300' : 'text-white'}>
                      {task.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Water Tracker */}
            <div className="bg-blue-900/30 rounded-xl p-4 border border-blue-500/30">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-blue-300">💧 Вода</h3>
                <span className="text-sm text-blue-200">{todayWater} / {dayData.water.goal} мл</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden mb-3">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: `${Math.min((todayWater / dayData.water.goal) * 100, 100)}%` }}
                />
              </div>
              <div className="flex gap-2">
                {[250, 500].map(amount => (
                  <button
                    key={amount}
                    onClick={() => handleAddWater(amount)}
                    className="flex-1 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg text-blue-200 text-sm font-medium transition-all"
                  >
                    +{amount} мл
                  </button>
                ))}
              </div>
            </div>

            {/* Activity */}
            <div className="bg-purple-900/30 rounded-xl p-4 border border-purple-500/30">
              <h3 className="font-semibold text-purple-300 mb-3">🏃 Активность</h3>
              <div className="space-y-2">
                {dayData.activity.exercises.map((exercise) => (
                  <button
                    key={exercise.id}
                    onClick={() => exercise.id.includes('ex-') && exercise.name === 'Шаги' ? handleUpdateSteps() : completeTask(day, exercise.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                      isTaskCompleted(day, exercise.id)
                        ? 'bg-emerald-900/30'
                        : 'bg-slate-700/30 hover:bg-slate-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        isTaskCompleted(day, exercise.id)
                          ? 'bg-emerald-500 border-emerald-500'
                          : 'border-slate-500'
                      }`}>
                        {isTaskCompleted(day, exercise.id) && (
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className={isTaskCompleted(day, exercise.id) ? 'text-emerald-300' : 'text-white'}>
                        {exercise.name}
                      </span>
                    </div>
                    <span className="text-sm text-slate-400">{exercise.note}</span>
                  </button>
                ))}
                
                {/* Steps display */}
                <div className="mt-2 p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-white">👟 Шагов сегодня</span>
                    <span className="text-xl font-bold text-emerald-400">{todaySteps.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all"
                      style={{ width: `${Math.min((todaySteps / dayData.activity.steps) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Supplements */}
            <div className="bg-amber-900/30 rounded-xl p-4 border border-amber-500/30">
              <h3 className="font-semibold text-amber-300 mb-3">💊 Добавки</h3>
              <div className="space-y-2">
                {dayData.supplements.map((sup) => (
                  <div key={sup.id} className="flex items-center justify-between p-2 bg-slate-700/30 rounded-lg">
                    <span className="text-white text-sm">{sup.name}</span>
                    <span className="text-xs text-slate-400">{sup.dosage} {sup.timing}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Evening */}
            <div className="bg-indigo-900/30 rounded-xl p-4 border border-indigo-500/30">
              <h3 className="font-semibold text-indigo-300 mb-3">🌙 Вечер</h3>
              <div className="space-y-2">
                {dayData.evening.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => completeTask(day, task.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                      isTaskCompleted(day, task.id)
                        ? 'bg-emerald-900/30'
                        : 'bg-slate-700/30 hover:bg-slate-700/50'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isTaskCompleted(day, task.id)
                        ? 'bg-emerald-500 border-emerald-500'
                        : 'border-slate-500'
                    }`}>
                      {isTaskCompleted(day, task.id) && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-xl">{task.emoji}</span>
                    <span className={isTaskCompleted(day, task.id) ? 'text-emerald-300' : 'text-white'}>
                      {task.text}
                    </span>
                    {task.optional && <span className="text-xs text-slate-500">(опционально)</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'meals' && (
          <div className="space-y-4">
            {/* Pre-meal */}
            <div className="bg-lime-900/30 rounded-xl p-4 border border-lime-500/30">
              <h3 className="font-semibold text-lime-300 mb-2">🍋 Перед едой</h3>
              <p className="text-lime-200/70 text-sm">{dayData.meals.preMeal}</p>
            </div>

            {dayData.meals.type === 'kefir' ? (
              <div className="bg-blue-900/30 rounded-xl p-4 border border-blue-500/30">
                <h3 className="font-semibold text-blue-300 mb-3">🥛 Кефирный день</h3>
                <p className="text-blue-200/70 text-sm mb-3">
                  Кефир от 3.5%. Можно ужирнить сливками 12% (50мл на литр)
                </p>
                <div className="space-y-2">
                  {dayData.meals.schedule?.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <span className="text-white font-medium">{item.time}</span>
                      <span className="text-blue-200">{item.item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (() => {
              const normalMeals = dayData.meals as NormalMeals
              return (
              <>
                {/* Завтракобед */}
                <div className="bg-orange-900/30 rounded-xl p-4 border border-orange-500/30">
                  <h3 className="font-semibold text-orange-300 mb-2">🍳 Завтракобед</h3>
                  <p className="text-orange-200/70 text-sm mb-3">{normalMeals.lunch?.time}</p>
                  {normalMeals.lunch?.id ? (
                    <Link 
                      to={`/recipes/${normalMeals.lunch.id}`}
                      className="block p-4 bg-gradient-to-r from-orange-600/20 to-amber-600/20 hover:from-orange-600/30 hover:to-amber-600/30 rounded-xl border border-orange-500/30 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-medium text-lg">{normalMeals.lunch.name}</div>
                          <div className="text-orange-200/70 text-sm mt-1">Посмотреть рецепт →</div>
                        </div>
                        <span className="text-3xl">🍽️</span>
                      </div>
                    </Link>
                  ) : (
                    <div className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">💨</span>
                        <div>
                          <div className="text-slate-300 font-medium">{normalMeals.lunch?.name || 'Пропуск завтракобеда'}</div>
                          <div className="text-slate-400 text-sm">Можно пропустить с 5-го дня курса</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Ужин */}
                <div className="bg-red-900/30 rounded-xl p-4 border border-red-500/30">
                  <h3 className="font-semibold text-red-300 mb-2">🥩 Ужин</h3>
                  <p className="text-red-200/70 text-sm mb-3">{normalMeals.dinner?.time}</p>
                  {normalMeals.dinner?.id && (
                    <Link 
                      to={normalMeals.dinner.id === 'constructor' ? '/recipes' : `/recipes/${normalMeals.dinner.id}`}
                      className="block p-4 bg-gradient-to-r from-red-600/20 to-rose-600/20 hover:from-red-600/30 hover:to-rose-600/30 rounded-xl border border-red-500/30 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-medium text-lg">{normalMeals.dinner.name}</div>
                          <div className="text-red-200/70 text-sm mt-1">
                            {normalMeals.dinner.id === 'constructor' ? 'Собери свой ужин →' : 'Посмотреть рецепт →'}
                          </div>
                        </div>
                        <span className="text-3xl">🍖</span>
                      </div>
                    </Link>
                  )}
                </div>

                {/* Гарнир */}
                <div className="bg-green-900/30 rounded-xl p-4 border border-green-500/30">
                  <h3 className="font-semibold text-green-300 mb-2">🥗 Гарнир (обязательно)</h3>
                  <ul className="space-y-1">
                    {normalMeals.garnish?.map((item, idx) => (
                      <li key={idx} className="text-green-200/70 text-sm">• {item}</li>
                    ))}
                  </ul>
                </div>

                {/* Паёк */}
                {normalMeals.snack && (
                  <div className="bg-cyan-900/30 rounded-xl p-4 border border-cyan-500/30">
                    <h3 className="font-semibold text-cyan-300 mb-2">🍈 Паёк (опционально)</h3>
                    <ul className="space-y-1">
                      {normalMeals.snack.map((item, idx) => (
                        <li key={idx} className="text-cyan-200/70 text-sm">• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )})()}
          </div>
        )}

        {activeTab === 'info' && (
          <div className="space-y-4">
            {/* Day Video with Transcript */}
            <VideoOrText
              videoFile={dayData.videoFile}
              text={getTranscript(dayData.videoFile)}
              title={`Видео дня ${day}`}
              showBothByDefault={textMode}
            />

            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
              <h3 className="font-semibold text-white mb-3">📝 Полезные ссылки</h3>
              <div className="space-y-2">
                <Link to="/workouts" className="block p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg text-white transition-all">
                  🏋️ Тренировки и упражнения →
                </Link>
                <Link to="/recipes" className="block p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg text-white transition-all">
                  🍳 Рецепты →
                </Link>
                <Link to="/info" className="block p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg text-white transition-all">
                  📚 Информационные материалы →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Complete Day Button */}
        <div className="mt-6">
          {progress.completedDays.includes(day) ? (
            <div className="bg-emerald-900/30 border border-emerald-500/50 rounded-xl p-4 text-center">
              <span className="text-emerald-300 font-medium">✅ День завершён!</span>
            </div>
          ) : (
            <button
              onClick={() => completeDay(day)}
              disabled={!allTasksCompleted()}
              className={`w-full py-4 rounded-xl font-bold transition-all ${
                allTasksCompleted()
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-600 hover:to-teal-600'
                  : 'bg-slate-700 text-slate-400 cursor-not-allowed'
              }`}
            >
              {allTasksCompleted() ? '✅ Завершить день' : 'Выполните все задачи'}
            </button>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-3 mt-4">
          {day > 1 && (
            <Link
              to={`/days/${day - 1}`}
              className="flex-1 py-3 bg-slate-700/50 hover:bg-slate-700 rounded-xl text-white text-center transition-all"
            >
              ← День {day - 1}
            </Link>
          )}
          {day < 20 && (
            <Link
              to={`/days/${day + 1}`}
              className="flex-1 py-3 bg-slate-700/50 hover:bg-slate-700 rounded-xl text-white text-center transition-all"
            >
              День {day + 1} →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default DayDetailPage
