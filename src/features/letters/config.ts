import type { LetterConfig } from "./types";

export const COVER_CONFIG: LetterConfig = {
  kind: "cover",
  navTitle: "Cover Letter",
  storageKey: "pourity.cover.v1",
  filePrefix: "CoverLetter",
  roleLabel: "Position",
  rolePlaceholder: "Full Stack Developer",
  orgLabel: "Company",
  orgPlaceholder: "Northwind Labs",
  recipientPlaceholder: "Hiring Manager",
  subjectPrefix: "Application for the position of",
  defaultGreeting: "Dear Hiring Manager,",
  defaultSignOff: "Sincerely,",
  badgeText: "Cover Letter",
  defaultBody: `I am writing to express my strong interest in the [position] role at [company]. With my background in [your field] and a track record of shipping real results, I am confident I can make a meaningful contribution to your team.

In my most recent role, I [describe a key achievement, ideally with a measurable outcome]. This work sharpened my skills in [relevant skills], which align closely with what this position calls for.

What draws me to [company] specifically is [a concrete reason — the mission, a product, or the team]. I would welcome the opportunity to discuss how my experience can support your goals.

Thank you for your time and consideration. I look forward to the possibility of speaking with you.`,
};

export const MOTIVATION_CONFIG: LetterConfig = {
  kind: "motivation",
  navTitle: "Motivation Letter",
  storageKey: "pourity.motivation.v1",
  filePrefix: "MotivationLetter",
  roleLabel: "Program / scholarship",
  rolePlaceholder: "MSc in Data Science",
  orgLabel: "Institution / organization",
  orgPlaceholder: "Telkom University",
  recipientPlaceholder: "Admissions Committee",
  subjectPrefix: "Application for",
  defaultGreeting: "Dear Admissions Committee,",
  defaultSignOff: "Sincerely,",
  badgeText: "Motivation Letter",
  defaultBody: `I am writing to express my sincere motivation to join [program] at [organization]. This opportunity represents a deliberate next step toward [your goal], and I am confident this program is the right environment for me to pursue it.

My background in [your field] has shaped both my skills and my perspective. Through [a project, role, or experience], I discovered [what genuinely motivates you], and it is this drive that stands behind my application.

I am especially drawn to [organization] because [a specific reason — a course, a mentor, the community, or the research]. I am eager to contribute my commitment and curiosity while growing alongside my peers.

Thank you for considering my application. It would be a privilege to bring my energy and dedication to your program.`,
};
