import { useState, type KeyboardEvent } from 'react'
import { Field } from './Field'

interface TagInputProps {
  label?: string
  hint?: string
  value: string[]
  onChange: (next: string[]) => void
  placeholder?: string
}

/**
 * Chip-style multi-value input. Add with Enter or comma; remove with the ×
 * on each chip or Backspace on an empty field.
 */
export function TagInput({
  label,
  hint,
  value,
  onChange,
  placeholder = 'Type and press Enter…',
}: TagInputProps) {
  const [draft, setDraft] = useState('')

  const add = (raw: string) => {
    const tag = raw.trim()
    if (!tag || value.includes(tag)) return
    onChange([...value, tag])
  }

  const remove = (tag: string) => onChange(value.filter((t) => t !== tag))

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      add(draft)
      setDraft('')
    } else if (e.key === 'Backspace' && !draft && value.length) {
      remove(value[value.length - 1])
    }
  }

  return (
    <Field label={label} hint={hint}>
      <div className="flex flex-wrap gap-1.5 rounded-md border border-stone bg-white p-2 focus-within:border-navy focus-within:ring-2 focus-within:ring-navy/20">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded bg-parchment px-2 py-1 text-xs font-medium text-midnight"
          >
            {tag}
            <button
              type="button"
              onClick={() => remove(tag)}
              className="text-slate hover:text-ember cursor-pointer"
              aria-label={`Remove ${tag}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => {
            add(draft)
            setDraft('')
          }}
          placeholder={value.length ? '' : placeholder}
          className="min-w-[8ch] flex-1 bg-transparent px-1 py-0.5 font-body text-sm text-midnight placeholder:text-slate/70 focus:outline-none"
        />
      </div>
    </Field>
  )
}
