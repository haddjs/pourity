import { useMemo, useState, type ReactNode } from "react";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { useLocalStorage } from "../../lib/useLocalStorage";
import { createDefaultLetter, readCvPersonal } from "./defaultLetter";
import { LetterForm } from "./LetterForm";
import { LetterPreview } from "./LetterPreview";
import type { LetterConfig, LetterData } from "./types";

export function LetterBuilder({ config }: { config: LetterConfig }) {
  const initial = useMemo(() => createDefaultLetter(config), [config]);
  const [data, setData] = useLocalStorage<LetterData>(
    config.storageKey,
    initial,
  );
  const [mobileView, setMobileView] = useState<"edit" | "preview">("edit");

  const fillFromCv = () => {
    const p = readCvPersonal();
    if (!p) {
      alert("No saved CV found yet — add your details in the CV Builder first.");
      return;
    }
    setData((d) => ({
      ...d,
      senderName: p.fullName,
      senderEmail: p.email,
      senderPhone: p.phone,
      senderLocation: p.location,
    }));
  };

  const reset = () => {
    if (confirm(`Reset this ${config.navTitle.toLowerCase()} to the template?`)) {
      setData(createDefaultLetter(config));
    }
  };

  // The browser's print-to-PDF uses document.title as the default filename.
  const exportPdf = () => {
    const name = data.senderName
      .trim()
      .replace(/[\\/:*?"<>|]+/g, "")
      .trim();
    const previousTitle = document.title;
    document.title = name
      ? `${config.filePrefix}_${name}_Pourity`
      : `${config.filePrefix}_Pourity`;

    const restore = () => {
      document.title = previousTitle;
      window.removeEventListener("afterprint", restore);
    };
    window.addEventListener("afterprint", restore);
    window.print();
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
        {/* Form panel */}
        <div
          className={`scroll-panel flex-1 bg-parchment lg:w-[400px] lg:flex-none lg:border-r lg:border-stone lg:block ${
            mobileView === "edit" ? "block" : "hidden"
          }`}
        >
          <LetterForm
            data={data}
            config={config}
            onChange={setData}
            onFillFromCv={fillFromCv}
          />
        </div>

        {/* Preview panel — cv-print-panel keeps it rendered during print. */}
        <div
          className={`cv-print-panel min-w-0 flex-1 flex-col lg:flex ${
            mobileView === "preview" ? "flex" : "hidden"
          }`}
        >
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-stone bg-white/60 px-4 py-2.5 sm:px-6">
            <Badge tone="navy">{config.badgeText}</Badge>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={reset}>
                Reset
              </Button>
              <Button variant="accent" size="sm" onClick={exportPdf}>
                Export PDF
              </Button>
            </div>
          </div>

          <div className="scroll-panel flex-1 px-3 py-5 sm:px-6 sm:py-8">
            <LetterPreview data={data} config={config} />
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
