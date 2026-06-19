import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaPhone } from "react-icons/fa6";
import { menuCategories } from "@/lib/menu-data";

export const metadata: Metadata = {
  title: "Menu",
  description: "Explore Tomy's Kitchen breakfast, tacos, mains, seafood cocktails, and drinks in Mountain View.",
};

const images = ["/images/tomys-quesabirria.png", "/images/tomys-tacos.png", "/images/tomys-hero.png"];

export default function MenuPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[var(--kitchen-night)] px-5 pb-14 pt-28 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-20">
          <Image src="/images/tomys-quesabirria.png" alt="Quesabirria combo from Tomy's Kitchen" fill priority sizes="100vw" className="object-cover opacity-38" />
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,#11100f_0%,rgba(17,16,15,.96)_44%,rgba(17,16,15,.52)_100%)]" />
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">Menu built for quick pickup</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[0.94] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Pick fast. Call ahead. Eat well.
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/76">
              Breakfast, tacos, seafood cocktails, mains, and drinks from Tomy&apos;s Kitchen on El Camino Real.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="tel:+16502898628" className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-primary px-7 text-base font-black text-white transition hover:bg-primary-hover">
                Call order <FaPhone aria-hidden />
              </a>
              <Link href="/location" className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full border border-white/24 px-7 text-base font-black text-white transition hover:bg-white/10">
                Directions <FaArrowRight aria-hidden />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {images.map((src, index) => (
              <div key={src} className={`overflow-hidden rounded-3xl border border-white/12 bg-white/8 p-2 ${index === 1 ? "mt-10" : ""}`}>
                <Image src={src} alt="Tomy's Kitchen menu item" width={520} height={700} sizes="(min-width: 1024px) 16vw, 33vw" className="h-80 w-full rounded-2xl object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sticky top-[72px] z-30 border-y border-border bg-background/92 px-5 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
        <nav aria-label="Menu categories" className="mx-auto flex max-w-6xl gap-2 overflow-x-auto [scrollbar-width:none]">
          {menuCategories.map((category) => (
            <a key={category.name} href={`#${category.name.toLowerCase().replaceAll(" ", "-")}`} className="shrink-0 rounded-full border border-border bg-surface px-5 py-3 text-sm font-black text-muted transition hover:border-primary hover:text-white">
              {category.name}
            </a>
          ))}
        </nav>
      </section>

      <section className="px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8">
          {menuCategories.map((category, categoryIndex) => (
            <section key={category.name} id={category.name.toLowerCase().replaceAll(" ", "-")} className="scroll-mt-36 overflow-hidden rounded-[2rem] border border-border bg-surface shadow-[0_24px_80px_rgba(0,0,0,.24)]">
              <div className="grid lg:grid-cols-[360px_1fr]">
                <div className="relative min-h-72">
                  <Image src={images[categoryIndex % images.length]} alt={`${category.name} at Tomy's Kitchen`} fill sizes="(min-width: 1024px) 360px, 100vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/68 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Tomy&apos;s Kitchen</p>
                    <h2 className="mt-2 text-4xl font-black leading-none text-white">{category.name}</h2>
                  </div>
                </div>
                <div className="p-5 sm:p-7">
                  <div className="grid gap-0">
                    {category.items.map((item) => (
                      <article key={item.name} className="grid gap-3 border-b border-border py-5 last:border-b-0 sm:grid-cols-[1fr_auto] sm:gap-6">
                        <div>
                          <h3 className="text-xl font-black text-secondary">{item.name}</h3>
                          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-muted">{item.description}</p>
                        </div>
                        <p className="text-xl font-black text-primary sm:text-right">{item.price}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-5 rounded-[2rem] border border-primary/30 bg-primary/12 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <h2 className="text-3xl font-black text-secondary">Ordering for a crew?</h2>
            <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-muted">Call ahead so the truck can time larger breakfast, taco, or lunch pickups without slowing the window.</p>
          </div>
          <a href="tel:+16502898628" className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-black text-white transition hover:bg-primary-hover">Call (650) 289-8628</a>
        </div>
      </section>
    </>
  );
}
