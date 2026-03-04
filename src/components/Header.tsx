import { Moon, Sun } from "lucide-react";

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const links = [
  { label: "Works", href: "#works" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Header({ isDark, onToggleTheme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-surface/80 backdrop-blur-xl">
      <div className="container-main flex h-16 items-center justify-between gap-3">
        <a href="#home" className="focus-ring rounded-md px-1 text-lg text-text">
          WebCode
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted shadow-soft sm:inline-flex">
            Available for opportunities
          </span>

          <nav aria-label="Primary">
            <ul className="flex items-center gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="focus-ring rounded-md px-3 py-2 text-sm text-muted transition hover:text-text"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            onClick={onToggleTheme}
            className="focus-ring rounded-full border border-line p-2 text-muted transition hover:text-text"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}
