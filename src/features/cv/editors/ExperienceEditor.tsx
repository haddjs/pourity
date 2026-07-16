import type { ExperienceEntry } from "../../../types";
import { uid } from "../../../lib/format";
import { TextField, TextArea } from "../../../components/ui/Field";
import { Button } from "../../../components/ui/Button";
import { EntryCard } from "../FormSection";
import { DateRangeFields } from "./DateRangeFields";

interface Props {
  value: ExperienceEntry[];
  onChange: (next: ExperienceEntry[]) => void;
}

const empty = (): ExperienceEntry => ({
  id: uid(),
  position: "",
  company: "",
  location: "",
  startDate: "",
  endDate: "",
  current: false,
  bullets: "",
});

export function ExperienceEditor({ value, onChange }: Props) {
  const update = (id: string, patch: Partial<ExperienceEntry>) =>
    onChange(value.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  const add = () => onChange([...value, empty()]);
  const remove = (id: string) => onChange(value.filter((e) => e.id !== id));

  return (
    <>
      {value.length === 0 && (
        <p className="text-xs text-slate">
          No entries yet — add your most recent role first.
        </p>
      )}
      {value.map((entry, i) => (
        <EntryCard
          key={entry.id}
          title={`Role ${i + 1}`}
          onRemove={() => remove(entry.id)}
        >
          <TextField
            label="Position"
            value={entry.position}
            placeholder="Senior Product Designer"
            onChange={(e) => update(entry.id, { position: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-3">
            <TextField
              label="Company"
              value={entry.company}
              placeholder="Northwind Labs"
              onChange={(e) => update(entry.id, { company: e.target.value })}
            />
            <TextField
              label="Location"
              value={entry.location}
              placeholder="San Francisco, CA"
              onChange={(e) => update(entry.id, { location: e.target.value })}
            />
          </div>
          <DateRangeFields
            startDate={entry.startDate}
            endDate={entry.endDate}
            current={entry.current}
            currentLabel="I currently work here"
            onChange={(patch) => update(entry.id, patch)}
          />
          <TextArea
            label="Achievements"
            rows={4}
            value={entry.bullets}
            placeholder={"One achievement per line.\nStart with an action verb."}
            hint="Each line becomes a • bullet. Quantify impact where you can."
            onChange={(e) => update(entry.id, { bullets: e.target.value })}
          />
        </EntryCard>
      ))}
      <div>
        <Button variant="ghost" size="sm" onClick={add}>
          + Add role
        </Button>
      </div>
    </>
  );
}
