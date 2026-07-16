import type { CvData, CvSection } from "../types";
import { uid } from "../lib/format";

/**
 * Seed content. Uses the design-system sample persona (Alexandra Chen) so a
 * first-time visitor immediately sees a filled, ATS-shaped document rather
 * than an empty page.
 */
export const defaultCv: CvData = {
  personal: {
    fullName: "Alexandra Chen",
    headline: "Senior Product Designer",
    email: "alexandra.chen@email.com",
    phone: "(415) 555-0142",
    location: "San Francisco, CA",
    links: [
      { id: "lnk-1", label: "LinkedIn", url: "linkedin.com/in/alexandrachen" },
      { id: "lnk-2", label: "Portfolio", url: "alexandrachen.design" },
    ],
  },
  sections: [
    {
      id: "sec-summary",
      kind: "text",
      title: "Professional Summary",
      content:
        "Product designer with 8+ years designing systems and end-to-end experiences for B2B SaaS. Partners closely with engineering and research to ship accessible, measurable products.",
    },
    {
      id: "sec-experience",
      kind: "experience",
      title: "Work Experience",
      entries: [
        {
          id: "exp-1",
          position: "Senior Product Designer",
          company: "Northwind Labs",
          location: "San Francisco, CA",
          startDate: "2021-03",
          endDate: "",
          current: true,
          bullets:
            "Led the redesign of the core analytics dashboard, lifting task-completion rate by 32%.\nBuilt and maintained a 60-component design system adopted across 4 product teams.\nMentored 3 junior designers and ran weekly critique sessions.",
        },
        {
          id: "exp-2",
          position: "Product Designer",
          company: "Bright Harbor",
          location: "Remote",
          startDate: "2018-06",
          endDate: "2021-02",
          current: false,
          bullets:
            "Shipped a self-serve onboarding flow that cut time-to-first-value from 5 days to 1.\nCollaborated with research to run 40+ usability sessions informing the product roadmap.",
        },
      ],
    },
    {
      id: "sec-education",
      kind: "education",
      title: "Education",
      entries: [
        {
          id: "edu-1",
          school: "University of California, Berkeley",
          degree: "B.A.",
          field: "Cognitive Science",
          location: "Berkeley, CA",
          startDate: "2010-08",
          endDate: "2014-05",
          current: false,
          gpa: "3.8 / 4.0",
          customFields: [
            {
              id: "cf-1",
              label: "Honors",
              value: "Dean's List (2012–2014); graduated with distinction.",
            },
          ],
        },
      ],
    },
    {
      id: "sec-skills",
      kind: "skills",
      title: "Skills",
      categories: [
        {
          id: "sk-1",
          name: "Design",
          skills: ["Design Systems", "Prototyping", "Design Tokens", "UX"],
        },
        {
          id: "sk-2",
          name: "Research",
          skills: ["User Research", "Usability Testing", "Accessibility"],
        },
        {
          id: "sk-3",
          name: "Tools",
          skills: ["Figma", "Storybook", "Jira"],
        },
      ],
    },
  ],
};

/**
 * Compute the initial CV, migrating a pre-sections `pourity.cv.v2` payload into
 * the new sections model so upgrading users keep their data. Returns the
 * default when there is nothing to migrate. The result is only used when no
 * `pourity.cv.v3` value exists yet.
 */
export function migrateInitialCv(): CvData {
  if (typeof window === "undefined") return defaultCv;
  try {
    const raw = window.localStorage.getItem("pourity.cv.v2");
    if (!raw) return defaultCv;
    const old = JSON.parse(raw) as Record<string, unknown>;
    if (!old || typeof old !== "object") return defaultCv;

    const sections: CvSection[] = [];
    if (typeof old.summary === "string" && old.summary.trim()) {
      sections.push({
        id: uid(),
        kind: "text",
        title: "Professional Summary",
        content: old.summary,
      });
    }
    if (Array.isArray(old.experience)) {
      sections.push({
        id: uid(),
        kind: "experience",
        title: "Work Experience",
        entries: old.experience,
      });
    }
    if (Array.isArray(old.education)) {
      sections.push({
        id: uid(),
        kind: "education",
        title: "Education",
        entries: old.education,
      });
    }
    if (Array.isArray(old.skills)) {
      sections.push({
        id: uid(),
        kind: "skills",
        title: "Skills",
        categories: old.skills,
      });
    }

    return {
      personal: (old.personal as CvData["personal"]) ?? defaultCv.personal,
      sections: sections.length ? sections : defaultCv.sections,
    };
  } catch {
    return defaultCv;
  }
}
