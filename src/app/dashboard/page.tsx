import type { Metadata } from "next";
import DashboardClient from "./DashboardClient";
import { dashboardImageOptions, dashboardImageSlots, defaultImageSelections, defaultMenuItems } from "@/lib/dashboard-content";

export const metadata: Metadata = {
  title: "Owner Dashboard",
  description: "Internal Tomy's Kitchen site manager.",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#0f0e0d] px-5 pb-12 pt-28 text-white sm:px-6 lg:px-8">
      <DashboardClient
        availableImages={dashboardImageOptions}
        initialImageSelections={defaultImageSelections()}
        initialMenuItems={defaultMenuItems()}
        imageSlots={dashboardImageSlots}
      />
    </main>
  );
}
