import { Fragment, useMemo } from "react";
import { sectionHasContent } from "../../data/sections";
import { formatDateRange, toLines } from "../../lib/format";
import type {
  CustomField,
  CvData,
  EducationEntry,
  ExperienceEntry,
  PersonalInfo,
  SkillCategory,
} from "../../types";
import { PaginatedDocument, type DocBlock } from "./PaginatedDocument";

/**
 * ATS-friendly rendering of the CV, laid out on A4 pages. Deliberately plain:
 *  - single column, no tables / text boxes / columns
 *  - all contact info in body text, never a header/footer
 *  - "•" bullets and "Mon YYYY" dates
 *  - standard fonts only (see .cv-document in index.css)
 *
 * Content is broken into atomic blocks so it can be paginated across sheets.
 */
export function CvPreview({ cv }: { cv: CvData }) {
  const blocks = useMemo(() => buildBlocks(cv), [cv]);
  return <PaginatedDocument blocks={blocks} />;
}

const SECTION_GAP = 14;
const HEADER_GAP = 5;

function buildBlocks(cv: CvData): DocBlock[] {
  const blocks: DocBlock[] = [];

  blocks.push({
    key: "header",
    gapBefore: 0,
    node: <DocHeader personal={cv.personal} />,
  });

  for (const section of cv.sections) {
    if (!sectionHasContent(section)) continue;

    const hasHeading = section.title.trim().length > 0;
    if (hasHeading) {
      blocks.push({
        key: `${section.id}-h`,
        gapBefore: SECTION_GAP,
        isHeader: true,
        node: <SectionHeading title={section.title} />,
      });
    }
    const firstBodyGap = hasHeading ? HEADER_GAP : SECTION_GAP;

    switch (section.kind) {
      case "text":
        blocks.push({
          key: `${section.id}-c`,
          gapBefore: firstBodyGap,
          node: <TextBlock content={section.content} />,
        });
        break;
      case "experience":
        section.entries.forEach((e, i) => {
          blocks.push({
            key: e.id,
            gapBefore: i === 0 ? firstBodyGap : 11,
            node: <ExperienceBlock e={e} />,
          });
        });
        break;
      case "education":
        section.entries.forEach((e, i) => {
          blocks.push({
            key: e.id,
            gapBefore: i === 0 ? firstBodyGap : 10,
            node: <EducationBlock e={e} />,
          });
        });
        break;
      case "skills":
        blocks.push({
          key: `${section.id}-s`,
          gapBefore: firstBodyGap,
          node: <SkillsBlock categories={section.categories} />,
        });
        break;
    }
  }

  return blocks;
}

/* ---------------------------------------------------------------- blocks -- */

interface ContactItem {
  text: string;
  href?: string;
}

function toHref(url: string): string {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function contactItems(personal: PersonalInfo): ContactItem[] {
  const items: ContactItem[] = [];
  if (personal.email)
    items.push({ text: personal.email, href: `mailto:${personal.email}` });
  if (personal.phone)
    items.push({
      text: personal.phone,
      href: `tel:${personal.phone.replace(/[^\d+]/g, "")}`,
    });
  if (personal.location) items.push({ text: personal.location });
  for (const l of personal.links) {
    if (l.url) items.push({ text: l.url, href: toHref(l.url) });
  }
  return items;
}

function DocHeader({ personal }: { personal: PersonalInfo }) {
  const items = contactItems(personal);
  return (
    <div>
      <h1 className="text-[26px] leading-tight font-bold text-black">
        {personal.fullName || "Your Name"}
      </h1>
      {personal.headline && (
        <p className="mt-0.5 text-[14px] font-semibold text-black">
          {personal.headline}
        </p>
      )}
      {items.length > 0 && (
        <p className="mt-1 text-[12px] leading-snug text-neutral-800">
          {items.map((it, i) => (
            <Fragment key={i}>
              {i > 0 && <span className="text-neutral-400">{"  |  "}</span>}
              {it.href ? (
                <a
                  href={it.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-neutral-800 underline-offset-2 hover:underline"
                >
                  {it.text}
                </a>
              ) : (
                <span>{it.text}</span>
              )}
            </Fragment>
          ))}
        </p>
      )}
    </div>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="border-b border-neutral-400 pb-0.5 text-[13px] font-bold tracking-wide text-black uppercase">
      {title}
    </h2>
  );
}

function TextBlock({ content }: { content: string }) {
  return (
    <p className="text-[12.5px] leading-snug text-justify text-neutral-900">
      {content}
    </p>
  );
}

function ExperienceBlock({ e }: { e: ExperienceEntry }) {
  const range = formatDateRange(e.startDate, e.endDate, e.current);
  return (
    <div className="break-inside-avoid">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[13px] font-bold text-black">
          {e.position || "Position"}
          {e.company && <span className="font-semibold">, {e.company}</span>}
        </p>
        {range && (
          <p className="shrink-0 text-[12px] text-neutral-700">{range}</p>
        )}
      </div>
      {e.location && (
        <p className="text-[12px] text-neutral-700 italic">{e.location}</p>
      )}
      <ul className="mt-0.5 list-none">
        {toLines(e.bullets).map((line, i) => (
          <li
            key={i}
            className="flex gap-2 text-[12.5px] leading-snug text-justify text-neutral-900"
          >
            <span aria-hidden>•</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EducationBlock({ e }: { e: EducationEntry }) {
  const range = formatDateRange(e.startDate, e.endDate, e.current);
  const degree = [e.degree, e.field].filter(Boolean).join(", ");
  const fields = e.customFields ?? [];
  return (
    <div className="break-inside-avoid">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[13px] font-bold text-black">
          {e.school || "School"}
        </p>
        {range && (
          <p className="shrink-0 text-[12px] text-neutral-700">{range}</p>
        )}
      </div>
      {(degree || e.location) && (
        <p className="text-[12.5px] text-neutral-900">
          {degree}
          {degree && e.location ? " — " : ""}
          {e.location && (
            <span className="text-neutral-700 italic">{e.location}</span>
          )}
        </p>
      )}
      {e.gpa && <p className="text-[12.5px] text-neutral-900">GPA: {e.gpa}</p>}
      {fields.map((f) => (
        <CustomFieldView key={f.id} field={f} />
      ))}
    </div>
  );
}

function CustomFieldView({ field }: { field: CustomField }) {
  const label = field.label.trim();
  const lines = toLines(field.value);
  if (lines.length === 0 && !label) return null;

  if (lines.length <= 1) {
    return (
      <p className="mt-0.5 text-[12.5px] leading-snug text-justify text-neutral-900">
        {label && <span className="font-semibold">{label}: </span>}
        {lines[0] ?? ""}
      </p>
    );
  }

  return (
    <div className="mt-0.5 text-[12.5px] leading-snug text-neutral-900">
      {label && <p className="font-semibold">{label}:</p>}
      <ul className="list-none">
        {lines.map((line, i) => (
          <li key={i} className="flex gap-2">
            <span aria-hidden>•</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SkillsBlock({ categories }: { categories: SkillCategory[] }) {
  return (
    <div className="flex flex-col gap-1">
      {categories
        .filter((c) => c.skills.length > 0)
        .map((cat) => (
          <p
            key={cat.id}
            className="text-[12.5px] leading-snug text-neutral-900"
          >
            {cat.name && <span className="font-bold">{cat.name}: </span>}
            {cat.skills.join(", ")}
          </p>
        ))}
    </div>
  );
}
