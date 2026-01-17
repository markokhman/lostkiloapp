import { useCourse } from '../context/CourseContext'
import { avatarColors } from '../data/images'

// Mock leaderboard data - in production this would come from backend
const generateMockUsers = (currentDay: number) => {
  const names = [
    { name: 'Анна', emoji: '👩' },
    { name: 'Мария', emoji: '👩‍🦰' },
    { name: 'Елена', emoji: '👩‍🦱' },
    { name: 'Ольга', emoji: '👱‍♀️' },
    { name: 'Наталья', emoji: '👩‍🦳' },
    { name: 'Светлана', emoji: '🧑' },
    { name: 'Ирина', emoji: '👩' },
    { name: 'Татьяна', emoji: '👩‍🦰' },
    { name: 'Юлия', emoji: '👩‍🦱' },
    { name: 'Екатерина', emoji: '👱‍♀️' },
    { name: 'Дмитрий', emoji: '👨' },
    { name: 'Александр', emoji: '👨‍🦱' },
    { name: 'Сергей', emoji: '🧔' },
    { name: 'Андрей', emoji: '👨‍🦰' },
    { name: 'Максим', emoji: '👱' },
  ]

  return names.map((user, idx) => {
    // Randomize day around current day
    const dayOffset = Math.floor(Math.random() * 5) - 2
    const userDay = Math.max(1, Math.min(20, currentDay + dayOffset))
    
    return {
      id: idx + 1,
      name: user.name,
      emoji: user.emoji,
      day: userDay,
      tasksCompleted: Math.floor(Math.random() * 10) + 5,
      streak: Math.floor(Math.random() * userDay) + 1,
      water: Math.floor(Math.random() * 4000) + 1000,
      steps: Math.floor(Math.random() * 20000) + 5000,
      colorIndex: idx % avatarColors.length,
      isOnline: Math.random() > 0.5,
    }
  }).sort((a, b) => b.tasksCompleted - a.tasksCompleted)
}

