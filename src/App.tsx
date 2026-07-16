import { Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { CvBuilder } from "./features/cv/CvBuilder";
import { LetterBuilder } from "./features/letters/LetterBuilder";
import { COVER_CONFIG, MOTIVATION_CONFIG } from "./features/letters/config";

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<CvBuilder />} />
        <Route
          path="cover-letter"
          element={<LetterBuilder key="cover" config={COVER_CONFIG} />}
        />
        <Route
          path="motivation-letter"
          element={<LetterBuilder key="motivation" config={MOTIVATION_CONFIG} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
