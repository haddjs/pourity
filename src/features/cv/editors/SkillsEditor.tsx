import type { SkillCategory } from "../../../types";
import { uid } from "../../../lib/format";
import { TagInput } from "../../../components/ui/TagInput";
import { Button } from "../../../components/ui/Button";

interface Props {
  value: SkillCategory[];
  onChange: (next: SkillCategory[]) => void;
}

const empty = (): SkillCategory => ({ id: uid(), name: "", skills: [] });

export function SkillsEditor({ value, onChange }: Props) {
  const update = (id: string, patch: Partial<SkillCategory>) =>
    onChange(value.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  const add = () => onChange([...value, empty()]);
  const remove = (id: string) => onChange(value.filter((c) => c.id !== id));

  return (
    <>
      {value.length === 0 && (
        <p className="text-xs text-slate">
          No categories yet — group skills like “Design”, “Tools”, or
          “Languages”.
        </p>
      )}
      {value.map((cat) => (
        <div
          key={cat.id}
          className="flex flex-col gap-3 rounded-lg border border-stone bg-white p-3"
        >
          <div className="flex items-center gap-2">
            <input
              value={cat.name}
              placeholder="Category name"
              onChange={(e) => update(cat.id, { name: e.target.value })}
              className="flex-1 rounded-md border border-stone bg-white px-2.5 py-1.5 font-display text-sm font-semibold text-midnight placeholder:font-body placeholder:font-normal placeholder:text-slate/70 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
            />
            <button
              type="button"
              onClick={() => remove(cat.id)}
              className="label-caps cursor-pointer text-slate transition-colors hover:text-ember"
            >
              Remove
            </button>
          </div>
          <TagInput
            value={cat.skills}
            onChange={(skills) => update(cat.id, { skills })}
            placeholder="Add a skill and press Enter…"
          />
        </div>
      ))}
      <div className="flex items-center justify-between gap-2">
        <Button variant="ghost" size="sm" onClick={add}>
          + Add category
        </Button>
        {value.length > 0 && (
          <span className="text-xs text-slate">
            Use exact posting keywords for ATS.
          </span>
        )}
      </div>
    </>
  );
}
