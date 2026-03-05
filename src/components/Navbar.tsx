import { motion } from "framer-motion";
import { Briefcase, Home, LayoutGrid, Mail, Moon, Sun, User } from "lucide-react";
import { useState, type FocusEvent } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "../utils/cn";
import { Tooltip } from "./Tooltip";

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const navItems = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/work", label: "Work", Icon: Briefcase },
  { to: "/projects", label: "Projects", Icon: LayoutGrid },
  { to: "/about", label: "About", Icon: User },
  { to: "/contact", label: "Contact", Icon: Mail },
] as const;

const spring = {
  type: "spring",
  stiffness: 220,
  damping: 24,
  mass: 0.7,
} as const;

export function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  const [expanded, setExpanded] = useState(false);

  const handleBlurCapture = (event: FocusEvent<HTMLElement>) => {
    const relatedTarget = event.relatedTarget;
    if (
      relatedTarget instanceof Node &&
      event.currentTarget.contains(relatedTarget)
    ) {
      return;
    }
    setExpanded(false);
  };

  return (
    <header className="pointer-events-none sticky top-4 z-50">
      <div className="container-main relative flex items-center justify-center">
        <motion.nav
          aria-label="Primary navigation"
          onHoverStart={() => setExpanded(true)}
          onHoverEnd={() => setExpanded(false)}
          onFocusCapture={() => setExpanded(true)}
          onBlurCapture={handleBlurCapture}
          className="pointer-events-auto rounded-full border border-line/80 bg-surface/75 p-2 shadow-soft backdrop-blur-xl"
        >
          <motion.ul
            animate={{
              gap: expanded ? 14 : 8,
              paddingLeft: expanded ? 14 : 8,
              paddingRight: expanded ? 14 : 8,
            }}
            transition={spring}
            className="flex items-center gap-3"
          >
            {navItems.map(({ to, label, Icon }) => (
              <li key={to}>
                <Tooltip label={label}>
                  <motion.div whileHover={{ scale: 1.15 }} transition={spring}>
                    <NavLink
                      to={to}
                      end={to === "/"}
                      aria-label={label}
                      className={({ isActive }) =>
                        cn(
                          "focus-ring inline-flex gap-1 h-10 w-10 items-center justify-center rounded-full border text-muted transition ",
                          isActive
                            ? "border-accent/50 bg-accent/12 w-16 text-text shadow-[0_0_0_1px_hsl(var(--accent)/0.24)]"
                            : "border-transparent hover:border-line hover:bg-surface/80 hover:text-text",
                        )
                      }
                    >
                      <Icon size={17} />
                    </NavLink>
                  </motion.div>
                </Tooltip>
              </li>
            ))}
          </motion.ul>
        </motion.nav>

        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className="focus-ring pointer-events-auto absolute right-4 h-10 w-10 items-center justify-center rounded-full border border-line/80 bg-surface/75 text-muted shadow-soft backdrop-blur-xl transition hover:text-text inline-flex"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
}
