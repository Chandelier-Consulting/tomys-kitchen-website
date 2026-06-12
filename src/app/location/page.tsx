import type { Metadata } from "next";
import { FaClock, FaLocationDot, FaPhone, FaRoute } from "react-icons/fa6";
import InfoCard from "@/components/InfoCard";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Location & Hours",
  description: "Find Tomy's Kitchen at 239 W El Camino Real in Mountain View. Open Monday through Saturday, 8:30 AM to 3:00 PM.",
};

export default function LocationPage() {
  return (
    <>
      <section className="bg-surface px-5 pb-10 pt-22 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Visit Us"
          title="Location & Hours"
          subtitle="Find the truck on El Camino Real in Mountain View for breakfast, tacos, seafood, and daily plates."
        />
      </section>

      <section className="px-5 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_18px_48px_rgba(26,26,46,0.07)]">
            <iframe
              title="Map to Tomy's Kitchen"
              src="https://www.google.com/maps?q=239%20W%20El%20Camino%20Real%2C%20Mountain%20View%2C%20CA%2094040&output=embed"
              className="h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="grid gap-5">
            <InfoCard icon={<FaLocationDot aria-hidden />} title="Address">
              <p>239 W El Camino Real</p>
              <p>Mountain View, CA 94040</p>
            </InfoCard>
            <InfoCard icon={<FaClock aria-hidden />} title="Hours" delay={0.08}>
              <p>Monday-Saturday</p>
              <p className="font-bold text-secondary">8:30 AM-3:00 PM</p>
              <p>Closed Sunday</p>
            </InfoCard>
            <InfoCard icon={<FaPhone aria-hidden />} title="Phone" delay={0.16}>
              <a className="font-bold text-primary hover:text-primary-hover" href="tel:+16502898628">
                (650) 289-8628
              </a>
            </InfoCard>
          </div>
        </div>
      </section>

      <section className="px-5 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-xl border border-border bg-surface p-6 shadow-[0_18px_48px_rgba(26,26,46,0.05)] md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-start">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-accent/16 text-xl text-secondary">
              <FaRoute aria-hidden />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-secondary">Parking & El Camino access</h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
                The truck is positioned for quick El Camino Real access. Street and nearby lot availability can change
                during lunch hours, so call ahead if you are planning a larger pickup.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
