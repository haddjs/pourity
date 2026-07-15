const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Format a "YYYY-MM" month value as "Mon YYYY" (e.g. "Jan 2024").
 *
 * The full year is deliberate — it removes date-parsing ambiguity for ATS,
 * per the Pourity ATS compatibility rules.
 */
export function formatMonth(value: string): string {
  if (!value) return "";
  const [year, month] = value.split("-");
  const index = Number(month) - 1;
  if (!year || index < 0 || index > 11) return value;
  return `${MONTHS[index]} ${year}`;
}

/**
 * Render a date range as "Mon YYYY – Present" (or "– Mon YYYY").
 * Returns an empty string when there is nothing meaningful to show.
 */
export function formatDateRange(
  start: string,
  end: string,
  current: boolean,
): string {
  const startLabel = formatMonth(start);
  const endLabel = current ? "Present" : formatMonth(end);
  if (!startLabel && !endLabel) return "";
  if (!startLabel) return endLabel;
  if (!endLabel) return startLabel;
  return `${startLabel} – ${endLabel}`;
}

/** Split a multiline textarea value into trimmed, non-empty lines. */
export function toLines(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

/** Generate a short unique id for list rows. */
export function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}
