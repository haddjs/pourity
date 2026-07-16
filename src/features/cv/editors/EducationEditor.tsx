import type { EducationEntry } from "../../../types";
import { uid } from "../../../lib/format";
import { TextField } from "../../../components/ui/Field";
import { Button } from "../../../components/ui/Button";
import { EntryCard } from "../FormSection";

interface Props {
  value: EducationEntry[];
  onChange: (next: EducationEntry[]) => void;
}

const empty = (): EducationEntry => ({
  id: uid(),
  school: "",
  degree: "",
  field: "",
  location: "",
  startDate: "",
  endDate: "",
  current: false,
});

export function EducationEditor({ value, onChange }: Props) {
  const update = (id: string, patch: Partial<EducationEntry>) =>
    onChange(value.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  const add = () => onChange([...value, empty()]);
  const remove = (id: string) => onChange(value.filter((e) => e.id !== id));

  return (
    <>
      {value.length === 0 && (
        <p className="text-xs text-slate">No entries yet.</p>
      )}
      {value.map((entry, i) => (
        <EntryCard
          key={entry.id}
          title={`Education ${i + 1}`}
          onRemove={() => remove(entry.id)}
        >
          <TextField
            label="School"
            value={entry.school}
            placeholder="University of California, Berkeley"
            onChange={(e) => update(entry.id, { school: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-3">
            <TextField
              label="Degree"
              value={entry.degree}
              placeholder="B.A."
              onChange={(e) => update(entry.id, { degree: e.target.value })}
            />
            <TextField
              label="Field of study"
              value={entry.field}
              placeholder="Cognitive Science"
              onChange={(e) => update(entry.id, { field: e.target.value })}
            />
          </div>
          <TextField
            label="Location"
            value={entry.location}
            placeholder="Berkeley, CA"
            onChange={(e) => update(entry.id, { location: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-3">
            <TextField
              label="Start"
              type="month"
              value={entry.startDate}
              onChange={(e) => update(entry.id, { startDate: e.target.value })}
            />
            <TextField
              label="End"
              type="month"
              value={entry.endDate}
              disabled={entry.current}
              onChange={(e) => update(entry.id, { endDate: e.target.value })}
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-midnight">
            <input
              type="checkbox"
              checked={entry.current}
              onChange={(e) =>
                update(entry.id, {
                  current: e.target.checked,
                  endDate: e.target.checked ? "" : entry.endDate,
                })
              }
              className="accent-navy"
            />
            Currently studying here
          </label>
        </EntryCard>
      ))}
      <div>
        <Button variant="ghost" size="sm" onClick={add}>
          + Add education
        </Button>
      </div>
    </>
  );
}
