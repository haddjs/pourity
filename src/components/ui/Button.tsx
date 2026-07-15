import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'accent' | 'ghost'
type Size = 'sm' | 'md'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: ReactNode
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-body font-semibold ' +
  'transition-colors focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-ember focus-visible:ring-offset-1 disabled:opacity-50 ' +
  'disabled:pointer-events-none cursor-pointer whitespace-nowrap'

const variants: Record<Variant, string> = {
  // Navy signals interactive affordances.
  primary: 'bg-navy text-white hover:bg-navy-light',
  // Ember is used sparingly — CTAs and highlights only.
  accent: 'bg-ember text-white hover:brightness-95',
  ghost: 'bg-transparent text-midnight border border-stone hover:bg-stone/40',
}

const sizes: Record<Size, string> = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-4 py-2',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
