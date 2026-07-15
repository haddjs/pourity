import { Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { CvBuilder } from "./features/cv/CvBuilder";
import { ComingSoon } from "./features/letters/ComingSoon";

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<CvBuilder />} />
        <Route
          path="cover-letter"
          element={
            <ComingSoon
              title="Cover Letter Maker"
              description="Fill in the role, company, and a few highlights — Pourity assembles a formatted, ATS-friendly cover letter from your CV data. Landing here next."
            />
          }
        />
        <Route
          path="motivation-letter"
          element={
            <ComingSoon
              title="Motivation Letter Maker"
              description="Structured prompts guide a compelling motivation letter for applications and scholarships, drawn from the same profile. Landing here next."
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
