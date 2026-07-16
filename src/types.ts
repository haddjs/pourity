/**
 * Pourity data model.
 *
 * The shape is intentionally flat and single-column friendly so the same
 * data serialises cleanly to an ATS-parseable document.
 */

export interface ContactLink {
  id: string;
  /** e.g. "LinkedIn", "Portfolio", "GitHub" */
  label: string;
  /** Shown verbatim in the CV body, e.g. "linkedin.com/in/achen" */
  url: string;
}

export interface PersonalInfo {
  fullName: string;
  /** Professional headline, e.g. "Senior Product Designer" */
  headline: string;
  email: string;
  phone: string;
  /** City, Country — kept in body text, never a header/footer */
  location: string;
  links: ContactLink[];
}

export interface ExperienceEntry {
  id: string;
  position: string;
  company: string;
  location: string;
  /** "YYYY-MM" from a month input; formatted to "Mon YYYY" on render */
  startDate: string;
  endDate: string;
  current: boolean;
  /** One achievement per line; rendered as "•" bullets */
  bullets: string;
}

/** A user-named extra field, e.g. "Final Project", "Achievements", "Thesis". */
export interface CustomField {
  id: string;
  label: string;
  value: string;
}

export interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  /** Optional — grade point average. */
  gpa?: string;
  /** Optional user-defined fields (achievements, projects, etc.). */
  customFields?: CustomField[];
}

export interface SkillCategory {
  id: string;
  /** Editable group label, e.g. "Design", "Research", "Tools" */
  name: string;
  skills: string[];
}

/**
 * Body sections are an ordered, editable list. Every section carries its own
 * heading (`title`) and a `kind` that determines which editor + renderer it
 * uses, so headings can be renamed and new sections added or reordered freely.
 */
export type SectionKind = "text" | "experience" | "education" | "skills";

interface SectionBase {
  id: string;
  title: string;
}

export interface CvTextSection extends SectionBase {
  kind: "text";
  /** Free paragraph — Professional Summary, Profile, Objective, etc. */
  content: string;
}

export interface CvExperienceSection extends SectionBase {
  kind: "experience";
  entries: ExperienceEntry[];
}

export interface CvEducationSection extends SectionBase {
  kind: "education";
  entries: EducationEntry[];
}

export interface CvSkillsSection extends SectionBase {
  kind: "skills";
  categories: SkillCategory[];
}

export type CvSection =
  | CvTextSection
  | CvExperienceSection
  | CvEducationSection
  | CvSkillsSection;

export interface CvData {
  /** Fixed name + contact header — always first, not a titled section. */
  personal: PersonalInfo;
  sections: CvSection[];
}
