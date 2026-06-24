import type { Metadata } from "next";
import DashboardClient from "./DashboardClient";
import { dashboardImageSlots, readDashboardContent } from "@/lib/dashboard-content";

export const metadata: Metadata = {
  title: "Owner Dashboard",
  description: "Internal Tomy's Kitchen site manager.",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const content = await readDashboardContent();

  return (
    <main className="min-h-screen bg-[#0f0e0d] px-5 pb-12 pt-28 text-white sm:px-6 lg:px-8">
      <DashboardClient
        availableImages={content.availableImages}
        firebaseAdminReady={content.firebaseAdminReady}
        initialImageSelections={content.imageSelections}
        initialMenuItems={content.menuItems}
        imageSlots={dashboardImageSlots}
      />
    </main>
  );
}
