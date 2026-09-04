type BadgeVariant = 'brand' | 'muted' | 'outline'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  brand: 'bg-brand-light text-brand-dark border border-brand/30',
  muted: 'bg-gray-100 text-gray-700 border border-gray-200',
  outline: 'bg-transparent text-gray-600 border border-border',
}

export function Badge({
  children,
  variant = 'muted',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
