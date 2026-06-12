import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { menuCategories } from "@/lib/menu-data";

export const metadata: Metadata = {
  title: "Menu",
  description: "Explore Tomy's Kitchen breakfast, tacos, mains, seafood cocktails, and drinks in Mountain View.",
};

export default function MenuPage() {
  return (
    <>
      <section className="bg-[var(--kitchen-night)] px-5 pb-10 pt-22 text-white sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Fresh Daily"
          title="Breakfast, tacos, seafood, and daily plates"
          subtitle="A practical food truck menu from Chef Tomas Tejeda, made for quick decisions and fresh cooking on El Camino Real."
        />
      </section>

      <section className="px-5 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[230px_minmax(0,1fr)]">
          <aside className="min-w-0 max-w-full lg:sticky lg:top-28 lg:self-start">
            <nav
              aria-label="Menu categories"
              className="flex max-w-full gap-2 overflow-x-auto rounded-lg border border-border bg-surface p-2 shadow-sm [scrollbar-width:none] lg:flex-col lg:overflow-x-visible"
            >
              {menuCategories.map((category) => (
                <a
                  key={category.name}
                  href={`#${category.name.toLowerCase().replaceAll(" ", "-")}`}
                  className="shrink-0 whitespace-nowrap rounded-md px-4 py-3 text-sm font-extrabold text-muted transition hover:bg-background hover:text-primary lg:shrink"
                >
                  {category.name}
                </a>
              ))}
            </nav>
            <div className="mt-5 hidden rounded-lg border border-border bg-surface p-5 text-sm leading-6 text-muted lg:block">
              <p className="font-extrabold text-secondary">Call ahead pickup</p>
              <a className="mt-2 block text-primary hover:text-primary-hover" href="tel:+16502898628">
                (650) 289-8628
              </a>
            </div>
          </aside>

          <div className="grid min-w-0 gap-8">
            {menuCategories.map((category) => (
              <section
                key={category.name}
                id={category.name.toLowerCase().replaceAll(" ", "-")}
                className="scroll-mt-28 overflow-hidden rounded-xl border border-border bg-surface shadow-[0_18px_48px_rgba(0,0,0,0.14)]"
              >
                <div className="border-b border-border bg-[linear-gradient(135deg,rgba(228,95,60,0.12),rgba(242,184,75,0.08))] px-5 py-4 sm:px-7">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent">
                        Tomy&apos;s Kitchen
                      </p>
                      <h2 className="mt-1 text-xl font-extrabold text-secondary sm:text-2xl">{category.name}</h2>
                    </div>
                    <span className="w-fit rounded-full bg-primary/15 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] text-primary">
                      {category.items.length} items
                    </span>
                  </div>
                </div>
                <div className="grid gap-0 px-5 py-2 sm:px-7">
                  {category.items.map((item) => (
                    <article
                      key={item.name}
                      className="grid gap-2 border-b border-border/80 py-5 last:border-b-0 sm:grid-cols-[1fr_auto] sm:gap-5"
                    >
                      <div>
                        <h3 className="text-base font-extrabold text-secondary">{item.name}</h3>
                        <p className="mt-1 max-w-3xl text-sm leading-6 text-muted">{item.description}</p>
                      </div>
                      <p className="text-base font-extrabold text-primary sm:text-right">{item.price}</p>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
