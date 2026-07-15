import type { PersonalInfo } from '../../../types'
import { uid } from '../../../lib/format'
import { TextField } from '../../../components/ui/Field'
import { Button } from '../../../components/ui/Button'
import { FormSection } from '../FormSection'

interface Props {
  value: PersonalInfo
  onChange: (next: PersonalInfo) => void
}

export function PersonalSection({ value, onChange }: Props) {
  const set = <K extends keyof PersonalInfo>(key: K, v: PersonalInfo[K]) =>
    onChange({ ...value, [key]: v })

  const addLink = () =>
    set('links', [...value.links, { id: uid(), label: '', url: '' }])

  const updateLink = (id: string, key: 'label' | 'url', v: string) =>
    set(
      'links',
      value.links.map((l) => (l.id === id ? { ...l, [key]: v } : l)),
    )

  const removeLink = (id: string) =>
    set(
      'links',
      value.links.filter((l) => l.id !== id),
    )

  return (
    <FormSection title="Personal Info">
      <TextField
        id="fullName"
        label="Full name"
        value={value.fullName}
        placeholder="Alexandra Chen"
        onChange={(e) => set('fullName', e.target.value)}
      />
      <TextField
        id="headline"
        label="Professional headline"
        value={value.headline}
        placeholder="Senior Product Designer"
        onChange={(e) => set('headline', e.target.value)}
      />
      <div className="grid grid-cols-2 gap-3">
        <TextField
          id="email"
          label="Email"
          type="email"
          value={value.email}
          placeholder="you@email.com"
          onChange={(e) => set('email', e.target.value)}
        />
        <TextField
          id="phone"
          label="Phone"
          value={value.phone}
          placeholder="(415) 555-0142"
          onChange={(e) => set('phone', e.target.value)}
        />
      </div>
      <TextField
        id="location"
        label="Location"
        value={value.location}
        placeholder="City, Country"
        hint="Kept in body text — never in a header or footer."
        onChange={(e) => set('location', e.target.value)}
      />

      <div className="flex flex-col gap-2">
        <span className="label-caps text-slate">Links</span>
        {value.links.map((link) => (
          <div key={link.id} className="flex items-center gap-2">
            <input
              value={link.label}
              placeholder="LinkedIn"
              onChange={(e) => updateLink(link.id, 'label', e.target.value)}
              className="w-28 rounded-md border border-stone bg-white px-2.5 py-2 font-body text-sm text-midnight placeholder:text-slate/70 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
            />
            <input
              value={link.url}
              placeholder="linkedin.com/in/you"
              onChange={(e) => updateLink(link.id, 'url', e.target.value)}
              className="flex-1 rounded-md border border-stone bg-white px-2.5 py-2 font-body text-sm text-midnight placeholder:text-slate/70 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
            />
            <button
              type="button"
              onClick={() => removeLink(link.id)}
              aria-label="Remove link"
              className="px-1 text-slate hover:text-ember cursor-pointer"
            >
              ×
            </button>
          </div>
        ))}
        <div>
          <Button variant="ghost" size="sm" onClick={addLink}>
            + Add link
          </Button>
        </div>
      </div>
    </FormSection>
  )
}
