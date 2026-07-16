import type { ReactNode } from "react";
import type { CvData, CvSection } from "../../types";
import { formatDateRange, toLines } from "../../lib/format";
import { sectionHasContent } from "../../data/sections";

/**
 * ATS-friendly rendering of the CV. Deliberately plain:
 *  - single column, no tables / text boxes / columns
 *  - all contact info in body text, never a header/footer
 *  - "•" bullets and "Mon YYYY" dates
 *  - standard fonts only (see .cv-document in index.css)
 *
 * Body sections render in their stored order using their own headings.
 */
export function CvPreview({ cv }: { cv: CvData }) {
  const { personal, sections } = cv;

  const contactParts = [
    personal.email,
    personal.phone,
    personal.location,
    ...personal.links.map((l) => l.url).filter(Boolean),
  ].filter(Boolean);

  return (
    <article className="cv-document mx-auto w-full max-w-[816px] px-6 py-8 shadow-[0_1px_3px_rgba(15,25,35,0.12),0_8px_24px_rgba(15,25,35,0.08)] sm:px-10 sm:py-10 lg:px-12 lg:py-12">
      {/* Name + headline */}
      <header className="mb-1">
        <h1 className="text-[26px] leading-tight font-bold text-black">
          {personal.fullName || "Your Name"}
        </h1>
        {personal.headline && (
          <p className="mt-0.5 text-[14px] font-semibold text-black">
            {personal.headline}
          </p>
        )}
      </header>

      {/* Contact info — in body text, separated by • */}
      {contactParts.length > 0 && (
        <p className="mb-5 text-[12px] leading-snug text-neutral-800">
          {contactParts.join("  •  ")}
        </p>
      )}

      {sections.map((section) =>
        sectionHasContent(section) ? (
          <Section key={section.id} title={section.title}>
            <SectionBody section={section} />
          </Section>
        ) : null,
      )}
    </article>
  );
}

function SectionBody({ section }: { section: CvSection }) {
  switch (section.kind) {
    case "text":
      return (
        <p className="text-[12.5px] leading-relaxed text-neutral-900">
          {section.content}
        </p>
      );

    case "experience":
      return (
        <div className="flex flex-col gap-3.5">
          {section.entries.map((e) => {
            const range = formatDateRange(e.startDate, e.endDate, e.current);
            return (
              <div key={e.id}>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-[13px] font-bold text-black">
                    {e.position || "Position"}
                    {e.company && (
                      <span className="font-semibold">, {e.company}</span>
                    )}
                  </p>
                  {range && (
                    <p className="shrink-0 text-[12px] text-neutral-700">
                      {range}
                    </p>
                  )}
                </div>
                {e.location && (
                  <p className="text-[12px] text-neutral-700 italic">
                    {e.location}
                  </p>
                )}
                <ul className="mt-1 list-none">
                  {toLines(e.bullets).map((line, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-[12.5px] leading-relaxed text-neutral-900"
                    >
                      <span aria-hidden>•</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      );

    case "education":
      return (
        <div className="flex flex-col gap-2.5">
          {section.entries.map((e) => {
            const range = formatDateRange(e.startDate, e.endDate, e.current);
            const degree = [e.degree, e.field].filter(Boolean).join(", ");
            return (
              <div key={e.id}>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-[13px] font-bold text-black">
                    {e.school || "School"}
                  </p>
                  {range && (
                    <p className="shrink-0 text-[12px] text-neutral-700">
                      {range}
                    </p>
                  )}
                </div>
                {(degree || e.location) && (
                  <p className="text-[12.5px] text-neutral-900">
                    {degree}
                    {degree && e.location ? " — " : ""}
                    {e.location && (
                      <span className="text-neutral-700 italic">
                        {e.location}
                      </span>
                    )}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      );

    case "skills":
      return (
        <div className="flex flex-col gap-1">
          {section.categories
            .filter((c) => c.skills.length > 0)
            .map((cat) => (
              <p
                key={cat.id}
                className="text-[12.5px] leading-relaxed text-neutral-900"
              >
                {cat.name && <span className="font-bold">{cat.name}: </span>}
                {cat.skills.join(", ")}
              </p>
            ))}
        </div>
      );
  }
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-4">
      {title.trim() && (
        <h2 className="mb-1.5 border-b border-neutral-400 pb-0.5 text-[13px] font-bold tracking-wide text-black uppercase">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
