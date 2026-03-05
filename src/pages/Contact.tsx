import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Linkedin, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { SocialLinks } from "../components/SocialLinks";

type FormState = {
  name: string;
  email: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  message: "",
};

export function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!sent) return;
    const timer = window.setTimeout(() => setSent(false), 2200);
    return () => window.clearTimeout(timer);
  }, [sent]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    setForm(initialForm);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="container-main pb-16 md:pb-24"
    >
      <h1 className="text-4xl md:text-5xl">Contact</h1>

      <div className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="panel p-6">
          <h2 className="text-2xl">Let's build something useful.</h2>
          <p className="mt-2 text-sm text-muted">Open to Frontend roles</p>

          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <a
                href="tel:+998903747483"
                className="focus-ring inline-flex items-center gap-2 text-muted transition hover:text-text"
              >
                <Phone size={16} />
                +99890 374 74 83
              </a>
            </li>
            <li>
              <a
                href="mailto:memuhammadjon@gmail.com"
                className="focus-ring inline-flex items-center gap-2 text-muted transition hover:text-text"
              >
                <Mail size={16} />
                memuhammadjon@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://t.me/eMuhammadjon"
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex items-center gap-2 text-muted transition hover:text-text"
              >
                <MessageCircle size={16} />
                Telegram
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/muhammad-jon/"
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex items-center gap-2 text-muted transition hover:text-text"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
            </li>
          </ul>

          <SocialLinks className="mt-6" />
        </article>

        <article className="panel p-6">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="name" className="mb-1 block text-sm text-muted">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="focus-ring w-full rounded-xl border border-line bg-surface px-3 py-2.5 text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm text-muted">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="focus-ring w-full rounded-xl border border-line bg-surface px-3 py-2.5 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-1 block text-sm text-muted"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="focus-ring w-full rounded-xl border border-line bg-surface px-3 py-2.5 text-sm"
              />
            </div>

            <button
              type="submit"
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-text px-5 py-3 text-sm font-medium text-page transition hover:opacity-90"
            >
              Send message
              <Send size={16} />
            </button>
          </form>
        </article>
      </div>

      <AnimatePresence>
        {sent && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-6 right-6 rounded-xl border border-line bg-surface px-4 py-3 text-sm shadow-soft"
          >
            Sent (demo)
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
