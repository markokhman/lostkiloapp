import clsx from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: 'default' | 'gradient' | 'outline'
}

export default function Card({ 
  children, 
  className = '', 
  onClick,
  variant = 'default'
}: CardProps) {
  const baseStyles = 'rounded-2xl transition-all duration-200'
  
  const variants = {
    default: 'bg-white shadow-sm border border-gray-100',
    gradient: 'gradient-primary text-white shadow-lg shadow-primary-500/20',
    outline: 'bg-transparent border-2 border-gray-200',
  }

  return (
    <div 
      className={clsx(
        baseStyles,
        variants[variant],
        onClick && 'cursor-pointer active:scale-[0.98]',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}






