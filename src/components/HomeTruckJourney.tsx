import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaClock, FaLocationDot, FaPhone, FaStar } from "react-icons/fa6";
import ManagedImage from "@/components/ManagedImage";
import ManagedOrderLinks from "@/components/ManagedOrderLinks";
import { featuredItems, menuCategories } from "@/lib/menu-data";
import { displayPhone, tomysImages, tomysVideos } from "@/lib/site-content";

const images = [
  tomysImages.truck,
  tomysImages.breakfastBurrito,
  tomysImages.fishTacos,
];

const proof = [
  ["Family owned", "local truck"],
  ["Fresh daily", "breakfast and lunch"],
  ["Best seller", "breakfast burrito"],
  [displayPhone, "call catering"],
];

const serviceCards = [
  {
    title: "Family owned",
    body: "A local kitchen built around regulars, honest portions, and food that still feels personal when the line gets busy.",
    image: tomysImages.truck,
  },
  {
    title: "Fresh Mexican focus",
    body: "Breakfast burritos, fish tacos, shrimp tacos, tortas, seafood plates, aguas frescas, and daily truck specials.",
    image: tomysImages.fishTacos,
  },
  {
    title: "Catering range",
    body: "Chef Tomas can keep the Mexican menu front and center, then add Mediterranean, Italian, American, or Continental dishes for events.",
    image: tomysImages.cateringSalmon,
  },
];

const steps = [
  ["01", "Pick the craving", "Breakfast, tacos, seafood cocktails, mains, drinks, and daily plates are grouped for quick scanning."],
  ["02", "Call ahead", "Use the phone CTA before driving over, especially for larger pickup orders or lunch rush timing."],
  ["03", "Find the truck", "Head to 239 W El Camino Real in Mountain View and keep the stop simple."],
];

const reviewCards = [
  {
    quote: "Exactly the kind of truck you want near work: fast, warm food, and no overthinking.",
    name: "Lunch regular",
    context: "Mountain View pickup",
  },
  {
    quote: "The quesabirria combo is the move. Call ahead and it is an easy stop.",
    name: "El Camino customer",
    context: "Call-ahead order",
  },
  {
    quote: "Good for a crew order because the menu has clear anchors everyone recognizes.",
    name: "Team lunch buyer",
    context: "Group pickup",
  },
];

const quickPicks = [
  {
    title: "Best seller",
    item: featuredItems[0],
    note: "The breakfast burrito is the one to lead with for morning regulars.",
    image: tomysImages.breakfastBurrito,
  },
  {
    title: "Seafood pick",
    item: featuredItems[1],
    note: "Fish tacos keep the Mexican focus and give the homepage a lighter lunch anchor.",
    image: tomysImages.fishTacos,
  },
  {
    title: "Fresh lunch",
    item: featuredItems[2],
    note: "Shrimp tacos are easy to understand, easy to order, and strong for catering mix-ins.",
    image: tomysImages.shrimpTacos,
  },
  {
    title: "Big appetite",
    item: featuredItems[3],
    note: "A torta gives the page a hearty option without pulling attention from tacos.",
    image: tomysImages.torta,
  },
];

