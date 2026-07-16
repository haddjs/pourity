import type { CustomField } from "../../../types";
import { uid } from "../../../lib/format";
import { Button } from "../../../components/ui/Button";

interface Props {
  value: CustomField[];
  onChange: (next: CustomField[]) => void;
  /** Label for the add button, e.g. "Add field". */
  addLabel?: string;
}

const inputBase =
  "w-full rounded-md border border-stone bg-white px-2.5 py-2 font-body text-sm text-midnight placeholder:text-slate/70 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20";

/**
 * A list of user-named fields (label + multiline value). Used for extra
 * details like "Final Project" or "Achievements".
 */
export function CustomFieldsEditor({
  value,
  onChange,
  addLabel = "Add field",
}: Props) {
  const update = (id: string, patch: Partial<CustomField>) =>
    onChange(value.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  const add = () => onChange([...value, { id: uid(), label: "", value: "" }]);
  const remove = (id: string) => onChange(value.filter((f) => f.id !== id));

  return (
    <div className="flex flex-col gap-2">
      <span className="label-caps text-slate">Custom fields</span>

      {value.map((field) => (
        <div
          key={field.id}
          className="flex flex-col gap-2 rounded-md border border-stone bg-parchment/60 p-2"
        >
          <div className="flex items-center gap-2">
            <input
              value={field.label}
              placeholder="Field name (e.g. Final Project)"
              onChange={(e) => update(field.id, { label: e.target.value })}
              className={`${inputBase} font-semibold`}
            />
            <button
              type="button"
              onClick={() => remove(field.id)}
              aria-label="Remove field"
              className="px-1 text-slate transition-colors hover:text-ember"
            >
              ×
            </button>
          </div>
          <textarea
            value={field.value}
            rows={2}
            placeholder="Details… (one line each for multiple points)"
            onChange={(e) => update(field.id, { value: e.target.value })}
            className={`${inputBase} resize-y leading-relaxed`}
          />
        </div>
      ))}

      <div>
        <Button variant="ghost" size="sm" onClick={add}>
          + {addLabel}
        </Button>
      </div>
    </div>
  );
}
