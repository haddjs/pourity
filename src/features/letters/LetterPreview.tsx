import { useMemo, type ReactNode } from "react";
import { formatLongDate } from "../../lib/format";
import { PaginatedDocument, type DocBlock } from "../cv/PaginatedDocument";
import type { LetterConfig, LetterData } from "./types";

/**
 * Renders a manual-template letter as a standard, single-column business
 * letter on A4 pages. Reuses the CV paginator so long letters flow onto extra
 * pages and print/export behave identically.
 */
export function LetterPreview({
  data,
  config,
}: {
  data: LetterData;
  config: LetterConfig;
}) {
  const blocks = useMemo(
    () => buildLetterBlocks(data, config),
    [data, config],
  );
  return <PaginatedDocument blocks={blocks} />;
}

function splitParagraphs(body: string): string[] {
  return body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function buildLetterBlocks(
  data: LetterData,
  config: LetterConfig,
): DocBlock[] {
  const blocks: DocBlock[] = [];

  blocks.push({ key: "sender", gapBefore: 0, node: <SenderHeader data={data} /> });

  if (data.date) {
    blocks.push({
      key: "date",
      gapBefore: 20,
      node: <Line>{formatLongDate(data.date)}</Line>,
    });
  }

  const recipientLines = [
    data.recipientName,
    data.recipientTitle,
    data.organization,
    data.organizationLocation,
  ].filter((l) => l.trim());
  if (recipientLines.length > 0) {
    blocks.push({
      key: "recipient",
      gapBefore: 16,
      node: (
        <div className="text-[13px] leading-snug text-neutral-900">
          {recipientLines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      ),
    });
  }

  if (data.role.trim()) {
    blocks.push({
      key: "subject",
      gapBefore: 16,
      node: (
        <Line>
          <span className="font-semibold">Re:</span> {config.subjectPrefix}{" "}
          {data.role}
        </Line>
      ),
    });
  }

  const greeting = data.greeting.trim() || config.defaultGreeting;
  blocks.push({ key: "greeting", gapBefore: 16, node: <Line>{greeting}</Line> });

  const paragraphs = splitParagraphs(data.body);
  paragraphs.forEach((para, i) => {
    blocks.push({
      key: `body-${i}`,
      gapBefore: i === 0 ? 14 : 12,
      node: (
        <p className="text-[13px] leading-relaxed whitespace-pre-line text-neutral-900">
          {para}
        </p>
      ),
    });
  });

  blocks.push({
    key: "signoff",
    gapBefore: 18,
    node: (
      <div className="text-[13px] text-neutral-900">
        <p>{data.signOff.trim() || config.defaultSignOff}</p>
        <p className="mt-6 font-semibold">{data.senderName || "Your Name"}</p>
      </div>
    ),
  });

  return blocks;
}

function SenderHeader({ data }: { data: LetterData }) {
  const contact = [data.senderEmail, data.senderPhone, data.senderLocation]
    .filter((c) => c.trim())
    .join("  ·  ");
  return (
    <div>
      <p className="text-[15px] font-bold text-black">
        {data.senderName || "Your Name"}
      </p>
      {contact && (
        <p className="mt-0.5 text-[12px] text-neutral-700">{contact}</p>
      )}
    </div>
  );
}

function Line({ children }: { children: ReactNode }) {
  return <p className="text-[13px] text-neutral-900">{children}</p>;
}
