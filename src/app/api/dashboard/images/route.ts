import { NextResponse } from "next/server";
import { z } from "zod";
import { dashboardImageSlots, defaultImageSelections, listPublicImageOptions } from "@/lib/dashboard-content";
import { getAdminDb } from "@/lib/firebase-admin";

const schema = z.object({
  images: z.record(z.string(), z.string()),
});

export async function PUT(request: Request) {
  const db = getAdminDb();

  if (!db) {
    return NextResponse.json({ error: "Firebase Admin is not configured on the server." }, { status: 500 });
  }

  const payload = schema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: "Invalid image payload." }, { status: 400 });
  }

  const validSlots = new Set(dashboardImageSlots.map((slot) => slot.key));
  const validSources = new Set((await listPublicImageOptions()).map((image) => image.src));
  const nextImages = defaultImageSelections();

  for (const [key, src] of Object.entries(payload.data.images)) {
    if (!validSlots.has(key) || !validSources.has(src)) {
      return NextResponse.json({ error: `Invalid image selection for ${key}.` }, { status: 400 });
    }

    nextImages[key] = src;
  }

  await db.doc("siteContent/settings").set(
    {
      images: nextImages,
      updatedAt: new Date().toISOString(),
    },
    { merge: true },
  );

  return NextResponse.json({ ok: true, images: nextImages });
}

