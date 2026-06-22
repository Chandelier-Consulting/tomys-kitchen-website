"use client";

import { useMemo, useState } from "react";
import { FaPhone, FaRegMessage } from "react-icons/fa6";

const phoneNumber = "+16502898628";

export default function GroupOrderPlanner() {
  const [name, setName] = useState("");
  const [headcount, setHeadcount] = useState("12");
  const [pickupTime, setPickupTime] = useState("Tomorrow at 12:00 PM");
  const [orderType, setOrderType] = useState("Mixed tacos and quesabirria");
  const [notes, setNotes] = useState("Please recommend what travels best.");

  const message = useMemo(() => {
    return [
      "Hi Tomy's Kitchen, I want to plan catering or a group pickup.",
      name ? `Name: ${name}` : "Name:",
      `Headcount: ${headcount}`,
      `Pickup time: ${pickupTime}`,
      `Order type: ${orderType}`,
      notes ? `Notes: ${notes}` : "Notes:",
    ].join("\n");
  }, [headcount, name, notes, orderType, pickupTime]);

  const smsHref = `sms:${phoneNumber}?&body=${encodeURIComponent(message)}`;

  return (
    <section className="px-5 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] border border-border bg-surface p-5 shadow-[0_24px_80px_rgba(0,0,0,.22)] lg:grid-cols-[.82fr_1.18fr] lg:p-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Fast catering inquiry</p>
          <h2 className="mt-4 text-4xl font-black leading-none tracking-[-0.03em] text-secondary sm:text-6xl">Turn a vague event order into a clear text.</h2>
          <p className="mt-5 text-base font-semibold leading-7 text-muted">
            Fill in the basics and send Tomas a clean SMS. No login, no waiting, no complicated catering system.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <a href={smsHref} className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-primary px-7 text-sm font-black text-white transition hover:bg-primary-hover">
              Send SMS inquiry <FaRegMessage aria-hidden />
            </a>
            <a href={`tel:${phoneNumber}`} className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-border px-7 text-sm font-black text-secondary transition hover:border-primary hover:text-primary">
              Call instead <FaPhone aria-hidden />
            </a>
          </div>
        </div>

        <div className="grid gap-4">
          <label className="grid gap-2 text-sm font-black text-secondary">
            Your name
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Name" className="min-h-12 rounded-2xl border border-border bg-background px-4 text-base font-semibold text-foreground outline-none transition placeholder:text-muted focus:border-primary" />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-black text-secondary">
              Headcount
              <input value={headcount} onChange={(event) => setHeadcount(event.target.value)} className="min-h-12 rounded-2xl border border-border bg-background px-4 text-base font-semibold text-foreground outline-none transition focus:border-primary" />
            </label>
            <label className="grid gap-2 text-sm font-black text-secondary">
              Pickup time
              <input value={pickupTime} onChange={(event) => setPickupTime(event.target.value)} className="min-h-12 rounded-2xl border border-border bg-background px-4 text-base font-semibold text-foreground outline-none transition focus:border-primary" />
            </label>
          </div>
          <label className="grid gap-2 text-sm font-black text-secondary">
            Food direction
            <input value={orderType} onChange={(event) => setOrderType(event.target.value)} className="min-h-12 rounded-2xl border border-border bg-background px-4 text-base font-semibold text-foreground outline-none transition focus:border-primary" />
          </label>
          <label className="grid gap-2 text-sm font-black text-secondary">
            Notes
            <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={4} className="rounded-2xl border border-border bg-background px-4 py-3 text-base font-semibold text-foreground outline-none transition focus:border-primary" />
          </label>
          <div className="rounded-2xl border border-primary/30 bg-primary/12 p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-primary">SMS preview</p>
            <pre className="mt-3 whitespace-pre-wrap font-sans text-sm font-semibold leading-6 text-muted">{message}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}
