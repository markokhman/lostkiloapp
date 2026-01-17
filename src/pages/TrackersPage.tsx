import { useState } from 'react'
import { useCourse } from '../context/CourseContext'

const TrackersPage = () => {
  const { progress, logWater, logSteps, updateMeasurements, addNote } = useCourse()
  const [activeTab, setActiveTab] = useState<'water' | 'steps' | 'measurements' | 'notes'>('water')
  
  const today = new Date().toISOString().split('T')[0]
  const todayWater = progress.waterIntake[today] || 0
  const todaySteps = progress.stepsCount[today] || 0
  const waterGoal = 3000
  const stepsGoal = progress.currentDay >= 15 ? 20000 : progress.currentDay >= 8 ? 15000 : 10000

  const [measurementsForm, setMeasurementsForm] = useState({
    weight: '',
    waist: '',
    hips: ''
  })

  const [note, setNote] = useState(progress.notes[today] || '')

  const handleAddWater = (amount: number) => {
    logWater(today, amount)
  }

  const handleUpdateSteps = () => {
    const steps = prompt('Введите количество шагов:', todaySteps.toString())
    if (steps && !isNaN(parseInt(steps))) {
      logSteps(today, parseInt(steps))
    }
  }

  const handleSaveMeasurements = (period: 'initial' | 'week1' | 'week2' | 'final') => {
    updateMeasurements(period, {
      weight: measurementsForm.weight ? parseFloat(measurementsForm.weight) : undefined,
      waist: measurementsForm.waist ? parseFloat(measurementsForm.waist) : undefined,
      hips: measurementsForm.hips ? parseFloat(measurementsForm.hips) : undefined
    })
    setMeasurementsForm({ weight: '', waist: '', hips: '' })
  }

  const handleSaveNote = () => {
    addNote(today, note)
  }

  // Get last 7 days for history
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    return date.toISOString().split('T')[0]
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 px-4 pt-24 pb-8 safe-area-pt">
        <h1 className="text-2xl font-bold text-white mb-2">📊 Трекеры</h1>
        <p className="text-cyan-200/70 text-sm">
          Отслеживайте прогресс каждый день
        </p>
      </div>

      {/* Tabs */}
      <div className="px-4 -mt-4 mb-4">
        <div className="flex bg-slate-800/80 rounded-xl p-1">
          {[
            { id: 'water', label: '💧', title: 'Вода' },
            { id: 'steps', label: '👟', title: 'Шаги' },
            { id: 'measurements', label: '📏', title: 'Замеры' },
            { id: 'notes', label: '📝', title: 'Заметки' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2 px-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="text-lg">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4">
        {activeTab === 'water' && (
          <div className="space-y-4">
            {/* Today's Water */}
            <div className="bg-blue-900/30 rounded-xl p-6 border border-blue-500/30 text-center">
              <div className="text-6xl mb-2">💧</div>
              <div className="text-4xl font-bold text-white">{todayWater}</div>
              <div className="text-blue-200/70">из {waterGoal} мл</div>
              <div className="h-4 bg-slate-800 rounded-full mt-4 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all"
                  style={{ width: `${Math.min((todayWater / waterGoal) * 100, 100)}%` }}
                />
              </div>
              <div className="flex gap-2 mt-4">
                {[250, 500, 1000].map(amount => (
                  <button
                    key={amount}
                    onClick={() => handleAddWater(amount)}
                    className="flex-1 py-3 bg-blue-600/30 hover:bg-blue-600/50 rounded-xl text-blue-200 font-medium transition-all"
                  >
                    +{amount}
                  </button>
                ))}
              </div>
            </div>

            {/* History */}
            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
              <h3 className="font-semibold text-white mb-3">Последние 7 дней</h3>
              <div className="flex justify-between items-end h-32">
                {last7Days.map((date) => {
                  const water = progress.waterIntake[date] || 0
                  const percent = Math.min((water / waterGoal) * 100, 100)
                  const isToday = date === today
                  return (
                    <div key={date} className="flex flex-col items-center">
                      <div className="h-24 w-8 bg-slate-700 rounded-full overflow-hidden flex flex-col-reverse">
                        <div 
                          className={`w-full rounded-full transition-all ${isToday ? 'bg-cyan-500' : 'bg-blue-600'}`}
                          style={{ height: `${percent}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-400 mt-2">
                        {new Date(date).getDate()}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'steps' && (
          <div className="space-y-4">
            {/* Today's Steps */}
            <div className="bg-emerald-900/30 rounded-xl p-6 border border-emerald-500/30 text-center">
              <div className="text-6xl mb-2">👟</div>
              <div className="text-4xl font-bold text-white">{todaySteps.toLocaleString()}</div>
              <div className="text-emerald-200/70">из {stepsGoal.toLocaleString()}</div>
              <div className="h-4 bg-slate-800 rounded-full mt-4 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all"
                  style={{ width: `${Math.min((todaySteps / stepsGoal) * 100, 100)}%` }}
                />
              </div>
              <button
                onClick={handleUpdateSteps}
                className="mt-4 w-full py-3 bg-emerald-600/30 hover:bg-emerald-600/50 rounded-xl text-emerald-200 font-medium transition-all"
              >
                ✏️ Обновить шаги
              </button>
            </div>

            {/* Steps progression */}
            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
              <h3 className="font-semibold text-white mb-3">Цели по неделям</h3>
              <div className="space-y-2">
                {[
                  { week: 1, goal: 10000, active: progress.currentDay <= 7 },
                  { week: 2, goal: 15000, active: progress.currentDay > 7 && progress.currentDay <= 14 },
                  { week: 3, goal: 20000, active: progress.currentDay > 14 }
                ].map(({ week, goal, active }) => (
                  <div key={week} className={`flex items-center justify-between p-3 rounded-lg ${active ? 'bg-emerald-900/30' : 'bg-slate-700/30'}`}>
                    <span className={active ? 'text-emerald-300' : 'text-slate-400'}>Неделя {week}</span>
                    <span className={`font-medium ${active ? 'text-emerald-300' : 'text-slate-400'}`}>{goal.toLocaleString()} шагов</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'measurements' && (
          <div className="space-y-4">
            {/* Current measurements form */}
            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
              <h3 className="font-semibold text-white mb-3">Записать замеры</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-slate-400">Вес (кг)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={measurementsForm.weight}
                    onChange={(e) => setMeasurementsForm(prev => ({ ...prev, weight: e.target.value }))}
                    className="w-full mt-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    placeholder="70.5"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400">Талия (см)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={measurementsForm.waist}
                    onChange={(e) => setMeasurementsForm(prev => ({ ...prev, waist: e.target.value }))}
                    className="w-full mt-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    placeholder="80"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400">Бёдра (см)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={measurementsForm.hips}
                    onChange={(e) => setMeasurementsForm(prev => ({ ...prev, hips: e.target.value }))}
                    className="w-full mt-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    placeholder="100"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {[
                    { id: 'initial', label: 'Начальные' },
                    { id: 'week1', label: 'Неделя 1' },
                    { id: 'week2', label: 'Неделя 2' },
                    { id: 'final', label: 'Финальные' }
                  ].map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => handleSaveMeasurements(id as any)}
                      className="py-2 bg-purple-600/30 hover:bg-purple-600/50 rounded-lg text-purple-200 text-sm font-medium transition-all"
                    >
                      📝 {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Measurements history */}
            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
              <h3 className="font-semibold text-white mb-3">История замеров</h3>
              <div className="space-y-3">
                {[
                  { id: 'initial', label: 'Начало курса', data: progress.measurements.initial },
                  { id: 'week1', label: 'Неделя 1', data: progress.measurements.week1 },
                  { id: 'week2', label: 'Неделя 2', data: progress.measurements.week2 },
                  { id: 'final', label: 'Финал', data: progress.measurements.final }
                ].map(({ id, label, data }) => (
                  <div key={id} className="p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{label}</span>
                      {data.date && <span className="text-xs text-slate-400">{data.date}</span>}
                    </div>
                    {data.weight || data.waist || data.hips ? (
                      <div className="flex gap-4 text-sm">
                        {data.weight && <span className="text-slate-300">⚖️ {data.weight} кг</span>}
                        {data.waist && <span className="text-slate-300">📏 {data.waist} см</span>}
                        {data.hips && <span className="text-slate-300">🍑 {data.hips} см</span>}
                      </div>
                    ) : (
                      <span className="text-sm text-slate-500">Нет данных</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Progress calculation */}
            {progress.measurements.initial.weight && progress.measurements.final.weight && (
              <div className="bg-emerald-900/30 rounded-xl p-4 border border-emerald-500/30 text-center">
                <h3 className="text-emerald-300 font-semibold mb-2">🎉 Ваш результат</h3>
                <div className="text-3xl font-bold text-white">
                  -{(progress.measurements.initial.weight - progress.measurements.final.weight).toFixed(1)} кг
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-4">
            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
              <h3 className="font-semibold text-white mb-3">Заметка на сегодня</h3>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full h-32 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white resize-none"
                placeholder="Как прошёл день? Что получилось? Что было сложно?"
              />
              <button
                onClick={handleSaveNote}
                className="mt-3 w-full py-3 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-white font-medium transition-all"
              >
                💾 Сохранить заметку
              </button>
            </div>

            {/* Previous notes */}
            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
              <h3 className="font-semibold text-white mb-3">Предыдущие заметки</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {Object.entries(progress.notes)
                  .sort((a, b) => b[0].localeCompare(a[0]))
                  .slice(0, 10)
                  .map(([date, noteText]) => (
                    <div key={date} className="p-3 bg-slate-700/30 rounded-lg">
                      <div className="text-xs text-slate-400 mb-1">{date}</div>
                      <div className="text-sm text-slate-300">{noteText}</div>
                    </div>
                  ))
                }
                {Object.keys(progress.notes).length === 0 && (
                  <p className="text-sm text-slate-500">Нет заметок</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TrackersPage
