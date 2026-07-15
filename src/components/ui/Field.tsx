import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react'

const fieldBase =
  'w-full rounded-md border border-stone bg-white px-3 py-2 font-body text-sm ' +
  'text-midnight placeholder:text-slate/70 transition-colors ' +
  'focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20'

interface LabelProps {
  label?: string
  htmlFor?: string
  hint?: string
  children: ReactNode
}

/** Uppercase label + optional helper text wrapping a control. */
export function Field({ label, htmlFor, hint, children }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-1.5">
      {label && (
        <span className="label-caps text-slate">{label}</span>
      )}
      {children}
      {hint && <span className="text-xs text-slate">{hint}</span>}
    </label>
  )
}

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  hint?: string
}

export function TextField({ label, hint, id, className = '', ...props }: TextFieldProps) {
  return (
    <Field label={label} htmlFor={id} hint={hint}>
      <input id={id} className={`${fieldBase} ${className}`} {...props} />
    </Field>
  )
}

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  hint?: string
}

export function TextArea({
  label,
  hint,
  id,
  className = '',
  rows = 3,
  ...props
}: TextAreaProps) {
  return (
    <Field label={label} htmlFor={id} hint={hint}>
      <textarea
        id={id}
        rows={rows}
        className={`${fieldBase} resize-y leading-relaxed ${className}`}
        {...props}
      />
    </Field>
  )
}
