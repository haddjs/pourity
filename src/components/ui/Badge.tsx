import type { ReactNode } from 'react'

type Tone = 'ember' | 'navy' | 'neutral'

const tones: Record<Tone, string> = {
  ember: 'bg-ember-light/40 text-ember',
  navy: 'bg-navy/10 text-navy',
  neutral: 'bg-parchment text-slate',
}

export function Badge({
  tone = 'neutral',
  children,
}: {
  tone?: Tone
  children: ReactNode
}) {
  return (
    <span
      className={`label-caps inline-flex items-center gap-1 rounded px-2 py-1 ${tones[tone]}`}
    >
      {children}
    </span>
  )
}
