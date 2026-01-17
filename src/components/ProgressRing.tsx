interface ProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
  className?: string
}

const ProgressRing = ({ progress, size = 80, strokeWidth = 6, className = '' }: ProgressRingProps) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Background glow */}
      <div 
        className="absolute inset-0 rounded-full opacity-30 blur-md"
        style={{
          background: `conic-gradient(from 0deg, rgba(16, 185, 129, 0.5) ${progress}%, transparent ${progress}%)`
        }}
      />
      
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(100, 116, 139, 0.3)"
          strokeWidth={strokeWidth}
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
          style={{
            filter: 'drop-shadow(0 0 6px rgba(16, 185, 129, 0.5))'
          }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <span className="text-2xl font-bold text-white">{Math.round(progress)}</span>
          <span className="text-sm text-emerald-400">%</span>
        </div>
      </div>
    </div>
  )
}

export default ProgressRing
