const socials = [
  { label: "GitHub", href: "https://github.com/yourhandle" },
  { label: "LinkedIn", href: "https://linkedin.com/in/yourhandle" },
  { label: "Telegram", href: "https://t.me/yourhandle" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line/70">
      <div className="container-main flex flex-col items-center justify-between gap-3 py-6 text-sm text-muted sm:flex-row">
        <p>© {year} WebCode</p>
        <ul className="flex items-center gap-4">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="focus-ring rounded-md px-1 transition hover:text-text"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
