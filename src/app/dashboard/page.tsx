import type { Metadata } from "next";
import DashboardClient from "./DashboardClient";
import { menuCategories } from "@/lib/menu-data";

export const metadata: Metadata = {
  title: "Owner Dashboard",
  description: "Internal Tomy's Kitchen operating snapshot.",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#0f0e0d] px-5 pb-12 pt-28 text-white sm:px-6 lg:px-8">
      <DashboardClient menuCategories={menuCategories} />
    </main>
  );
}
