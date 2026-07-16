import { TextArea } from "../../../components/ui/Field";

interface Props {
  value: string;
  onChange: (next: string) => void;
}

export function TextEditor({ value, onChange }: Props) {
  return (
    <TextArea
      rows={4}
      value={value}
      placeholder="Write this section’s content…"
      hint="Plain paragraph text — good for a Summary, Profile, or Objective."
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
