import type { ReactNode } from "react";
import type { CvSection } from "../../types";
import { headingHint } from "../../data/sections";

interface Props {
  section: CvSection;
  index: number;
  count: number;
  onTitleChange: (title: string) => void;
  onMove: (direction: -1 | 1) => void;
  onRemove: () => void;
  children: ReactNode;
}

/**
 * Wraps a body section with an editable heading (sticky) plus reorder and
 * delete controls. The heading input reads as plain text until hovered or
 * focused, keeping the panel calm while still being editable.
 */
export function SectionShell({
  section,
  index,
  count,
  onTitleChange,
  onMove,
  onRemove,
  children,
}: Props) {
  const hint = headingHint(section);

  return (
    <section>
      <header className="sticky top-0 z-10 flex items-center gap-1 border-b border-stone bg-parchment/95 px-3 py-2 backdrop-blur-sm">
        <input
          value={section.title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Section heading"
          aria-label="Section heading"
          className="min-w-0 flex-1 rounded-md border border-transparent bg-transparent px-1.5 py-1 font-display text-sm font-semibold text-midnight transition-colors placeholder:font-body placeholder:font-normal placeholder:text-slate/70 hover:border-stone focus:border-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy/20"
        />
        <IconButton
          label="Move section up"
          disabled={index === 0}
          onClick={() => onMove(-1)}
        >
          ↑
        </IconButton>
        <IconButton
          label="Move section down"
          disabled={index === count - 1}
          onClick={() => onMove(1)}
        >
          ↓
        </IconButton>
        <IconButton label="Delete section" danger onClick={onRemove}>
          ✕
        </IconButton>
      </header>

      {hint && <p className="px-4 pt-2 text-xs text-ember">{hint}</p>}

      <div className="flex flex-col gap-4 p-4">{children}</div>
    </section>
  );
}

function IconButton({
  label,
  onClick,
  disabled,
  danger,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-sm transition-colors disabled:opacity-30 disabled:hover:bg-transparent ${
        danger
          ? "text-slate hover:bg-ember/10 hover:text-ember"
          : "text-slate hover:bg-stone/50 hover:text-midnight"
      }`}
    >
      {children}
    </button>
  );
}
