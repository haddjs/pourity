import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { defaultCv } from "../../data/defaultCv";
import { useLocalStorage } from "../../lib/useLocalStorage";
import type { CvData } from "../../types";
import { CvForm } from "./CvForm";
import { CvPreview } from "./CvPreview";

// Bumped to v2 when skills changed from a flat list to editable categories.
const STORAGE_KEY = "pourity.cv.v2";

export function CvBuilder() {
  const [cv, setCv] = useLocalStorage<CvData>(STORAGE_KEY, defaultCv);

  const reset = () => {
    if (confirm("Reset the CV to the sample content? This cannot be undone.")) {
      setCv(defaultCv);
    }
  };

  return (
    <div className="flex h-full">
      {/* Form panel — 400px fixed, scrolls independently */}
      <div className="scroll-panel w-[400px] shrink-0 border-r border-stone bg-parchment">
        <CvForm cv={cv} onChange={setCv} />
      </div>

      {/* Preview panel — fluid, scrolls independently */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex shrink-0 items-center justify-between border-b border-stone bg-white/60 px-6 py-2.5">
          <div className="flex items-center gap-2">
            <Badge tone="ember">● ATS Compatible</Badge>
            <span className="text-xs text-slate">
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

        <div className="scroll-panel flex-1 px-6 py-8">
          <CvPreview cv={cv} />
        </div>
      </div>
    </div>
  );
}
