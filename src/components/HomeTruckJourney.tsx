"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { FaArrowDown, FaClock, FaLocationDot, FaPhone } from "react-icons/fa6";
import { featuredItems } from "@/lib/menu-data";

const featureImages = [
  "/images/tomys-quesabirria.png",
  "/images/tomys-tacos.png",
  "/images/tomys-quesabirria.png",
  "/images/tomys-tacos.png",
];

const orderStops = featuredItems.slice(0, 3);
const roadPathD =
  "M18 8 C72 26 82 48 45 70 C12 90 18 118 68 132 C105 143 82 174 38 190 C8 204 22 236 72 250 C108 262 76 300 30 314";

const cardVariants = {
  "from-left": {
    hidden: { opacity: 0, x: -96, y: 24 },
    visible: { opacity: 1, x: 0, y: 0 },
  },
  "from-right": {
    hidden: { opacity: 0, x: 96, y: 24 },
    visible: { opacity: 1, x: 0, y: 0 },
  },
};

export default function HomeTruckJourney() {
  const ref = useRef<HTMLElement>(null);
  const stickyLayerRef = useRef<HTMLDivElement>(null);
  const roadSvgRef = useRef<SVGSVGElement>(null);
  const roadPathRef = useRef<SVGPathElement>(null);
  const truckLeft = useMotionValue("50%");
  const truckTop = useMotionValue("50%");
  const truckRotation = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const truckScale = useTransform(scrollYProgress, [0, 0.12, 0.22, 0.42, 0.62, 0.82, 1], [0.92, 1.12, 0.96, 1.16, 0.98, 1.1, 0.94]);
  const truckSpeedShadow = useTransform(scrollYProgress, [0, 0.16, 0.3, 0.5, 0.7, 1], [
    "0 12px 30px rgba(0,0,0,0.34)",
    "18px 18px 42px rgba(0,0,0,0.42)",
    "0 12px 30px rgba(0,0,0,0.34)",
    "-18px 18px 42px rgba(0,0,0,0.42)",
    "16px 18px 42px rgba(0,0,0,0.42)",
    "0 12px 30px rgba(0,0,0,0.34)",
  ]);
  const roadOffset = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]);
  const roadDraw = useTransform(scrollYProgress, [0, 1], [0.08, 1]);

  useEffect(() => {
    const updateTruckFromPath = (latest: number) => {
      const stickyLayer = stickyLayerRef.current;
      const roadSvg = roadSvgRef.current;
      const path = roadPathRef.current;

      if (!stickyLayer || !roadSvg || !path) {
        return;
      }

      const totalLength = path.getTotalLength();
      const drivenProgress = Math.min(0.98, Math.max(0.02, latest + Math.sin(latest * Math.PI * 8) * 0.035));
      const distance = totalLength * drivenProgress;
      const point = path.getPointAtLength(distance);
      const ahead = path.getPointAtLength(Math.min(totalLength, distance + 1.4));
      const roadRect = roadSvg.getBoundingClientRect();
      const layerRect = stickyLayer.getBoundingClientRect();
      const x = roadRect.left - layerRect.left + (point.x / 100) * roadRect.width;
      const y = roadRect.top - layerRect.top + (point.y / 320) * roadRect.height;
      const dx = ((ahead.x - point.x) / 100) * roadRect.width;
      const dy = ((ahead.y - point.y) / 320) * roadRect.height;
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;

      truckLeft.set(`${x}px`);
      truckTop.set(`${y}px`);
      truckRotation.set(angle);
    };

    let animationFrame: number | null = null;
    const scheduleTruckUpdate = (latest: number) => {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }

      animationFrame = requestAnimationFrame(() => {
        updateTruckFromPath(latest);
        animationFrame = null;
      });
    };

    updateTruckFromPath(scrollYProgress.get());
    const unsubscribe = scrollYProgress.on("change", scheduleTruckUpdate);
    const updateTruckOnResize = () => scheduleTruckUpdate(scrollYProgress.get());
    window.addEventListener("resize", updateTruckOnResize);

    return () => {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }

      unsubscribe();
      window.removeEventListener("resize", updateTruckOnResize);
    };
  }, [scrollYProgress, truckLeft, truckRotation, truckTop]);

  return (
    <section ref={ref} className="truck-window min-h-[680vh] bg-[var(--kitchen-night)] text-white">
      <div className="relative z-20 grid min-h-screen items-center px-5 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <motion.div
            className="max-w-xl rounded-xl border border-white/10 bg-background/84 p-5 shadow-xl shadow-black/20 backdrop-blur"
            initial="hidden"
            animate="visible"
            variants={cardVariants["from-left"]}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent">Tomy&apos;s Kitchen</p>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight text-secondary">
              A little truck route through Tomas&apos;s day.
            </h1>
            <p className="mt-4 text-base leading-7 text-muted">
              Start at the window, follow the road, and catch the small moments that make Tomy&apos;s feel independent:
              a few regulars, a short menu, and food worth pulling over for.
            </p>
          </motion.div>

          <motion.div
            className="overflow-hidden rounded-xl border border-white/12 bg-surface shadow-xl shadow-black/25"
            initial="hidden"
            animate="visible"
            variants={cardVariants["from-right"]}
            transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
          >
            <Image
              src="/images/tomys-hero.png"
              alt="Tomy's Kitchen food truck counter with warm kitchen light"
              width={1536}
              height={1024}
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="h-[300px] w-full object-cover sm:h-[390px]"
            />
          </motion.div>
        </div>

        <div className="scroll-cue absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-white/58">
          <span>Scroll the route</span>
          <FaArrowDown className="animate-bounce text-accent" aria-hidden />
        </div>
      </div>

      <div ref={stickyLayerRef} className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#11100f_0%,#1b1815_48%,#171615_100%)]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,247,236,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,247,236,0.08)_1px,transparent_1px)] [background-size:44px_44px]" />

        <motion.svg
          ref={roadSvgRef}
          className="road-lane absolute left-1/2 top-0 h-[320%] w-[40vw] min-w-[300px] max-w-[480px] -translate-x-1/2"
          style={{ y: roadOffset }}
          viewBox="0 0 100 320"
          preserveAspectRatio="none"
          role="img"
          aria-label="Squiggly road lane"
        >
          <path
            ref={roadPathRef}
            d={roadPathD}
            fill="none"
            stroke="rgba(255,247,236,0.14)"
            strokeLinecap="round"
            strokeWidth="22"
          />
          <motion.path
            d={roadPathD}
            fill="none"
            pathLength={roadDraw}
            stroke="rgba(242,184,75,0.62)"
            strokeDasharray="1.2 2.4"
            strokeLinecap="round"
            strokeWidth="0.9"
          />
        </motion.svg>

        <motion.div
          className="top-down-truck pointer-events-none absolute z-30 h-16 w-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: truckLeft, top: truckTop }}
          aria-label="Top-down Tomy's Kitchen truck staying in its road lane"
        >
          <motion.div
            className="relative h-full w-full rounded-[1rem] border border-white/18 bg-primary ring-4 ring-background"
            style={{ rotate: truckRotation, scale: truckScale, boxShadow: truckSpeedShadow }}
          >
            <div className="absolute left-1/2 top-2 h-3 w-6 -translate-x-1/2 rounded-md bg-white/78" />
            <div className="absolute left-1/2 top-7 h-6 w-7 -translate-x-1/2 rounded-md bg-cream/90" />
            <div className="absolute bottom-2 left-1/2 h-2 w-6 -translate-x-1/2 rounded-full bg-background/64" />
            <span className="absolute -left-1 top-4 h-3 w-1 rounded-full bg-white/70" />
            <span className="absolute -right-1 top-4 h-3 w-1 rounded-full bg-white/70" />
            <span className="absolute -left-1 bottom-4 h-3 w-1 rounded-full bg-white/70" />
            <span className="absolute -right-1 bottom-4 h-3 w-1 rounded-full bg-white/70" />
          </motion.div>
        </motion.div>

        <div className="absolute bottom-5 left-5 right-5 z-10 flex flex-wrap items-center justify-between gap-3 text-xs font-extrabold uppercase tracking-[0.14em] text-white/42">
          <span>Tomy&apos;s route</span>
          <span>El Camino Real · Mountain View</span>
        </div>
      </div>

      <div className="relative z-20 -mt-[100vh]">
        <article className="grid min-h-screen items-center px-5 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.46fr)_minmax(0,1fr)] lg:items-center">
            <motion.div
              className="story-lane max-w-xl rounded-xl border border-white/10 bg-background/84 p-5 shadow-xl shadow-black/20 backdrop-blur lg:col-start-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.35 }}
              variants={cardVariants["from-left"]}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent">Start here</p>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight text-secondary">
                Follow the truck window through Tomas&apos;s day.
              </h1>
              <p className="mt-4 text-base leading-7 text-muted">
                Tomy&apos;s Kitchen is a small truck with a short line and a regular crowd. Breakfast, tacos, seafood,
                and daily plates move with the road instead of feeling like a big restaurant production.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/menu"
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-extrabold text-white shadow-lg shadow-primary/20 transition hover:bg-primary-hover"
                >
                  See Today&apos;s Menu
                </Link>
                <Link
                  href="/location"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-extrabold text-white transition hover:bg-white/10"
                >
                  Find the Truck
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="right-story-lane overflow-hidden rounded-xl border border-white/12 bg-surface shadow-xl shadow-black/25 lg:col-start-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.35 }}
              variants={cardVariants["from-right"]}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <Image
                src="/images/tomys-hero.png"
                alt="Tomy's Kitchen food truck counter with warm kitchen light"
                width={1536}
                height={1024}
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="h-[300px] w-full object-cover sm:h-[390px]"
              />
            </motion.div>
          </div>
        </article>

        <article className="grid min-h-screen items-center px-5 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.46fr)_minmax(0,1fr)] lg:items-center">
            <div className="story-lane order-2 grid gap-4 sm:grid-cols-3 lg:order-1 lg:col-start-1">
              {orderStops.map((item, index) => (
                <motion.div
                  key={item.name}
                  className="overflow-hidden rounded-xl border border-border bg-surface"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.35 }}
                  variants={cardVariants[index % 2 === 0 ? "from-left" : "from-right"]}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                >
                  <Image
                    src={featureImages[index]}
                    alt={item.name}
                    width={1536}
                    height={1024}
                    sizes="(min-width: 1024px) 20vw, 100vw"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="p-4">
                    <p className="text-sm font-extrabold text-accent">{item.price}</p>
                    <h2 className="mt-1 text-lg font-extrabold text-secondary">{item.name}</h2>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div
              className="right-story-lane order-1 max-w-md rounded-xl border border-white/10 bg-background/86 p-5 shadow-xl shadow-black/20 backdrop-blur lg:order-2 lg:col-start-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.35 }}
              variants={cardVariants["from-right"]}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent">First turn</p>
              <h2 className="mt-3 text-2xl font-extrabold leading-tight text-secondary">Breakfast gives way to lunch.</h2>
              <p className="mt-4 text-base leading-7 text-muted">
                The route is simple: eggs and tortillas early, tacos and plates when the lunch break hits, seafood when
                somebody wants the stop to feel special.
              </p>
            </motion.div>
          </div>
        </article>

        <article className="grid min-h-screen items-center px-5 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.46fr)_minmax(0,1fr)]">
            <motion.div
              className="story-lane max-w-lg rounded-xl border border-white/10 bg-background/86 p-5 shadow-xl shadow-black/20 backdrop-blur lg:col-start-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.35 }}
              variants={cardVariants["from-left"]}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent">Truck-window promise</p>
              <blockquote className="mt-3 text-2xl font-extrabold leading-tight text-secondary">
                Nothing here is trying to be fancy. It just needs to be fresh, generous, and worth turning off El Camino
                for.
              </blockquote>
              <p className="mt-4 text-base leading-7 text-muted">
                That is the indie restaurant feeling: one person&apos;s rhythm, a few things made well, and a stop that
                feels personal without making a big scene.
              </p>
            </motion.div>
          </div>
        </article>

        <article className="grid min-h-screen items-center px-5 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.46fr)_minmax(0,1fr)] lg:items-center">
            <motion.div
              className="story-lane max-w-md rounded-xl border border-white/10 bg-background/86 p-5 shadow-xl shadow-black/20 backdrop-blur lg:col-start-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.35 }}
              variants={cardVariants["from-left"]}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-accent">Last stop</p>
              <h2 className="mt-3 text-2xl font-extrabold leading-tight text-secondary">Pull up before the lunch rush.</h2>
              <p className="mt-4 text-base leading-7 text-muted">
                Stop by for breakfast before work, tacos at lunch, or a seafood plate when the craving hits.
              </p>
              <div className="mt-6 grid gap-3 text-sm text-muted">
                <p className="flex gap-3">
                  <FaLocationDot className="mt-1 shrink-0 text-primary" aria-hidden />
                  <span>239 W El Camino Real, Mountain View</span>
                </p>
                <p className="flex gap-3">
                  <FaClock className="mt-1 shrink-0 text-primary" aria-hidden />
                  <span>Monday-Saturday, 8:30 AM-3:00 PM</span>
                </p>
                <a className="flex gap-3 hover:text-primary" href="tel:+16502898628">
                  <FaPhone className="mt-1 shrink-0 text-primary" aria-hidden />
                  <span>(650) 289-8628</span>
                </a>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/location"
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-extrabold text-white transition hover:bg-primary-hover"
                >
                  Location & Hours
                </Link>
                <Link
                  href="/about"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-extrabold text-white transition hover:bg-white/10"
                >
                  Meet Tomas
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="right-story-lane overflow-hidden rounded-xl border border-white/12 bg-surface lg:col-start-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.35 }}
              variants={cardVariants["from-right"]}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <Image
                src="/images/tomys-quesabirria.png"
                alt="Quesabirria combo with consomme, rice, beans, and seafood tostada"
                width={1536}
                height={1024}
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="h-[300px] w-full object-cover sm:h-[390px]"
              />
            </motion.div>
          </div>
        </article>
      </div>
    </section>
  );
}
