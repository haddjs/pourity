import type { CvSection, SectionKind } from "../types";
import { uid } from "../lib/format";

/** Options shown in the "Add section" picker. */
export const SECTION_KINDS: {
  kind: SectionKind;
  label: string;
  hint: string;
}[] = [
  { kind: "experience", label: "Work Experience", hint: "Roles with bullets" },
  { kind: "education", label: "Education", hint: "Degrees & schools" },
  { kind: "skills", label: "Skills", hint: "Grouped keywords" },
  { kind: "text", label: "Text", hint: "Summary, Profile, etc." },
];

/** Create a blank section of the given kind with a sensible default heading. */
export function createSection(kind: SectionKind): CvSection {
  const id = uid();
  switch (kind) {
    case "text":
      return { id, kind, title: "Summary", content: "" };
    case "experience":
      return { id, kind, title: "Work Experience", entries: [] };
    case "education":
      return { id, kind, title: "Education", entries: [] };
    case "skills":
      return { id, kind, title: "Skills", categories: [] };
  }
}

/** Whether a section has anything worth rendering in the preview. */
export function sectionHasContent(section: CvSection): boolean {
  switch (section.kind) {
    case "text":
      return section.content.trim().length > 0;
    case "experience":
    case "education":
      return section.entries.length > 0;
    case "skills":
      return section.categories.some((c) => c.skills.length > 0);
  }
}

/**
 * Nudge toward ATS-recognised headings. Returns a hint string when the title
 * is empty or, for a keyword-driven kind, deviates from standard wording.
 */
export function headingHint(section: CvSection): string | null {
  const title = section.title.trim().toLowerCase();
  if (!title) return "Add a heading so ATS can categorise this section.";

  const keywords: Partial<Record<SectionKind, string[]>> = {
    experience: ["experience", "employment", "work history"],
    education: ["education", "academic"],
    skills: ["skill", "competenc", "technolog"],
  };

  const expected = keywords[section.kind];
  if (expected && !expected.some((k) => title.includes(k))) {
    return "Non-standard heading — some ATS parsers may not recognise it.";
  }
  return null;
}
