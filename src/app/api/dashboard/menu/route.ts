import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminDb } from "@/lib/firebase-admin";

const itemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  price: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  visible: z.boolean(),
  sortOrder: z.number().int().nonnegative(),
  imageSrc: z.string().min(1),
});

const payloadSchema = z.object({
  items: z.array(itemSchema).min(1),
});

export async function PUT(request: Request) {
  const db = getAdminDb();

  if (!db) {
    return NextResponse.json({ error: "Firebase Admin is not configured on the server." }, { status: 500 });
  }

  const payload = payloadSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: "Invalid menu payload." }, { status: 400 });
  }

  const existingDocs = await db.collection("menuItems").get();
  const nextIds = new Set(payload.data.items.map((item) => item.id));
  const batch = db.batch();

  for (const item of payload.data.items) {
    batch.set(db.doc(`menuItems/${item.id}`), {
      name: item.name,
      price: item.price,
      description: item.description,
      category: item.category,
      visible: item.visible,
      sortOrder: item.sortOrder,
      imageSrc: item.imageSrc,
      updatedAt: new Date().toISOString(),
    });
  }

  for (const doc of existingDocs.docs) {
    if (!nextIds.has(doc.id)) {
      batch.delete(doc.ref);
    }
  }

  await batch.commit();

  return NextResponse.json({ ok: true, count: payload.data.items.length });
}
