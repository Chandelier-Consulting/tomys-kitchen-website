"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { FaBars, FaPhone, FaTimes } from "react-icons/fa";
import OperatingStatus from "./OperatingStatus";
import { orderLinks, tomysImages } from "@/lib/site-content";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/group-orders", label: "Catering" },
  { href: "/about", label: "About" },
  { href: "/location", label: "Location" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    return scrollY.on("change", (latest) => setIsScrolled(latest > 24));
  }, [scrollY]);

  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  const solidNav = !isHome || isScrolled || isOpen;

  return (
    <motion.header
      animate={{
        backgroundColor: solidNav ? "rgba(17,16,15,0.92)" : "rgba(17,16,15,0)",
        boxShadow: solidNav ? "0 18px 44px rgba(0,0,0,0.24)" : "0 0 0 rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.25 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 backdrop-blur-md"
    >
      <nav className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 text-lg font-extrabold tracking-normal text-white transition-colors sm:text-xl"
          aria-label="Tomy's Kitchen home"
        >
          <Image src={tomysImages.logo} alt="" width={44} height={44} priority className="h-11 w-11 rounded-full border border-white/20 object-cover" />
          <span className="text-primary">Tomy&apos;s</span> <span className="text-cream">Kitchen</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-bold text-white/78 transition-colors hover:text-white"
              >
                {link.label}
                {active ? (
                  <motion.span
                    layoutId="active-nav"
                    className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-accent"
                  />
                ) : null}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <OperatingStatus />
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={orderLinks[0].href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-extrabold text-white transition hover:bg-primary-hover"
          >
            Order online
          </a>
          <a
            href="tel:+16502898628"
            className="hidden min-h-11 items-center justify-center gap-2 rounded-full border border-white/16 px-5 text-sm font-extrabold text-white transition hover:bg-white/10 xl:inline-flex"
          >
            Call pickup <FaPhone aria-hidden />
          </a>
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
          className={`grid h-11 w-11 place-items-center rounded-full border md:hidden ${
            solidNav
              ? "border-white/15 text-white hover:bg-white/10"
              : "border-white/30 text-white hover:bg-white/10"
          }`}
        >
          {isOpen ? <FaTimes aria-hidden /> : <FaBars aria-hidden />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="max-h-[calc(100svh-5rem)] overflow-y-auto border-t border-white/10 bg-[rgba(17,16,15,0.98)] px-5 pb-6 shadow-xl md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-2 pt-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-lg px-3 py-3 text-base font-bold ${
                    pathname === link.href
                      ? "bg-white/10 text-accent"
                      : "text-white/78 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={orderLinks[0].href}
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsOpen(false)}
                className="mt-2 rounded-lg bg-primary px-3 py-3 text-base font-black text-white"
              >
                Order online
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
