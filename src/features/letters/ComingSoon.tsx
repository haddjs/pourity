import { Badge } from '../../components/ui/Badge'

interface Props {
  title: string
  description: string
}

/** Placeholder for the letter makers — same two-panel silhouette, filled next. */
export function ComingSoon({ title, description }: Props) {
  return (
    <div className="flex h-full items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="mb-4 flex justify-center">
          <Badge tone="navy">Coming next</Badge>
        </div>
        <h1 className="font-display text-2xl font-bold text-midnight">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate">{description}</p>
      </div>
    </div>
  )
}
