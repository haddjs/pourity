export type LetterKind = "cover" | "motivation";

/** A single manual-template letter. Body paragraphs are blank-line separated. */
export interface LetterData {
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  senderLocation: string;
  /** "YYYY-MM-DD" — rendered as "Month D, YYYY". */
  date: string;
  recipientName: string;
  recipientTitle: string;
  organization: string;
  organizationLocation: string;
  /** Position (cover) or program/scholarship (motivation). */
  role: string;
  greeting: string;
  body: string;
  signOff: string;
}

/** Per-kind wording, defaults, and storage — the only thing that differs. */
export interface LetterConfig {
  kind: LetterKind;
  navTitle: string;
  storageKey: string;
  /** PDF filename prefix, e.g. "CoverLetter". */
  filePrefix: string;
  roleLabel: string;
  rolePlaceholder: string;
  orgLabel: string;
  orgPlaceholder: string;
  recipientPlaceholder: string;
  /** Subject-line lead-in, e.g. "Application for the position of". */
  subjectPrefix: string;
  defaultGreeting: string;
  defaultSignOff: string;
  defaultBody: string;
  badgeText: string;
}
