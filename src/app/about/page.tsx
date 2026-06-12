import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaBowlFood, FaHeart, FaLeaf } from "react-icons/fa6";
import InfoCard from "@/components/InfoCard";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "About Chef Tomas",
  description: "Meet Chef Tomas Tejeda and the made daily Mexican cooking behind Tomy's Kitchen in Mountain View.",
};

const storyBeats = [
  {
    label: "Morning prep",
    text: "The day starts with tortillas, salsas, seafood, and proteins getting ready for a short, focused service.",
  },
  {
    label: "Lunch rush",
    text: "Orders move quickly, but the plates still carry the care of a small kitchen where regulars are remembered.",
  },
  {
    label: "Fresh for the day",
    text: "The menu stays broad enough for cravings and tight enough for Tomas to keep the cooking direct and made daily.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[var(--kitchen-night)] px-5 pb-10 pt-22 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_16%,rgba(228,95,60,0.24),transparent_28%),radial-gradient(circle_at_82%_24%,rgba(242,184,75,0.14),transparent_24%)]" />
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-accent">Our Story</p>
            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-normal sm:text-3xl">
              Tomas Tejeda cooks for the regulars who find him on El Camino Real.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
              Tomy&apos;s Kitchen is a Mountain View food truck shaped by breakfast orders, lunch lines, seafood cravings,
              and the steady hand of Chef Tomas Tejeda.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-[0.86fr_1.14fr] sm:items-end">
            <div className="overflow-hidden rounded-xl border border-white/12">
              <Image
                src="/images/tomys-tacos.png"
                alt="Tacos with salsa, lime, and fresh garnishes"
                width={1536}
                height={1024}
                sizes="(min-width: 1024px) 22vw, 100vw"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-xl border border-white/12">
              <Image
                src="/images/tomys-hero.png"
                alt="Tomy's Kitchen truck counter during service"
                width={1536}
                height={1024}
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-accent">The rhythm</p>
            <h2 className="mt-3 text-2xl font-extrabold leading-tight text-secondary sm:text-3xl">
              A working truck, a small menu, and plates with a point of view.
            </h2>
          </div>
          <div className="grid gap-5 text-base leading-8 text-muted md:grid-cols-3">
            {storyBeats.map((beat) => (
              <article key={beat.label} className="border-l border-primary/50 pl-5">
                <h3 className="text-lg font-extrabold text-secondary">{beat.label}</h3>
                <p className="mt-3">{beat.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface px-5 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <blockquote className="text-2xl font-extrabold leading-tight text-secondary sm:text-3xl">
            The food is direct: warm tortillas, bright salsa, generous plates, and enough care to make a quick stop feel
            personal.
          </blockquote>
          <p className="text-base leading-8 text-muted">
            Tomas keeps the truck practical because guests are often on a lunch break, heading to work, or picking up
            food for family. The pace is quick, but the cooking still feels close to the person making it.
          </p>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="What Guides The Cooking"
            title="Simple values you can taste"
            subtitle="Tomy's Kitchen keeps the focus on fresh prep, family-rooted flavor, and the kind of service that turns a truck into a neighborhood stop."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <InfoCard icon={<FaLeaf aria-hidden />} title="Fresh Prep">
              Produce, seafood, tortillas, and proteins are handled for the day&apos;s service so each plate lands bright
              and satisfying.
            </InfoCard>
            <InfoCard icon={<FaHeart aria-hidden />} title="Family-Rooted Flavor" delay={0.08}>
              The cooking leans on familiar Mexican comfort: balanced salsas, warm tortillas, hearty plates, and food
              that feels generous without being fussy.
            </InfoCard>
            <InfoCard icon={<FaBowlFood aria-hidden />} title="Made Daily" delay={0.16}>
              Breakfast, tacos, mains, and seafood are prepared with the discipline of a small food truck kitchen.
            </InfoCard>
          </div>
        </div>
      </section>

      <section className="px-5 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-xl border border-border bg-surface lg:grid-cols-[1fr_0.9fr]">
          <Image
            src="/images/tomys-quesabirria.png"
            alt="Quesabirria combo with rice, beans, and consomme"
            width={1536}
            height={1024}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-72 w-full object-cover lg:h-full"
          />
          <div className="p-6 md:p-8 lg:p-10">
            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-accent">Visit Tomas</p>
            <h2 className="mt-3 text-2xl font-extrabold text-secondary sm:text-3xl">
              Find the truck in Mountain View.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Stop by 239 W El Camino Real for breakfast, tacos, seafood, and daily plates from Tomy&apos;s Kitchen.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/menu"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 text-base font-extrabold text-white transition hover:bg-primary-hover"
              >
                Explore the Menu
              </Link>
              <Link
                href="/location"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-border px-7 text-base font-extrabold text-secondary transition hover:border-primary hover:text-primary"
              >
                Location & Hours
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
