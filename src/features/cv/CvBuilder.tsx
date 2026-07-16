import { useMemo, useState, type ReactNode } from "react";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { defaultCv, migrateInitialCv } from "../../data/defaultCv";
import { useLocalStorage } from "../../lib/useLocalStorage";
import type { CvData } from "../../types";
import { CvForm } from "./CvForm";
import { CvPreview } from "./CvPreview";

// v3: body sections became an ordered, editable list. Legacy v2 payloads are
// migrated in via migrateInitialCv() so users keep their data.
const STORAGE_KEY = "pourity.cv.v3";

export function CvBuilder() {
  const initial = useMemo(() => migrateInitialCv(), []);
  const [cv, setCv] = useLocalStorage<CvData>(STORAGE_KEY, initial);
  // On mobile only one panel shows at a time; desktop shows both side by side.
  const [mobileView, setMobileView] = useState<"edit" | "preview">("edit");

  const reset = () => {
    if (confirm("Reset the CV to the sample content? This cannot be undone.")) {
      setCv(defaultCv);
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Mobile Edit / Preview switch — hidden on desktop */}
      <div className="flex shrink-0 gap-1 border-b border-stone bg-parchment p-1.5 lg:hidden">
        <MobileTab
          active={mobileView === "edit"}
          onClick={() => setMobileView("edit")}
        >
          Edit
        </MobileTab>
        <MobileTab
          active={mobileView === "preview"}
          onClick={() => setMobileView("preview")}
        >
          Preview
        </MobileTab>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Form panel — full width on mobile, 400px fixed on desktop */}
        <div
          className={`scroll-panel flex-1 bg-parchment lg:w-[400px] lg:flex-none lg:border-r lg:border-stone lg:block ${
            mobileView === "edit" ? "block" : "hidden"
          }`}
        >
          <CvForm cv={cv} onChange={setCv} />
        </div>

        {/* Preview panel — fluid, scrolls independently */}
        <div
          className={`min-w-0 flex-1 flex-col lg:flex ${
            mobileView === "preview" ? "flex" : "hidden"
          }`}
        >
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-stone bg-white/60 px-4 py-2.5 sm:px-6">
            <div className="flex items-center gap-2">
              <Badge tone="ember">● ATS Compatible</Badge>
              <span className="hidden text-xs text-slate sm:inline">
                Single column · standard headings · selectable text
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={reset}>
                Reset
              </Button>
              <Button variant="accent" size="sm" onClick={() => window.print()}>
                Export PDF
              </Button>
            </div>
          </div>

          <div className="scroll-panel flex-1 px-3 py-5 sm:px-6 sm:py-8">
            <CvPreview cv={cv} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-md py-1.5 font-body text-sm font-semibold transition-colors ${
        active
          ? "bg-white text-midnight shadow-sm"
          : "text-slate hover:text-midnight"
      }`}
    >
      {children}
    </button>
  );
}