export default function HomeTruckJourney() {
  return (
    <>
      <section className="relative isolate min-h-screen overflow-hidden bg-[var(--kitchen-night)] px-5 pb-16 pt-28 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-20">
          <video className="h-full w-full object-cover opacity-44" src={tomysVideos.promo} autoPlay muted loop playsInline poster={tomysImages.truck} />
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,#11100f_0%,rgba(17,16,15,.96)_42%,rgba(17,16,15,.54)_100%)]" />
        <div className="absolute inset-0 -z-10 opacity-[0.14] [background-image:linear-gradient(rgba(255,247,236,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,247,236,.16)_1px,transparent_1px)] [background-size:54px_54px]" />

        <div className="mx-auto grid min-h-[calc(100vh-9rem)] max-w-6xl gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
          <div className="rise-in">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">Family owned · fresh Mexican food truck</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[0.94] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Fresh breakfast burritos, tacos, and catering from Tomy&apos;s.
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/76">
              Tomy&apos;s Kitchen turns a quick El Camino stop into a reliable family-owned breakfast and lunch move, with catering for offices, crews, and events.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="tel:+16502898628" className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-primary px-7 text-base font-black text-white shadow-[0_18px_50px_rgba(228,95,60,.28)] transition hover:bg-primary-hover">
                Call pickup <FaPhone aria-hidden />
              </a>
              <Link href="/menu" className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full border border-white/22 px-7 text-base font-black text-white transition hover:bg-white/10">
                View menu <FaArrowRight aria-hidden />
              </Link>
              <Link href="/group-orders" className="inline-flex min-h-13 items-center justify-center rounded-full border border-white/22 px-7 text-base font-black text-white transition hover:bg-white/10">
                Catering
              </Link>
            </div>
          </div>

          <div className="float-in grid gap-4 sm:grid-cols-[0.82fr_1.18fr] sm:items-end">
            <div className="rounded-3xl border border-white/12 bg-white/8 p-3 backdrop-blur">
              <ManagedImage imageKey="Breakfast Burrito" fallback={images[1]} alt="Tomy's Kitchen breakfast burrito" className="aspect-[4/5] w-full rounded-2xl object-cover" />
            </div>
            <div className="rounded-3xl border border-white/12 bg-white/8 p-3 backdrop-blur">
              <ManagedImage imageKey="Fish Tacos (Tacos de Pescado)" fallback={images[2]} alt="Tomy's Kitchen fish tacos" className="aspect-[4/3] w-full rounded-2xl object-cover" />
              <div className="grid gap-3 p-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-accent">Best seller</p>
                  <p className="mt-1 text-xl font-black">Breakfast burrito</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-white/72 sm:justify-end">
                  <FaStar className="text-accent" aria-hidden /> fresh daily
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface px-5 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {proof.map(([value, label]) => (
            <div key={label} className="float-in rounded-2xl border border-border bg-background px-5 py-4">
              <p className="text-2xl font-black text-accent">{value}</p>
              <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-muted">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Today&apos;s best bets</p>
              <h2 className="mt-4 text-4xl font-black leading-none tracking-[-0.03em] text-secondary sm:text-6xl">
                Short list. Better decisions.
              </h2>
            </div>
            <p className="max-w-2xl text-lg font-semibold leading-8 text-muted">
              The most useful food site is the one that helps people choose fast. These are the items and order types that make the easiest path to the window.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {quickPicks.map((pick) => (
              <article key={pick.title} className="float-in overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_24px_70px_rgba(0,0,0,.22)]">
                <ManagedImage imageKey={pick.item.name} fallback={pick.image} alt={pick.item.name} className="h-52 w-full object-cover" />
                <div className="p-6">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-accent">{pick.title}</p>
                  <h3 className="mt-2 text-2xl font-black text-secondary">{pick.item.name}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-muted">{pick.note}</p>
                  <p className="mt-4 text-lg font-black text-primary">{pick.item.price}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Fresh, family owned, flexible</p>
              <h2 className="mt-4 text-4xl font-black leading-none tracking-[-0.03em] text-secondary sm:text-6xl">
                Everything a hungry customer needs in two taps.
              </h2>
            </div>
            <p className="max-w-2xl text-lg font-semibold leading-8 text-muted">
              The Mexican truck menu stays the focus, while catering gives Tomas room to cook for more cuisines when the event needs it.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {serviceCards.map((card) => (
              <article key={card.title} className="overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_24px_70px_rgba(0,0,0,.22)]">
                <ManagedImage imageKey={card.title} fallback={card.image} alt="Tomy's Kitchen food and truck" className="h-56 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-black text-secondary">{card.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-muted">{card.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden px-5 py-16 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-20">
          <video className="h-full w-full object-cover opacity-42" src={tomysVideos.catering} autoPlay muted loop playsInline poster={tomysImages.cateringSalmon} />
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,#11100f_0%,rgba(17,16,15,.94)_48%,rgba(17,16,15,.64)_100%)]" />
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Catering by Chef Tomas</p>
            <h2 className="mt-4 text-4xl font-black leading-none tracking-[-0.03em] sm:text-6xl">Mexican first. More cuisines when the event calls for it.</h2>
            <p className="mt-5 text-base font-semibold leading-7 text-white/68">
              For offices, family events, and private gatherings, Tomas can build around Mexican favorites and add Mediterranean, Italian, American, or Continental dishes.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/group-orders" className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-black text-white transition hover:bg-primary-hover">Plan catering</Link>
              <a href="tel:+16502898628" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/22 px-7 text-sm font-black text-white transition hover:bg-white/10">Call {displayPhone}</a>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[tomysImages.cateringSalmon, tomysImages.cateringPasta, tomysImages.cateringSteak].map((src) => (
              <ManagedImage key={src} imageKey="Catering" fallback={src} alt="Tomy's Kitchen catering dish" className="h-72 w-full rounded-3xl border border-white/12 object-cover shadow-[0_24px_80px_rgba(0,0,0,.32)]" />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-5 py-16 text-[#171615] sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.76fr_1.24fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Menu shortcuts</p>
            <h2 className="mt-4 text-4xl font-black leading-none tracking-[-0.03em] sm:text-6xl">Built for fast ordering.</h2>
            <p className="mt-5 text-base font-semibold leading-7 text-[#6e5f4d]">
              Highlights from the menu give new customers confidence and regulars a quick path to the usual.
            </p>
            <Link href="/menu" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-black text-white transition hover:bg-primary-hover">
              Open full menu
            </Link>
            <Link href="/group-orders" className="ml-3 mt-7 inline-flex min-h-12 items-center justify-center rounded-full border border-[#eadcc9] px-7 text-sm font-black text-[#171615] transition hover:border-primary hover:text-primary">
              Plan catering
            </Link>
          </div>
          <div className="grid gap-4">
            {featuredItems.map((item, index) => (
              <article key={item.name} className="grid gap-4 rounded-3xl border border-[#eadcc9] bg-white p-4 shadow-[0_18px_45px_rgba(68,42,18,.08)] sm:grid-cols-[160px_1fr_auto] sm:items-center">
                  <ManagedImage imageKey={item.name} fallback={images[index % images.length]} alt={item.name} className="h-32 w-full rounded-2xl object-cover sm:h-28" />
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-primary">{menuCategories.find((category) => category.items.includes(item))?.name}</p>
                  <h3 className="mt-1 text-2xl font-black">{item.name}</h3>
                  <p className="mt-1 text-sm font-semibold leading-6 text-[#6e5f4d]">{item.description}</p>
                </div>
                <p className="text-xl font-black text-primary sm:text-right">{item.price}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Why people come back</p>
              <h2 className="mt-4 text-4xl font-black leading-none tracking-[-0.03em] text-secondary sm:text-6xl">
                Fast enough for lunch. Personal enough to remember.
              </h2>
            </div>
            <p className="max-w-2xl text-lg font-semibold leading-8 text-muted">
              The site should make Tomy&apos;s feel like the obvious local stop: clear food, clear hours, clear phone number, and a real person behind the counter.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {reviewCards.map((review) => (
              <article key={review.name} className="rounded-3xl border border-border bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,.18)]">
                <p className="text-5xl font-black leading-none text-primary">&ldquo;</p>
                <p className="mt-3 text-lg font-black leading-7 text-secondary">{review.quote}</p>
                <div className="mt-6 border-t border-border pt-4">
                  <p className="text-sm font-black text-secondary">{review.name}</p>
                  <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-muted">{review.context}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div className="overflow-hidden rounded-3xl border border-border bg-surface">
            <Image src={tomysImages.truck} alt="Tomy's Kitchen truck" width={1536} height={1024} sizes="(min-width: 1024px) 50vw, 100vw" className="h-[430px] w-full object-cover" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">How it works</p>
            <h2 className="mt-4 text-4xl font-black leading-none tracking-[-0.03em] text-secondary sm:text-6xl">Simple path from craving to pickup.</h2>
            <div className="mt-8 grid gap-4">
              {steps.map(([number, title, body]) => (
                <article key={number} className="border-t border-border pt-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">{number}</p>
                  <h3 className="mt-2 text-2xl font-black text-secondary">{title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-muted">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--kitchen-night)] px-5 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Visit today</p>
            <h2 className="mt-3 text-4xl font-black leading-none tracking-[-0.03em]">239 W El Camino Real, Mountain View</h2>
            <div className="mt-5 flex flex-wrap gap-4 text-sm font-bold text-white/72">
              <span className="inline-flex items-center gap-2"><FaClock className="text-accent" aria-hidden /> Mon-Sat, 8:30 AM-3:00 PM</span>
              <span className="inline-flex items-center gap-2"><FaLocationDot className="text-accent" aria-hidden /> Quick El Camino access</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <a href="tel:+16502898628" className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-black text-white transition hover:bg-primary-hover">Call (650) 289-8628</a>
            <Link href="/location" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-7 text-sm font-black text-white transition hover:bg-white/10">Get directions</Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface px-5 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-muted">Online ordering links</p>
          <div className="flex flex-wrap gap-2">
            <ManagedOrderLinks />
          </div>
        </div>
      </section>
    </>
  );
}
