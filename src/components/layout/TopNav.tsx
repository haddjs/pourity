import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "CV Builder", end: true },
  { to: "/cover-letter", label: "Cover Letter" },
  { to: "/motivation-letter", label: "Motivation Letter" },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "rounded-md px-3 py-1.5 font-body text-sm font-medium transition-colors",
    isActive ? "bg-white/10 text-white" : "text-white/60 hover:text-white",
  ].join(" ");

/** Fixed 56px top navigation bar on the Midnight ground. Collapses to a
 * dropdown menu below the `md` breakpoint. */
export function TopNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-30 flex h-[var(--spacing-nav)] shrink-0 items-center gap-6 bg-midnight px-4 text-white sm:px-6">
      <NavLink
        to="/"
        className="flex items-baseline gap-1.5"
        onClick={() => setOpen(false)}
      >
        <span className="font-display text-lg font-extrabold tracking-tight text-white">
          Pourity
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-ember" aria-hidden />
      </NavLink>

      {/* Desktop nav */}
      <nav className="hidden items-center gap-1 md:flex">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={linkClass}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Mobile menu toggle */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white md:hidden"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          {open ? (
            <path
              d="M5 5l10 10M15 5L5 15"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M3 6h14M3 10h14M3 14h14"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      {/* Mobile dropdown */}
      {open && (
        <nav className="absolute inset-x-0 top-full flex flex-col gap-1 border-t border-white/10 bg-midnight p-3 shadow-lg md:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setOpen(false)}
              className={linkClass}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
