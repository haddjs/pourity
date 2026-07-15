import type { ReactNode } from 'react'

interface FormSectionProps {
  title: string
  /** Optional trailing control in the sticky header, e.g. an "Add" button */
  action?: ReactNode
  children: ReactNode
}

/**
 * A form section with a sticky header. Headers stack against the top of the
 * scrolling form panel so the current section stays labelled while editing.
 */
export function FormSection({ title, action, children }: FormSectionProps) {
  return (
    <section>
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-stone bg-parchment/95 px-4 py-2.5 backdrop-blur-sm">
        <h2 className="font-display text-sm font-semibold text-midnight">
          {title}
        </h2>
        {action}
      </header>
      <div className="flex flex-col gap-4 p-4">{children}</div>
    </section>
  )
}

interface EntryCardProps {
  title: string
  onRemove: () => void
  children: ReactNode
}

/** A removable card for one row of a repeatable list (experience, education). */
export function EntryCard({ title, onRemove, children }: EntryCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-stone bg-white p-3">
      <div className="flex items-center justify-between">
        <span className="label-caps text-slate">{title}</span>
        <button
          type="button"
          onClick={onRemove}
          className="label-caps cursor-pointer text-slate transition-colors hover:text-ember"
        >
          Remove
        </button>
      </div>
      {children}
    </div>
  )
}
