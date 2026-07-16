import { useState } from "react";
import type { CvData, CvSection, SectionKind } from "../../types";
import { SECTION_KINDS, createSection } from "../../data/sections";
import { Button } from "../../components/ui/Button";
import { PersonalSection } from "./sections/PersonalSection";
import { SectionShell } from "./SectionShell";
import { ExperienceEditor } from "./editors/ExperienceEditor";
import { EducationEditor } from "./editors/EducationEditor";
import { SkillsEditor } from "./editors/SkillsEditor";
import { TextEditor } from "./editors/TextEditor";

interface Props {
  cv: CvData;
  onChange: (next: CvData) => void;
}

/** The full editing form — a fixed personal header plus editable, reorderable
 * body sections and an "Add section" control. */
export function CvForm({ cv, onChange }: Props) {
  const patch = (partial: Partial<CvData>) => onChange({ ...cv, ...partial });

  const setSection = (next: CvSection) =>
    patch({ sections: cv.sections.map((s) => (s.id === next.id ? next : s)) });

  const removeSection = (id: string) =>
    patch({ sections: cv.sections.filter((s) => s.id !== id) });

  const moveSection = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= cv.sections.length) return;
    const next = [...cv.sections];
    [next[index], next[target]] = [next[target], next[index]];
    patch({ sections: next });
  };

  const addSection = (kind: SectionKind) =>
    patch({ sections: [...cv.sections, createSection(kind)] });

  return (
    <div className="divide-y divide-stone">
      <PersonalSection
        value={cv.personal}
        onChange={(personal) => patch({ personal })}
      />

      {cv.sections.map((section, i) => (
        <SectionShell
          key={section.id}
          section={section}
          index={i}
          count={cv.sections.length}
          onTitleChange={(title) => setSection({ ...section, title })}
          onMove={(direction) => moveSection(i, direction)}
          onRemove={() => removeSection(section.id)}
        >
          <SectionEditor section={section} onChange={setSection} />
        </SectionShell>
      ))}

      <AddSection onAdd={addSection} />
    </div>
  );
}

/** Dispatches a section to its kind-specific editor. */
function SectionEditor({
  section,
  onChange,
}: {
  section: CvSection;
  onChange: (next: CvSection) => void;
}) {
  switch (section.kind) {
    case "text":
      return (
        <TextEditor
          value={section.content}
          onChange={(content) => onChange({ ...section, content })}
        />
      );
    case "experience":
      return (
        <ExperienceEditor
          value={section.entries}
          onChange={(entries) => onChange({ ...section, entries })}
        />
      );
    case "education":
      return (
        <EducationEditor
          value={section.entries}
          onChange={(entries) => onChange({ ...section, entries })}
        />
      );
    case "skills":
      return (
        <SkillsEditor
          value={section.categories}
          onChange={(categories) => onChange({ ...section, categories })}
        />
      );
  }
}

function AddSection({ onAdd }: { onAdd: (kind: SectionKind) => void }) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <div className="p-4">
        <Button
          variant="ghost"
          size="sm"
          className="w-full"
          onClick={() => setOpen(true)}
        >
          + Add section
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex flex-col gap-2 rounded-lg border border-stone bg-white p-3">
        <div className="flex items-center justify-between">
          <span className="label-caps text-slate">Add a section</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="label-caps cursor-pointer text-slate transition-colors hover:text-ember"
          >
            Cancel
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {SECTION_KINDS.map((k) => (
            <button
              key={k.kind}
              type="button"
              onClick={() => {
                onAdd(k.kind);
                setOpen(false);
              }}
              className="flex flex-col items-start gap-0.5 rounded-md border border-stone px-3 py-2 text-left transition-colors hover:border-navy hover:bg-parchment"
            >
              <span className="font-body text-sm font-semibold text-midnight">
                {k.label}
              </span>
              <span className="text-xs text-slate">{k.hint}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