const LeaderboardPage = () => {
  const { progress } = useCourse()
  const currentDay = progress.currentDay || 1
  
  const allUsers = generateMockUsers(currentDay)
  const sameDayUsers = allUsers.filter(u => u.day === currentDay)
  const topUsers = allUsers.slice(0, 10)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 pb-24">
      {/* Animated Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="relative px-4 pt-8 pb-6">
          <div className="flex items-center gap-3">
            <span className="text-5xl animate-bounce">🏆</span>
            <div>
              <h1 className="text-2xl font-bold text-white">Лидерборд</h1>
              <p className="text-amber-200/70 text-sm">Участники курса</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-2">
        {/* Same Day Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            <h2 className="text-lg font-semibold text-white">
              На дне {currentDay} вместе с тобой
            </h2>
            <span className="text-emerald-400 text-sm">({sameDayUsers.length})</span>
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
            {sameDayUsers.map((user, idx) => (
              <div
                key={user.id}
                className="flex-shrink-0 w-20 text-center animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="relative">
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${avatarColors[user.colorIndex]} flex items-center justify-center text-3xl shadow-lg transform hover:scale-110 transition-transform`}>
                    {user.emoji}
                  </div>
                  {user.isOnline && (
                    <div className="absolute bottom-0 right-2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse" />
                  )}
                </div>
                <p className="text-white text-xs font-medium mt-2 truncate">{user.name}</p>
                <p className="text-emerald-400 text-xs">🔥 {user.streak} дней</p>
              </div>
            ))}
            
            {sameDayUsers.length === 0 && (
              <div className="w-full text-center py-8 text-slate-400">
                <span className="text-4xl">👀</span>
                <p className="mt-2">Пока никого нет на этом дне</p>
              </div>
            )}
          </div>
        </div>

        {/* Top 10 */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white mb-3">🌟 Топ участников</h2>
          
          {/* Top 3 Podium */}
          <div className="flex justify-center items-end gap-2 mb-4 h-40">
            {/* 2nd Place */}
            {topUsers[1] && (
              <div className="flex flex-col items-center animate-fade-in" style={{ animationDelay: '200ms' }}>
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${avatarColors[topUsers[1].colorIndex]} flex items-center justify-center text-2xl shadow-lg`}>
                  {topUsers[1].emoji}
                </div>
                <div className="bg-gradient-to-t from-slate-600 to-slate-500 w-20 h-20 rounded-t-lg mt-2 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-white">2</span>
                  <span className="text-xs text-slate-300 truncate w-16 text-center">{topUsers[1].name}</span>
                </div>
              </div>
            )}
            
            {/* 1st Place */}
            {topUsers[0] && (
              <div className="flex flex-col items-center animate-fade-in" style={{ animationDelay: '100ms' }}>
                <span className="text-3xl animate-bounce">👑</span>
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${avatarColors[topUsers[0].colorIndex]} flex items-center justify-center text-3xl shadow-lg ring-4 ring-amber-500/50`}>
                  {topUsers[0].emoji}
                </div>
                <div className="bg-gradient-to-t from-amber-600 to-amber-500 w-24 h-28 rounded-t-lg mt-2 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-white">1</span>
                  <span className="text-xs text-amber-100 truncate w-20 text-center">{topUsers[0].name}</span>
                  <span className="text-xs text-amber-200">✅ {topUsers[0].tasksCompleted}</span>
                </div>
              </div>
            )}
            
            {/* 3rd Place */}
            {topUsers[2] && (
              <div className="flex flex-col items-center animate-fade-in" style={{ animationDelay: '300ms' }}>
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${avatarColors[topUsers[2].colorIndex]} flex items-center justify-center text-2xl shadow-lg`}>
                  {topUsers[2].emoji}
                </div>
                <div className="bg-gradient-to-t from-amber-800 to-amber-700 w-20 h-16 rounded-t-lg mt-2 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-white">3</span>
                  <span className="text-xs text-amber-200 truncate w-16 text-center">{topUsers[2].name}</span>
                </div>
              </div>
            )}
          </div>

          {/* Rest of top 10 */}
          <div className="space-y-2">
            {topUsers.slice(3).map((user, idx) => (
              <div
                key={user.id}
                className="flex items-center gap-3 p-3 bg-slate-800/60 rounded-xl border border-slate-700/50 animate-fade-in hover:bg-slate-800 transition-all"
                style={{ animationDelay: `${(idx + 4) * 100}ms` }}
              >
                <span className="text-slate-400 font-bold w-6">{idx + 4}</span>
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${avatarColors[user.colorIndex]} flex items-center justify-center text-xl`}>
                  {user.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{user.name}</span>
                    {user.isOnline && <div className="w-2 h-2 bg-emerald-500 rounded-full" />}
                  </div>
                  <span className="text-xs text-slate-400">День {user.day}</span>
                </div>
                <div className="text-right">
                  <div className="text-emerald-400 font-semibold">✅ {user.tasksCompleted}</div>
                  <div className="text-xs text-slate-400">🔥 {user.streak}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Your Stats */}
        <div className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 rounded-2xl p-4 border border-emerald-500/30">
          <h3 className="text-emerald-300 font-semibold mb-3">📊 Твои показатели</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-800/50 rounded-xl p-3 text-center">
              <span className="text-2xl">📅</span>
              <div className="text-xl font-bold text-white">{progress.currentDay || 0}</div>
              <div className="text-xs text-slate-400">День</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-3 text-center">
              <span className="text-2xl">✅</span>
              <div className="text-xl font-bold text-white">{progress.completedDays.length}</div>
              <div className="text-xs text-slate-400">Завершено</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-3 text-center">
              <span className="text-2xl">🔥</span>
              <div className="text-xl font-bold text-white">{progress.completedDays.length}</div>
              <div className="text-xs text-slate-400">Серия</div>
            </div>
          </div>
        </div>

        {/* Motivation */}
        <div className="mt-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-4 border border-purple-500/30 text-center">
          <span className="text-3xl">💪</span>
          <p className="text-purple-200 mt-2 text-sm">
            {sameDayUsers.length > 0 
              ? `${sameDayUsers.length} человек проходят этот день вместе с тобой!`
              : 'Ты первый на этом дне! Покажи пример другим!'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default LeaderboardPage





