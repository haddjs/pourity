import { TextArea } from '../../../components/ui/Field'
import { FormSection } from '../FormSection'

interface Props {
  value: string
  onChange: (next: string) => void
}

export function SummarySection({ value, onChange }: Props) {
  return (
    <FormSection title="Professional Summary">
      <TextArea
        id="summary"
        rows={4}
        value={value}
        placeholder="2–3 sentences on who you are and the value you bring…"
        hint="Lead with your title and years of experience — ATS scans this first."
        onChange={(e) => onChange(e.target.value)}
      />
    </FormSection>
  )
}
