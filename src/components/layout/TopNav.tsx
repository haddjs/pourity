import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "CV Builder", end: true },
  { to: "/cover-letter", label: "Cover Letter" },
  { to: "/motivation-letter", label: "Motivation Letter" },
];

/** Fixed 56px top navigation bar on the Midnight ground. */
export function TopNav() {
  return (
    <header className="flex h-[var(--spacing-nav)] shrink-0 items-center gap-8 bg-midnight px-6 text-white">
      <NavLink to="/" className="flex items-baseline gap-1.5">
        <span className="font-display text-lg font-extrabold tracking-tight text-white">
          Pourity
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-ember" aria-hidden />
      </NavLink>

      <nav className="flex items-center gap-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              [
                "rounded-md px-3 py-1.5 font-body text-sm font-medium transition-colors",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:text-white",
              ].join(" ")
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
