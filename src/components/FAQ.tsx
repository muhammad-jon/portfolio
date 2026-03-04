import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqTabs, type FaqTabId } from "../data/faq";
import { cn } from "../utils/cn";

const defaultTab = faqTabs[0];

export function FAQ() {
  const [activeTab, setActiveTab] = useState<FaqTabId>(defaultTab.id);
  const [openItem, setOpenItem] = useState<string | null>(
    defaultTab.items[0] ? `${defaultTab.id}-${defaultTab.items[0].id}` : null,
  );

  const currentTab = useMemo(
    () => faqTabs.find((tab) => tab.id === activeTab) ?? defaultTab,
    [activeTab],
  );

  useEffect(() => {
    const first = currentTab.items[0];
    setOpenItem(first ? `${currentTab.id}-${first.id}` : null);
  }, [currentTab]);

  return (
    <section id="faq" className="container-main scroll-mt-24 pb-16 md:pb-24">
      <h2 className="text-3xl md:text-4xl">Things I get asked a lot</h2>

      <div
        className="panel mt-6 inline-flex rounded-full p-1"
        role="tablist"
        aria-label="FAQ categories"
      >
        {faqTabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "focus-ring rounded-full px-4 py-2 text-sm transition",
                isActive ? "bg-text text-page" : "text-muted hover:text-text",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id={`panel-${currentTab.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${currentTab.id}`}
        className="mt-6 space-y-3"
      >
        {currentTab.items.map((item) => {
          const itemKey = `${currentTab.id}-${item.id}`;
          const panelId = `${itemKey}-panel`;
          const triggerId = `${itemKey}-trigger`;
          const isOpen = openItem === itemKey;

          return (
            <article key={item.id} className="panel overflow-hidden">
              <h3>
                <button
                  id={triggerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenItem(isOpen ? null : itemKey)}
                  className="focus-ring flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                >
                  <span className="text-base">{item.question}</span>
                  <ChevronDown
                    size={18}
                    className={cn("shrink-0 transition-transform", isOpen && "rotate-180")}
                  />
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    <p className="border-t border-line px-5 py-4 text-sm leading-relaxed text-muted">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          );
        })}
      </div>
    </section>
  );
}
