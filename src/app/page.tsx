import Image from "next/image";
import Link from "next/link";
import { FaClock, FaLocationDot, FaPhone, FaStar } from "react-icons/fa6";
import InfoCard from "@/components/InfoCard";
import SectionHeading from "@/components/SectionHeading";
import { featuredItems } from "@/lib/menu-data";

const featureImages = [
  "/images/tomys-quesabirria.png",
  "/images/tomys-tacos.png",
  "/images/tomys-quesabirria.png",
  "/images/tomys-tacos.png",
];

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[var(--charcoal)] px-5 pb-16 pt-28 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(228,95,60,0.34),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(242,184,75,0.18),transparent_24%),linear-gradient(135deg,#11100f_0%,#1b1917_52%,#0c0b0a_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-background to-transparent" />

        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="max-w-3xl py-10">
            <p className="mb-5 inline-flex max-w-full rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-accent ring-1 ring-white/16">
              5.0 Yelp rating • Mountain View
            </p>
            <h1 className="max-w-4xl text-5xl font-extrabold leading-[0.95] tracking-normal sm:text-6xl lg:text-8xl">
              Charcoal-fired energy for Mexican street food.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82 sm:text-xl">
              Fresh breakfast, tacos, seafood, and daily plates from Chef Tomas Tejeda on El Camino Real.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/menu"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 text-base font-bold text-white shadow-lg shadow-primary/25 transition hover:bg-primary-hover"
              >
                View Our Menu
              </Link>
              <Link
                href="/location"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/28 px-7 text-base font-bold text-white transition hover:bg-white/10"
              >
                Find the Truck
              </Link>
            </div>
            <div className="mt-8 grid gap-3 text-sm text-white/72 sm:grid-cols-3">
              <span className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3">Open Mon-Sat</span>
              <span className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3">8:30 AM-3:00 PM</span>
              <span className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3">Call ahead pickup</span>
            </div>
          </div>

          <div className="relative min-h-[420px] sm:min-h-[560px] lg:min-h-[660px]">
            <div className="absolute inset-x-0 top-4 overflow-hidden rounded-[2rem] border border-white/12 shadow-[0_42px_90px_-44px_rgba(0,0,0,0.9)] sm:inset-x-8 lg:inset-x-12">
              <Image
                src="/images/tomys-hero.png"
                alt="Mexican food truck counter with tacos and warm kitchen light"
                width={1536}
                height={1024}
                priority
                sizes="(min-width: 1024px) 54vw, 100vw"
                className="h-[360px] w-full object-cover sm:h-[520px] lg:h-[610px]"
              />
            </div>
            <div className="absolute bottom-2 left-0 w-[52%] min-w-[180px] overflow-hidden rounded-2xl border border-white/14 bg-surface shadow-2xl sm:bottom-8">
              <Image
                src="/images/tomys-tacos.png"
                alt="Fish, shrimp, and carne asada tacos with salsa and lime"
                width={1536}
                height={1024}
                sizes="(min-width: 1024px) 22vw, 52vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute right-0 top-2 rounded-2xl bg-primary px-4 py-3 text-sm font-extrabold text-white shadow-xl sm:right-2 sm:top-16">
              Made fresh daily
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="House Favorites"
            title="Food truck classics with serious craft"
            subtitle="A small, focused menu of breakfast staples, tacos, seafood, and hearty plates prepared fresh for the day."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredItems.map((item, index) => (
              <InfoCard key={item.name} title={item.name} delay={index * 0.08}>
                <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={featureImages[index]}
                    alt={item.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                </div>
                <div>
                  <span className="mb-3 inline-flex rounded-full bg-accent/16 px-3 py-1 text-sm font-extrabold text-secondary">
                    {item.price}
                  </span>
                  <p>{item.description}</p>
                </div>
              </InfoCard>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface px-5 py-10 shadow-[0_-1px_0_var(--border),0_1px_0_var(--border)] sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          <div className="flex gap-4">
            <FaLocationDot className="mt-1 text-2xl text-primary" aria-hidden />
            <div>
              <h2 className="font-bold text-secondary">Address</h2>
              <p className="mt-1 text-sm text-muted">239 W El Camino Real, Mountain View, CA 94040</p>
            </div>
          </div>
          <div className="flex gap-4">
            <FaClock className="mt-1 text-2xl text-primary" aria-hidden />
            <div>
              <h2 className="font-bold text-secondary">Hours</h2>
              <p className="mt-1 text-sm text-muted">Monday-Saturday, 8:30 AM-3:00 PM</p>
            </div>
          </div>
          <div className="flex gap-4">
            <FaPhone className="mt-1 text-2xl text-primary" aria-hidden />
            <div>
              <h2 className="font-bold text-secondary">Call Ahead</h2>
              <a className="mt-1 block text-sm text-muted hover:text-primary" href="tel:+16502898628">
                (650) 289-8628
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-2xl border border-border bg-surface shadow-xl shadow-black/20 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="p-8 md:p-10 lg:p-12">
          <div>
            <div className="mb-4 flex text-accent" aria-label="5 star Yelp rating">
              {Array.from({ length: 5 }).map((_, index) => (
                <FaStar key={index} aria-hidden />
              ))}
            </div>
            <h2 className="text-3xl font-extrabold tracking-normal sm:text-4xl">Come find us on El Camino Real</h2>
            <p className="mt-3 max-w-2xl text-white/82">
              Breakfast before work, tacos at lunch, or seafood when the craving hits. The truck is open six days a week.
            </p>
          </div>
          <Link
            href="/location"
            className="mt-8 inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-primary px-7 text-base font-bold text-white transition hover:bg-primary-hover"
          >
            Location & Hours
          </Link>
          </div>
          <Image
            src="/images/tomys-quesabirria.png"
            alt="Quesabirria combo with consomme, rice, beans, and seafood tostada"
            width={1536}
            height={1024}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-72 w-full object-cover lg:h-full"
          />
        </div>
      </section>
    </>
  );
}
