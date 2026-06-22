"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase-client";

export default function ManagedImage({ imageKey, fallback, alt, className }: { imageKey: string; fallback: string; alt: string; className: string }) {
  const [src, setSrc] = useState(fallback);

  useEffect(() => {
    if (!db) return;
    return onSnapshot(doc(db, "siteContent", "settings"), (snapshot) => {
      const images = snapshot.data()?.images as Record<string, string> | undefined;
      setSrc(images?.[imageKey] || fallback);
    });
  }, [fallback, imageKey]);

  return <img src={src} alt={alt} className={className} loading="eager" fetchPriority="high" />;
}
