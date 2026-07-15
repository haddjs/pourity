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

export interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface SkillCategory {
  id: string;
  /** Editable group label, e.g. "Design", "Research", "Tools" */
  name: string;
  skills: string[];
}

export interface CvData {
  personal: PersonalInfo;
  summary: string;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: SkillCategory[];
}
