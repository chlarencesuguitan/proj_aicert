import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand text-gray-900 hover:bg-brand-dark border border-brand shadow-sm',
  secondary:
    'bg-surface text-foreground border border-border hover:bg-gray-50 shadow-sm',
  outline:
    'bg-transparent text-brand-dark border border-brand hover:bg-brand-light',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-60 disabled:cursor-not-allowed'

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
