import "server-only";

import { readdir } from "node:fs/promises";
import path from "node:path";
import { getAdminDb } from "@/lib/firebase-admin";
import { menuCategories } from "@/lib/menu-data";
import { orderLinks, tomysImages } from "@/lib/site-content";

export type DashboardImageOption = {
  label: string;
  src: string;
};

export type DashboardMenuItem = {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  visible: boolean;
  sortOrder: number;
  imageSrc: string;
};

export type DashboardImageSlot = {
  key: string;
  label: string;
  defaultSrc: string;
};

function defaultItemImage(category: string, name: string) {
  const normalized = `${category} ${name}`.toLowerCase();

  if (normalized.includes("breakfast")) return tomysImages.breakfastBurrito;
  if (normalized.includes("fish")) return tomysImages.fishTacos;
  if (normalized.includes("shrimp")) return tomysImages.shrimpTacos;
  if (normalized.includes("torta")) return tomysImages.torta;
  if (normalized.includes("drink")) return tomysImages.truck;
  return tomysImages.cateringSalmon;
}

export const dashboardImageSlots: DashboardImageSlot[] = [
  { key: "Logo", label: "Logo", defaultSrc: tomysImages.logo },
  { key: "Truck", label: "Truck", defaultSrc: tomysImages.truck },
  { key: "Breakfast Burrito", label: "Breakfast Burrito", defaultSrc: tomysImages.breakfastBurrito },
  { key: "Fish Tacos (Tacos de Pescado)", label: "Fish Tacos", defaultSrc: tomysImages.fishTacos },
  { key: "Shrimp Tacos", label: "Shrimp Tacos", defaultSrc: tomysImages.shrimpTacos },
  { key: "Torta Oaxaqueña", label: "Torta Oaxaqueña", defaultSrc: tomysImages.torta },
  { key: "Breakfast", label: "Breakfast Category", defaultSrc: tomysImages.breakfastBurrito },
  { key: "Tacos", label: "Tacos Category", defaultSrc: tomysImages.fishTacos },
  { key: "Mains", label: "Mains Category", defaultSrc: tomysImages.torta },
  { key: "Seafood Cocktails", label: "Seafood Category", defaultSrc: tomysImages.shrimpTacos },
  { key: "Drinks", label: "Drinks Category", defaultSrc: tomysImages.truck },
  { key: "Catering", label: "Catering", defaultSrc: tomysImages.cateringSalmon },
];

const imageDirectory = path.join(process.cwd(), "public", "images", "tomys");
const imagePattern = /\.(png|jpe?g|webp|avif)$/i;

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function defaultImageSelections() {
  return Object.fromEntries(dashboardImageSlots.map((slot) => [slot.key, slot.defaultSrc])) as Record<string, string>;
}

export function defaultMenuItems(): DashboardMenuItem[] {
  return menuCategories.flatMap((category) =>
    category.items.map((item, index) => ({
      id: `${slugify(category.name)}-${slugify(item.name)}`,
      name: item.name,
      price: item.price,
      description: item.description,
      category: category.name,
      visible: true,
      sortOrder: index,
      imageSrc: defaultItemImage(category.name, item.name),
    })),
  );
}

export async function listPublicImageOptions(): Promise<DashboardImageOption[]> {
  const files = await readdir(imageDirectory);

  return files
    .filter((file) => imagePattern.test(file))
    .sort((left, right) => left.localeCompare(right))
    .map((file) => ({
      label: file
        .replace(imagePattern, "")
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase()),
      src: `/images/tomys/${file}`,
    }));
}

export async function readDashboardContent() {
  const defaultImages = defaultImageSelections();
  const defaultMenu = defaultMenuItems();
  const availableImages = await listPublicImageOptions();
  const db = getAdminDb();

  if (!db) {
    return {
      firebaseAdminReady: false,
      imageSelections: defaultImages,
      menuItems: defaultMenu,
      availableImages,
      orderLinks,
    };
  }

  const [settingsSnap, menuSnap] = await Promise.all([
    db.doc("siteContent/settings").get(),
    db.collection("menuItems").get(),
  ]);

  const settings = settingsSnap.data() ?? {};
  const imageSelections = {
    ...defaultImages,
    ...((settings.images as Record<string, string> | undefined) ?? {}),
  };

  const storedMenuItems = menuSnap.docs.map((doc) => {
    const data = doc.data() as Partial<DashboardMenuItem>;
    return {
      id: doc.id,
      name: data.name ?? "",
      price: data.price ?? "",
      description: data.description ?? "",
      category: data.category ?? "Breakfast",
      visible: data.visible ?? true,
      sortOrder: typeof data.sortOrder === "number" ? data.sortOrder : 0,
      imageSrc: data.imageSrc ?? defaultItemImage(data.category ?? "Breakfast", data.name ?? ""),
    };
  });

  return {
    firebaseAdminReady: true,
    imageSelections,
    menuItems: storedMenuItems.length ? storedMenuItems : defaultMenu,
    availableImages,
    orderLinks: ((settings.orderLinks as typeof orderLinks | undefined) ?? orderLinks),
  };
}
