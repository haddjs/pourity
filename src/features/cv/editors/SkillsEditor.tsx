import type { SkillCategory } from "../../../types";
import { uid } from "../../../lib/format";
import { TagInput } from "../../../components/ui/TagInput";
import { Button } from "../../../components/ui/Button";
import { MoveButtons } from "../../../components/ui/MoveButtons";

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
  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <>
      {value.length === 0 && (
        <p className="text-xs text-slate">
          No categories yet — group skills like “Design”, “Tools”, or
          “Languages”.
        </p>
      )}
      {value.map((cat, i) => (
        <div
          key={cat.id}
          className="flex flex-col gap-3 rounded-lg border border-stone bg-white p-3"
        >
          <div className="flex items-center gap-1">
            <input
              value={cat.name}
              placeholder="Category name"
              onChange={(e) => update(cat.id, { name: e.target.value })}
              className="min-w-0 flex-1 rounded-md border border-stone bg-white px-2.5 py-1.5 font-display text-sm font-semibold text-midnight placeholder:font-body placeholder:font-normal placeholder:text-slate/70 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
            />
            <MoveButtons
              index={i}
              count={value.length}
              onMove={(direction) => move(i, direction)}
              labelUp="Move category up"
              labelDown="Move category down"
            />
            <button
              type="button"
              onClick={() => remove(cat.id)}
              aria-label="Remove category"
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-sm text-slate transition-colors hover:bg-ember/10 hover:text-ember"
            >
              ✕
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
