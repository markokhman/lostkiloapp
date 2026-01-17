import { useCourse } from '../context/CourseContext'
import { avatarColors } from '../data/images'
import { Trophy, Users, Flame, CheckCircle, Calendar, BarChart2, Crown, Target, TrendingUp, Star } from 'lucide-react'

// Mock leaderboard data with real photos
const generateMockUsers = (currentDay: number) => {
  const users = [
    { name: 'Анна', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' },
    { name: 'Мария', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop' },
    { name: 'Алексей', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop' },
    { name: 'Елена', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop' },
    { name: 'Дмитрий', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop' },
    { name: 'Ольга', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop' },
    { name: 'Наталья', photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop' },
    { name: 'Сергей', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop' },
    { name: 'Ирина', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop' },
    { name: 'Максим', photo: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop' },
    { name: 'Татьяна', photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop' },
    { name: 'Александр', photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop' },
    { name: 'Юлия', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop' },
    { name: 'Андрей', photo: 'https://images.unsplash.com/photo-1522075469751-3a3694c60e9e?w=150&h=150&fit=crop' },
    { name: 'Екатерина', photo: 'https://images.unsplash.com/photo-1542596594-649edbc13630?w=150&h=150&fit=crop' },
  ]

  return users.map((user, idx) => {
    // Randomize day around current day
    const dayOffset = Math.floor(Math.random() * 5) - 2
    const userDay = Math.max(1, Math.min(20, currentDay + dayOffset))
    
    return {
      id: idx + 1,
      name: user.name,
      photo: user.photo,
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
        
            <div className="relative px-4 pt-[calc(6rem+env(safe-area-inset-top,20px))] pb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500/20 rounded-2xl backdrop-blur-sm border border-amber-500/30 animate-bounce">
              <Trophy size={32} className="text-amber-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Лидерборд</h1>
              <p className="text-amber-200/70 text-sm mt-1">Участники курса</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4">
        {/* Same Day Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            <h2 className="text-lg font-semibold text-white">
              На дне {currentDay} вместе с тобой
            </h2>
            <span className="text-emerald-400 text-sm font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full">
              {sameDayUsers.length}
            </span>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            {sameDayUsers.map((user, idx) => (
              <div
                key={user.id}
                className="flex-shrink-0 w-20 text-center animate-fade-in group"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="relative inline-block">
                  <div className="w-16 h-16 mx-auto rounded-2xl p-0.5 bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg transform group-hover:scale-105 transition-transform">
                     <img 
                       src={user.photo} 
                       alt={user.name}
                       className="w-full h-full object-cover rounded-[14px] bg-slate-800"
                     />
                  </div>
                  {user.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-slate-900 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse" />
                    </div>
                  )}
                </div>
                <p className="text-white text-xs font-medium mt-2 truncate">{user.name}</p>
                <div className="flex items-center justify-center gap-1 text-emerald-400 text-[10px] mt-1">
                  <Flame size={10} />
                  <span>{user.streak} дней</span>
                </div>
              </div>
            ))}
            
            {sameDayUsers.length === 0 && (
              <div className="w-full text-center py-8 text-slate-400 bg-slate-800/30 rounded-2xl border border-slate-700/30 border-dashed">
                <Users size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">Пока никого нет на этом дне</p>
              </div>
            )}
          </div>
        </div>

        {/* Top 10 */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-8">
             <Star size={20} className="text-amber-400 fill-amber-400" />
             <h2 className="text-lg font-semibold text-white">Топ участников</h2>
          </div>
          
          {/* Top 3 Podium */}
          <div className="flex justify-center items-end gap-3 mb-6 h-48 px-2">
            {/* 2nd Place */}
            {topUsers[1] && (
              <div className="flex flex-col items-center w-1/3 animate-fade-in" style={{ animationDelay: '200ms' }}>
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl p-0.5 bg-gradient-to-br from-slate-400 to-slate-500 shadow-lg mb-2">
                    <img src={topUsers[1].photo} alt={topUsers[1].name} className="w-full h-full object-cover rounded-[14px] bg-slate-800" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-slate-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-slate-900">
                    2
                  </div>
                </div>
                <div className="bg-gradient-to-t from-slate-700/80 to-slate-600/80 w-full h-24 rounded-t-2xl mt-1 flex flex-col items-center justify-center p-2 backdrop-blur-sm border-t border-slate-500/30">
                  <span className="text-xs text-white font-medium truncate w-full text-center">{topUsers[1].name}</span>
                  <div className="flex items-center gap-1 mt-1 bg-slate-800/50 px-2 py-0.5 rounded-full">
                     <CheckCircle size={10} className="text-emerald-400" />
                     <span className="text-[10px] text-emerald-300">{topUsers[1].tasksCompleted}</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* 1st Place */}
            {topUsers[0] && (
              <div className="flex flex-col items-center w-1/3 z-10 animate-fade-in" style={{ animationDelay: '100ms' }}>
                <Crown size={32} className="text-amber-400 mb-1 animate-bounce" fill="currentColor" />
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl p-0.5 bg-gradient-to-br from-amber-400 to-orange-500 shadow-xl shadow-amber-500/20 mb-2">
                    <img src={topUsers[0].photo} alt={topUsers[0].name} className="w-full h-full object-cover rounded-[14px] bg-slate-800" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center border-2 border-slate-900">
                    1
                  </div>
                </div>
                <div className="bg-gradient-to-t from-amber-600/80 to-amber-500/80 w-full h-32 rounded-t-2xl mt-1 flex flex-col items-center justify-center p-2 backdrop-blur-sm border-t border-amber-400/30">
                  <span className="text-sm text-white font-bold truncate w-full text-center">{topUsers[0].name}</span>
                  <div className="flex items-center gap-1 mt-1 bg-amber-700/50 px-2 py-1 rounded-full border border-amber-400/20">
                     <CheckCircle size={12} className="text-white" />
                     <span className="text-xs text-white font-medium">{topUsers[0].tasksCompleted}</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* 3rd Place */}
            {topUsers[2] && (
              <div className="flex flex-col items-center w-1/3 animate-fade-in" style={{ animationDelay: '300ms' }}>
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl p-0.5 bg-gradient-to-br from-amber-700 to-amber-800 shadow-lg mb-2">
                    <img src={topUsers[2].photo} alt={topUsers[2].name} className="w-full h-full object-cover rounded-[14px] bg-slate-800" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-amber-800 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-slate-900">
                    3
                  </div>
                </div>
                <div className="bg-gradient-to-t from-amber-900/80 to-amber-800/80 w-full h-20 rounded-t-2xl mt-1 flex flex-col items-center justify-center p-2 backdrop-blur-sm border-t border-amber-700/30">
                  <span className="text-xs text-white font-medium truncate w-full text-center">{topUsers[2].name}</span>
                   <div className="flex items-center gap-1 mt-1 bg-amber-950/50 px-2 py-0.5 rounded-full">
                     <CheckCircle size={10} className="text-emerald-400" />
                     <span className="text-[10px] text-emerald-300">{topUsers[2].tasksCompleted}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Rest of top 10 */}
          <div className="space-y-2 bg-slate-800/40 rounded-2xl p-2 border border-slate-700/30">
            {topUsers.slice(3).map((user, idx) => (
              <div
                key={user.id}
                className="flex items-center gap-3 p-3 bg-slate-800/60 rounded-xl border border-slate-700/50 animate-fade-in hover:bg-slate-700/60 transition-all"
                style={{ animationDelay: `${(idx + 4) * 100}ms` }}
              >
                <span className="text-slate-500 font-bold w-6 text-center">{idx + 4}</span>
                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium truncate">{user.name}</span>
                    {user.isOnline && <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" />}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                    <span className="flex items-center gap-1"><Calendar size={10} /> День {user.day}</span>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <div className="text-emerald-400 font-semibold text-sm flex items-center gap-1">
                    <CheckCircle size={12} /> {user.tasksCompleted}
                  </div>
                  <div className="text-xs text-orange-400 flex items-center gap-1">
                    <Flame size={10} /> {user.streak}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Your Stats */}
        <div className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 rounded-2xl p-5 border border-emerald-500/30">
          <h3 className="text-emerald-300 font-semibold mb-4 flex items-center gap-2">
            <BarChart2 size={20} />
            Твои показатели
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-800/50 rounded-xl p-3 text-center border border-slate-700/30">
              <Calendar size={24} className="mx-auto text-blue-400 mb-2" />
              <div className="text-xl font-bold text-white">{progress.currentDay || 0}</div>
              <div className="text-xs text-slate-400 mt-1">День</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-3 text-center border border-slate-700/30">
              <CheckCircle size={24} className="mx-auto text-emerald-400 mb-2" />
              <div className="text-xl font-bold text-white">{progress.completedDays.length}</div>
              <div className="text-xs text-slate-400 mt-1">Завершено</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-3 text-center border border-slate-700/30">
              <Flame size={24} className="mx-auto text-orange-400 mb-2" />
              <div className="text-xl font-bold text-white">{progress.completedDays.length}</div>
              <div className="text-xs text-slate-400 mt-1">Серия</div>
            </div>
          </div>
        </div>

        {/* Motivation */}
        <div className="mt-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-4 border border-purple-500/20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <Target size={64} className="text-purple-400" />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/20 mb-3 text-purple-300">
               <TrendingUp size={24} />
            </div>
            <p className="text-purple-200 text-sm font-medium">
              {sameDayUsers.length > 0 
                ? `${sameDayUsers.length} человек проходят этот день вместе с тобой! Вперед к цели!`
                : 'Ты лидер на этом дне! Покажи пример другим!'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaderboardPage