import type { EducationEntry } from "../../../types";
import { uid } from "../../../lib/format";
import { TextField } from "../../../components/ui/Field";
import { Button } from "../../../components/ui/Button";
import { EntryCard } from "../FormSection";
import { DateRangeFields } from "./DateRangeFields";
import { CustomFieldsEditor } from "./CustomFieldsEditor";

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
  gpa: "",
  customFields: [],
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
          <div className="grid grid-cols-2 gap-3">
            <TextField
              label="Location"
              value={entry.location}
              placeholder="Berkeley, CA"
              onChange={(e) => update(entry.id, { location: e.target.value })}
            />
            <TextField
              label="GPA"
              value={entry.gpa ?? ""}
              placeholder="3.8 / 4.0"
              onChange={(e) => update(entry.id, { gpa: e.target.value })}
            />
          </div>
          <DateRangeFields
            startDate={entry.startDate}
            endDate={entry.endDate}
            current={entry.current}
            currentLabel="Currently studying here"
            onChange={(patch) => update(entry.id, patch)}
          />
          <CustomFieldsEditor
            value={entry.customFields ?? []}
            onChange={(customFields) => update(entry.id, { customFields })}
          />
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
