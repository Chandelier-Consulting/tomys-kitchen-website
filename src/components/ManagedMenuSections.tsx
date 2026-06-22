"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase-client";
import type { MenuCategory, MenuItem } from "@/lib/menu-data";
import { tomysImages } from "@/lib/site-content";
import ManagedImage from "./ManagedImage";

type ManagedMenuItem = MenuItem & { category: string; visible?: boolean };

const images = [tomysImages.breakfastBurrito, tomysImages.fishTacos, tomysImages.shrimpTacos, tomysImages.torta, tomysImages.cateringSalmon];

export default function ManagedMenuSections({ fallback }: { fallback: MenuCategory[] }) {
  const [items, setItems] = useState<ManagedMenuItem[]>([]);

  useEffect(() => {
    if (!db) return;
    return onSnapshot(query(collection(db, "menuItems"), where("visible", "==", true)), (snapshot) => {
      setItems(snapshot.docs.map((doc) => doc.data() as ManagedMenuItem));
    });
  }, []);

  const categories = useMemo(() => {
    if (!items.length) return fallback;
    const names = Array.from(new Set(items.map((item) => item.category)));
    return names.map((name) => ({ name, items: items.filter((item) => item.category === name) }));
  }, [fallback, items]);

  return (
    <section className="px-5 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8">
        {categories.map((category, categoryIndex) => (
          <section key={category.name} id={category.name.toLowerCase().replaceAll(" ", "-")} className="scroll-mt-36 overflow-hidden rounded-[2rem] border border-border bg-surface shadow-[0_24px_80px_rgba(0,0,0,.24)]">
            <div className="grid lg:grid-cols-[360px_1fr]">
              <div className="relative min-h-72">
                <ManagedImage imageKey={category.name} fallback={images[categoryIndex % images.length]} alt={`${category.name} at Tomy's Kitchen`} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/68 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Tomy&apos;s Kitchen</p>
                  <h2 className="mt-2 text-4xl font-black leading-none text-white">{category.name}</h2>
                </div>
              </div>
              <div className="p-5 sm:p-7">
                {category.items.map((item) => (
                  <article key={`${category.name}-${item.name}`} className="grid gap-3 border-b border-border py-5 last:border-b-0 sm:grid-cols-[1fr_auto] sm:gap-6">
                    <div>
                      <h3 className="text-xl font-black text-secondary">{item.name}</h3>
                      <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-muted">{item.description}</p>
                    </div>
                    <p className="text-xl font-black text-primary sm:text-right">{item.price}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
