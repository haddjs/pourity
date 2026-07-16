# Pourity

**Pourity is an ATS-friendly CV builder.** You fill in a structured form and watch a clean, single-column résumé render live beside it — then export it to PDF as selectable text that applicant-tracking systems can actually parse. Cover Letter and Motivation Letter makers are on the roadmap, drawing from the same profile.

The interface follows a Swiss-influenced design system: a strict grid, deliberate neutrals (Parchment canvas, Midnight text), and a single expressive accent (Ember) reserved for calls to action.

## Why ATS-friendly?

Most résumés are read by software before a human ever sees them. Pourity's preview is built to survive that first pass:

- **Single-column layout** — multi-column designs confuse many parsers.
- **Standard section headings** — Work Experience, Education, Skills, etc.
- **Contact details in the body** — never trapped in a page header or footer.
- **`•` bullet points** and **`Mon YYYY` dates** — unambiguous to parse.
- **Standard fonts** (Arial / Calibri) in the document itself, so nothing renders as symbols.

When you rename a heading to something a parser might not recognise, the editor shows a subtle hint rather than blocking you.

## Features

- **Two-panel builder** — a fixed 400px form and a fluid, live-updating preview that scroll independently.
- **Editable, reorderable sections** — rename any heading, move sections up/down, delete them, or add new ones (Work Experience, Education, Skills, or free Text for a Summary/Profile/Objective).
- **Structured inputs** — roles with month-picker dates, a "current" toggle, and one-achievement-per-line bullets; education entries; and skills grouped into editable categories.
- **Autosave** — everything persists to `localStorage`, with schema migration so upgrades don't wipe your data.
- **Export to PDF** — one click prints just the document, with the browser's default header/footer suppressed.
- **Responsive** — a hamburger nav and an Edit/Preview toggle bring the whole builder to mobile.

## Tech stack

- **React 19** (with the React Compiler) + **TypeScript**
- **Vite 8** for dev/build tooling
- **Tailwind CSS v4** — design tokens defined in CSS (`@theme`) from the Pourity palette and type scale
- **React Router** for navigation between the CV and letter makers

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
```

Other scripts:

```bash
npm run build    # type-check (tsc -b) and build for production
npm run preview  # preview the production build
npm run lint     # run ESLint
```

## Project structure

```
src/
├── components/
│   ├── layout/        # AppShell, TopNav (app chrome)
│   └── ui/            # Button, Field, TagInput, Badge — design-system primitives
├── data/
│   ├── defaultCv.ts   # seed content + legacy localStorage migration
│   └── sections.ts    # section factory, kinds, ATS heading hints
├── features/
│   ├── cv/            # the CV builder
│   │   ├── CvBuilder.tsx     # two-panel layout, autosave, PDF export
│   │   ├── CvForm.tsx        # maps over sections → editors
│   │   ├── CvPreview.tsx     # ATS-friendly document rendering
│   │   ├── SectionShell.tsx  # editable heading + reorder/delete controls
│   │   ├── editors/          # per-kind editors (experience, education, skills, text)
│   │   └── sections/         # fixed Personal Info section
│   └── letters/       # Cover / Motivation letter makers (coming next)
├── lib/               # formatting helpers, useLocalStorage hook
├── types.ts           # CV data model
└── index.css          # Tailwind + design tokens + print styles
```

## Roadmap

- Cover Letter maker (manual template, populated from CV data)
- Motivation Letter maker
