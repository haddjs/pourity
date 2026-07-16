import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/** One atomic, un-splittable unit of CV content (a heading or an entry). */
export interface DocBlock {
  key: string;
  /** Space above this block when it is NOT the first block on a page. */
  gapBefore: number;
  /** Section headings, so we can avoid orphaning them at a page bottom. */
  isHeader?: boolean;
  node: ReactNode;
}

interface Placed {
  index: number;
  marginTop: number;
}

// A4 at 96dpi, with a uniform page margin re-used as sheet padding.
const A4_W = 794; // 210mm
const A4_H = 1123; // 297mm
const PAD = 48;
const CONTENT_W = A4_W - PAD * 2;
const CONTENT_H = A4_H - PAD * 2;

/** Greedily pack measured blocks into A4-height pages. */
function paginate(blocks: DocBlock[], heights: number[]): Placed[][] {
  const pages: Placed[][] = [];
  let current: Placed[] = [];
  let y = 0;

  const flush = () => {
    if (current.length) pages.push(current);
    current = [];
    y = 0;
  };

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    const h = heights[i] || 0;
    let first = current.length === 0;

    // Don't leave a section heading stranded at the bottom of a page.
    if (b.isHeader && !first) {
      const nextH = heights[i + 1] || 0;
      const nextGap = blocks[i + 1]?.gapBefore ?? 0;
      if (y + b.gapBefore + h + nextGap + Math.min(nextH, 28) > CONTENT_H) {
        flush();
        first = true;
      }
    }

    const gap = first ? 0 : b.gapBefore;
    if (!first && y + gap + h > CONTENT_H) {
      flush();
      current.push({ index: i, marginTop: 0 });
      y = h;
    } else {
      current.push({ index: i, marginTop: gap });
      y += gap + h;
    }
  }
  flush();
  return pages.length ? pages : [[]];
}

/**
 * Renders CV blocks onto one or more A4 sheets. Blocks are measured off-screen
 * at their true width, packed into page-height columns, and the sheets scale
 * down to fit narrow viewports. Print flattens the sheets into a continuous
 * flow with page breaks (see the `@media print` rules in index.css).
 */
export function PaginatedDocument({ blocks }: { blocks: DocBlock[] }) {
  const measureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [pages, setPages] = useState<Placed[][]>([]);

  useLayoutEffect(() => {
    const heights = blocks.map(
      (_, i) => measureRefs.current[i]?.getBoundingClientRect().height ?? 0,
    );
    setPages(paginate(blocks, heights));
  }, [blocks]);

  // Scale the fixed-width sheets down when the column is narrower than A4.
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [frame, setFrame] = useState<{ width: number; height: number }>();

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    const measure = () => {
      const s = Math.min(1, outer.clientWidth / A4_W);
      setScale(s);
      setFrame({ width: A4_W * s, height: inner.offsetHeight * s });
    };
    const ro = new ResizeObserver(measure);
    ro.observe(outer);
    ro.observe(inner);
    measure();
    return () => ro.disconnect();
  }, []);

  const innerStyle: CSSProperties & Record<string, string | number> = {
    width: A4_W,
    "--cv-scale": scale,
  };

  return (
    <div ref={outerRef} className="cv-scale-outer w-full">
      <div
        className="cv-scale-frame mx-auto overflow-hidden"
        style={{ width: frame?.width, height: frame?.height }}
      >
        <div
          ref={innerRef}
          className="cv-scale-inner cv-document flex flex-col items-center gap-6"
          style={innerStyle}
        >
          {pages.map((page, pi) => (
            <div
              key={pi}
              className="cv-paper"
              style={{ width: A4_W, minHeight: A4_H, padding: PAD }}
            >
              {page.map(({ index, marginTop }) => (
                <div key={blocks[index].key} style={{ marginTop }}>
                  {blocks[index].node}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Hidden, unscaled measurer — one wrapper per block. */}
      <div
        className="cv-document cv-measure"
        aria-hidden
        style={{
          position: "absolute",
          left: -99999,
          top: 0,
          width: CONTENT_W,
          visibility: "hidden",
        }}
      >
        {blocks.map((b, i) => (
          <div
            key={b.key}
            ref={(el) => {
              measureRefs.current[i] = el;
            }}
          >
            {b.node}
          </div>
        ))}
      </div>
    </div>
  );
}
