import { useCourse } from '../context/CourseContext'
import { useSettings } from '../context/SettingsContext'
import { useTelegram } from '../context/TelegramContext'
import { BarChart2, Bell, Settings, Save, RotateCcw, Award, Scale, BookOpen } from 'lucide-react'

const ProfilePage = () => {
  const { progress, setCoefficient, getCourseMode } = useCourse()
  const { textMode, toggleTextMode } = useSettings()
  const { user } = useTelegram()
  const mode = getCourseMode()

  const coefficientOptions = [
    { value: 0.6, label: '0.6', description: 'Минимальные порции' },
    { value: 0.7, label: '0.7', description: 'Меньше среднего' },
    { value: 0.8, label: '0.8', description: 'Немного меньше' },
    { value: 0.85, label: '0.85', description: 'Чуть меньше среднего' },
    { value: 0.9, label: '0.9', description: 'Почти средние' },
    { value: 1.0, label: '1.0', description: 'Стандартные порции' },
    { value: 1.1, label: '1.1', description: 'Чуть больше' },
    { value: 1.2, label: '1.2', description: 'Увеличенные порции' }
  ]

  const eggsByCoefficient = progress.coefficient <= 0.85 ? 3 : progress.coefficient <= 1.0 ? 4 : 5

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-700/50 to-slate-600/30 px-4 pt-12 pb-8 safe-area-pt">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {user?.firstName?.[0] || 'U'}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">
              {user?.firstName} {user?.lastName}
            </h1>
            {user?.username && (
              <p className="text-slate-400 text-sm">@{user.username}</p>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-4">
        {/* Course Status */}
        <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50 backdrop-blur-md">
          <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
            <BarChart2 size={20} className="text-emerald-400" />
            <span>Статус курса</span>
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-700/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-emerald-400">{progress.currentDay}</div>
              <div className="text-xs text-slate-400">Текущий день</div>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-emerald-400">{progress.completedDays.length}</div>
              <div className="text-xs text-slate-400">Завершено дней</div>
            </div>
          </div>
          {progress.startDate && (
            <div className="mt-3 text-sm text-slate-400 text-center flex items-center justify-center gap-2">
               <span>Начало курса: {progress.startDate}</span>
            </div>
          )}
          <div className={`mt-3 px-3 py-2 rounded-lg text-center text-sm font-medium flex items-center justify-center gap-2 ${
            mode === 'completed' ? 'bg-emerald-900/30 text-emerald-300' :
            mode === 'active' ? 'bg-blue-900/30 text-blue-300' :
            'bg-slate-700/50 text-slate-300'
          }`}>
            <Award size={16} />
            {mode === 'completed' ? 'Курс завершён!' :
             mode === 'active' ? 'Курс в процессе' :
             'Курс не начат'}
          </div>
        </div>

        {/* Coefficient */}
        <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50 backdrop-blur-md">
          <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
            <Scale size={20} className="text-emerald-400" />
            <span>Коэффициент</span>
          </h3>
          <p className="text-sm text-slate-400 mb-4">
            Определяет размер порций белка. Текущий: <strong className="text-emerald-400">{progress.coefficient}</strong>
          </p>
          
          <div className="grid grid-cols-4 gap-2 mb-4">
            {coefficientOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setCoefficient(opt.value)}
                className={`py-2 rounded-lg text-sm font-medium transition-all ${
                  progress.coefficient === opt.value
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-3">
            <p className="text-blue-200 text-sm">
              При вашем коэффициенте: <strong>{eggsByCoefficient} яйца</strong> на завтрак
            </p>
          </div>
        </div>

        {/* Text Mode */}
        <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-white flex items-center gap-2">
                <BookOpen size={20} className="text-emerald-400" />
                <span>Текстовый режим</span>
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Показывать текст вместо видео
              </p>
            </div>
            <button
              onClick={toggleTextMode}
              className={`w-14 h-8 rounded-full transition-all ${
                textMode ? 'bg-emerald-500' : 'bg-slate-600'
              }`}
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow transform transition-transform ${
                textMode ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>

        {/* Notifications Settings (placeholder) */}
        <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50 backdrop-blur-md">
          <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
            <Bell size={20} className="text-emerald-400" />
            <span>Уведомления</span>
          </h3>
          <div className="space-y-3">
            {[
              { id: 'morning', label: 'Утренние напоминания', time: '07:00' },
              { id: 'water', label: 'Напоминания о воде', time: 'Каждые 2 часа' },
              { id: 'meals', label: 'Напоминания о еде', time: '12:00, 19:00' },
              { id: 'evening', label: 'Вечерние напоминания', time: '21:00' }
            ].map((notif) => (
              <div key={notif.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div>
                  <div className="text-white text-sm">{notif.label}</div>
                  <div className="text-xs text-slate-400">{notif.time}</div>
                </div>
                <div className="w-10 h-6 bg-slate-600 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5" />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-3 text-center">
            Настройки уведомлений скоро будут доступны
          </p>
        </div>

        {/* Data & Reset */}
        <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50 backdrop-blur-md">
          <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
            <Settings size={20} className="text-emerald-400" />
            <span>Данные</span>
          </h3>
          <div className="space-y-2">
            <button className="w-full py-3 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg text-blue-200 text-sm font-medium transition-all flex items-center justify-center gap-2">
              <Save size={18} />
              <span>Экспортировать прогресс</span>
            </button>
            <button 
              onClick={() => {
                if (confirm('Вы уверены? Это удалит весь прогресс!')) {
                  localStorage.removeItem('courseProgress')
                  window.location.reload()
                }
              }}
              className="w-full py-3 bg-red-600/30 hover:bg-red-600/50 rounded-lg text-red-200 text-sm font-medium transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw size={18} />
              <span>Сбросить прогресс</span>
            </button>
          </div>
        </div>

        {/* About */}
        <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50 text-center backdrop-blur-md">
          <h3 className="font-semibold text-white mb-2">Total Detox</h3>
          <p className="text-sm text-slate-400">20-дневный курс трансформации</p>
          <p className="text-xs text-slate-500 mt-2">Версия 1.0.0</p>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
