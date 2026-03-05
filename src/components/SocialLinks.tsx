import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, Send } from "lucide-react";
import { cn } from "../utils/cn";
import { Tooltip } from "./Tooltip";

const links = [
  {
    label: "GitHub",
    href: "http://github.com/muhammad-jon/",
    Icon: Github,
  },
  {
    label: "Telegram",
    href: "https://t.me/eMuhammadjon",
    Icon: Send,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/muhammad-jon/",
    Icon: Linkedin,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/memuhammadjon",
    Icon: Instagram,
  },
] as const;

interface SocialLinksProps {
  className?: string;
}

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)} aria-label="Social links">
      {links.map(({ label, href, Icon }) => (
        <li key={label}>
          <Tooltip label={label}>
            <motion.a
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              whileHover={{ y: -2, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface/90 text-muted transition hover:border-accent/40 hover:bg-accent/5 hover:text-text"
            >
              <Icon size={16} />
            </motion.a>
          </Tooltip>
        </li>
      ))}
    </ul>
  );
}
