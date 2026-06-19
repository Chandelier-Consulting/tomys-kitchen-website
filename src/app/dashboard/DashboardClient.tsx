"use client";

import { useEffect, useMemo, useState } from "react";
import { FaArrowTrendUp, FaBowlFood, FaBullhorn, FaCheck, FaClock, FaPhone, FaStar, FaTriangleExclamation } from "react-icons/fa6";
import type { MenuCategory } from "@/lib/menu-data";

const kpis = [
  { label: "Estimated daily revenue", value: "$1,420", delta: "+12% vs last Tue", icon: FaArrowTrendUp },
  { label: "Call-ahead orders", value: "34", delta: "11 before 10 AM", icon: FaPhone },
  { label: "Average ticket", value: "$18.70", delta: "Quesabirria driving mix", icon: FaBowlFood },
  { label: "Rush window", value: "11:35-1:10", delta: "Prep extra salsa by 11", icon: FaClock },
];

const prepList = [
  { item: "Quesabirria combo", status: "High", action: "Prep consomme and tortillas for 24 more orders" },
  { item: "Fish tacos", status: "Medium", action: "Check batter and slaw by 10:45 AM" },
  { item: "Horchata", status: "Medium", action: "Batch refill likely before lunch rush" },
  { item: "Coctel mixto", status: "Low", action: "Promote with seafood photo on slow days" },
];

const leadInbox = [
  { source: "Office breakfast", request: "18 burritos for Thursday", action: "Call back before 4 PM", value: "$180 est." },
  { source: "Construction crew", request: "Taco pickup around noon", action: "Suggest asada + fish mix", value: "$240 est." },
  { source: "Family order", request: "Seafood and quesabirria", action: "Confirm spice level", value: "$96 est." },
];

const reviewPrompts = [
  { label: "Best ask", value: "Quesabirria customers after lunch" },
  { label: "Message", value: "Short Google review link after pickup" },
  { label: "Goal", value: "5 new reviews this month" },
];

const ownerActions = [
  "Pin today's special above the menu before opening.",
  "Text office regulars when breakfast burritos are ready.",
  "Ask two happy lunch guests for fresh Google reviews this week.",
  "Track sold-out items daily so the public menu can be smarter later.",
];

const promoMessages = [
  "Breakfast burritos are ready at Tomy's Kitchen. Call ahead for pickup on El Camino.",
  "Quesabirria, tacos, and aguas frescas are moving fast today. Call Tomy's before the lunch rush.",
  "Feeding a crew? Tomy's Kitchen can help with group pickup if you call with headcount and pickup time.",
];

const weeklyPulse = [
  ["Mon", "Breakfast-heavy", "Text office regulars early."],
  ["Tue", "Balanced", "Push tacos + lunch pickup."],
  ["Wed", "Slow risk", "Promote reviews and group orders."],
  ["Thu", "Office day", "Offer mixed lunch packs."],
  ["Fri", "High volume", "Stay on call-ahead orders."],
  ["Sat", "Family traffic", "Feature seafood and combo plates."],
];

const closingChecklist = [
  "Count what sold out and update tomorrow's focus.",
  "Review which group orders turned into repeat customers.",
  "Save any good review asks for follow-up text messages.",
  "Post one fast promo message if today was slow.",
];

const defaultNote = [
  "Tomorrow focus:",
  "- Push breakfast burritos before 10 AM.",
  "- Ask lunch regulars about group pickup.",
  "- Watch for sold-out seafood items.",
].join("\n");

const callLog = [
  ["Office breakfast", "18 burritos", "Follow up at 4 PM if no answer."],
  ["Group pickup", "12 people", "Confirm headcount and pickup time."],
  ["Regular lunch", "Quesabirria combo", "Remind them the truck opens at 8:30."],
];

const responseScripts = [
  "Thanks for calling Tomy's Kitchen. How many people are eating?",
  "What pickup time are you aiming for?",
  "Do you want breakfast, tacos, seafood, or a mixed order?",
];

const tabs = ["Today", "Leads", "Reviews"] as const;
type Tab = (typeof tabs)[number];

export default function DashboardClient({ menuCategories }: { menuCategories: MenuCategory[] }) {
  const [activeTab, setActiveTab] = useState<Tab>("Today");
  const [copiedLabel, setCopiedLabel] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [ownerNote, setOwnerNote] = useState(defaultNote);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [closedItems, setClosedItems] = useState<Set<string>>(new Set());

  const openLeadValue = useMemo(() => {
    return leadInbox.reduce((sum, lead) => sum + Number(lead.value.replace(/[^0-9]/g, "")), 0);
  }, []);

  const prepSheet = useMemo(() => {
    return prepList
      .map((task) => `${completed.has(task.item) ? "[x]" : "[ ]"} ${task.item} - ${task.action}`)
      .join("\n");
  }, [completed]);

  const leadExport = useMemo(() => {
    return leadInbox.map((lead) => `${lead.source}: ${lead.request} | ${lead.action} | ${lead.value}`).join("\n");
  }, []);

  useEffect(() => {
    try {
      const storedNote = window.localStorage.getItem("tomys-dashboard-note");
      const storedPrep = JSON.parse(window.localStorage.getItem("tomys-dashboard-prep") ?? "[]") as string[];
      const storedClosing = JSON.parse(window.localStorage.getItem("tomys-dashboard-closing") ?? "[]") as string[];

      if (storedNote) {
        setOwnerNote(storedNote);
      }

      setCompleted(new Set(storedPrep));
      setClosedItems(new Set(storedClosing));
    } finally {
      setHydrated(true);
    }
  }, []);

  const toggleCompleted = (item: string) => {
    setCompleted((current) => {
      const next = new Set(current);
      if (next.has(item)) {
        next.delete(item);
      } else {
        next.add(item);
      }
      return next;
    });
  };

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem("tomys-dashboard-prep", JSON.stringify(Array.from(completed)));
  }, [completed, hydrated]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem("tomys-dashboard-closing", JSON.stringify(Array.from(closedItems)));
  }, [closedItems, hydrated]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem("tomys-dashboard-note", ownerNote);
  }, [ownerNote, hydrated]);

  const copyText = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedLabel(label);
    } catch {
      setCopiedLabel("Copy unavailable");
    }
  };

  const toggleClosed = (item: string) => {
    setClosedItems((current) => {
      const next = new Set(current);
      if (next.has(item)) {
        next.delete(item);
      } else {
        next.add(item);
      }
      return next;
    });
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">Internal only</p>
          <h1 className="mt-3 text-4xl font-black leading-none tracking-[-0.03em] sm:text-6xl">Tomy&apos;s owner command center</h1>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/62">
            Prototype operating dashboard for Tomas: sales pulse, prep priorities, lead follow-up, review growth, and menu intelligence. Not linked from the customer site.
          </p>
        </div>
        <div className="rounded-2xl border border-primary/30 bg-primary/12 px-5 py-4 text-sm font-bold text-primary">
          Prototype data · connect POS, calls, reviews, and form leads later
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-full border px-5 py-3 text-sm font-black transition ${
              activeTab === tab ? "border-primary bg-primary text-white" : "border-white/10 bg-white/[0.06] text-white/62 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {!hydrated ? (
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.06] p-6 text-sm font-semibold text-white/62">
          Loading owner data...
        </div>
      ) : null}

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <article key={kpi.label} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-[0_22px_70px_rgba(0,0,0,.28)]">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-white/46">{kpi.label}</p>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/15 text-accent"><Icon aria-hidden /></span>
              </div>
              <p className="mt-5 text-4xl font-black tracking-[-0.04em]">{kpi.value}</p>
              <p className="mt-2 text-sm font-bold text-white/58">{kpi.delta}</p>
            </article>
          );
        })}
      </section>

      {activeTab === "Today" ? (
        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Prep board</p>
                <h2 className="mt-2 text-3xl font-black">What to watch before lunch</h2>
              </div>
              <FaTriangleExclamation className="text-2xl text-primary" aria-hidden />
            </div>
            <div className="mt-6 grid gap-3">
              {prepList.map((task) => {
                const done = completed.has(task.item);
                return (
                  <button key={task.item} type="button" onClick={() => toggleCompleted(task.item)} className={`grid gap-3 rounded-2xl border p-4 text-left transition sm:grid-cols-[1fr_auto] sm:items-center ${done ? "border-accent/40 bg-accent/10" : "border-white/10 bg-black/18 hover:border-primary/40"}`}>
                    <div>
                      <h3 className="flex items-center gap-2 text-lg font-black">{done ? <FaCheck className="text-accent" aria-hidden /> : null}{task.item}</h3>
                      <p className="mt-1 text-sm font-semibold leading-6 text-white/58">{task.action}</p>
                    </div>
                    <span className="w-fit rounded-full bg-accent/14 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-accent">{done ? "Done" : task.status}</span>
                  </button>
                );
              })}
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Menu mix</p>
            <h2 className="mt-2 text-3xl font-black">Category health</h2>
            <div className="mt-6 grid gap-4">
              {menuCategories.map((category, index) => {
                const width = [68, 82, 91, 44, 57][index] ?? 50;
                return (
                  <div key={category.name}>
                    <div className="flex justify-between gap-3 text-sm font-black">
                      <span>{category.name}</span>
                      <span className="text-white/54">{category.items.length} items</span>
                    </div>
                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${width}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        </section>
      ) : null}

      {activeTab === "Leads" ? (
        <section className="mt-8 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
          <article className="rounded-3xl border border-primary/30 bg-primary/12 p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Open lead value</p>
            <h2 className="mt-3 text-6xl font-black tracking-[-0.05em]">${openLeadValue}</h2>
            <p className="mt-3 text-sm font-bold leading-6 text-white/62">Estimated revenue sitting in follow-up. This is the business-owner hook: the website becomes a lead and operations tool, not just a brochure.</p>
          </article>
          <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/15 text-primary"><FaBullhorn aria-hidden /></span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Lead inbox</p>
                <h2 className="text-3xl font-black">Follow-ups worth money</h2>
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              {leadInbox.map((lead) => (
                <div key={lead.source} className="rounded-2xl border border-white/10 bg-black/18 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-black">{lead.source}</h3>
                    <span className="text-xs font-black uppercase tracking-[0.14em] text-primary">{lead.value}</span>
                  </div>
                  <p className="mt-2 text-sm font-bold text-white/72">{lead.request}</p>
                  <p className="mt-1 text-sm font-semibold text-white/48">{lead.action}</p>
                </div>
              ))}
            </div>
          </article>
        </section>
      ) : null}

      {activeTab === "Reviews" ? (
        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-accent/15 text-accent"><FaStar aria-hidden /></span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Review engine</p>
                <h2 className="text-3xl font-black">Turn good orders into proof</h2>
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              {reviewPrompts.map((prompt) => (
                <div key={prompt.label} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/18 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-white/42">{prompt.label}</p>
                  <p className="text-right text-sm font-bold text-white/74">{prompt.value}</p>
                </div>
              ))}
            </div>
          </article>
          <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Next best actions</p>
            <div className="mt-5 grid gap-3">
              {ownerActions.map((action) => (
                <div key={action} className="rounded-2xl border border-white/10 bg-black/18 p-4 text-sm font-bold leading-6 text-white/72">
                  {action}
                </div>
              ))}
            </div>
          </article>
        </section>
      ) : null}

      <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.06] p-6">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Weekly pulse</p>
        <h2 className="mt-2 text-3xl font-black">A simple operating rhythm for the week</h2>
        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          {weeklyPulse.map(([day, focus, action]) => (
            <article key={day} className="rounded-2xl border border-white/10 bg-black/18 p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-black">{day}</h3>
                <span className="rounded-full bg-accent/14 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-accent">
                  {focus}
                </span>
              </div>
              <p className="mt-3 text-sm font-semibold leading-6 text-white/62">{action}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
        <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Call log</p>
          <h2 className="mt-2 text-3xl font-black">Recent high-value conversations</h2>
          <div className="mt-6 grid gap-3">
            {callLog.map(([topic, detail, action]) => (
              <div key={topic} className="rounded-2xl border border-white/10 bg-black/18 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-black">{topic}</h3>
                  <span className="text-xs font-black uppercase tracking-[0.14em] text-accent">{detail}</span>
                </div>
                <p className="mt-2 text-sm font-semibold leading-6 text-white/62">{action}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Response scripts</p>
          <h2 className="mt-2 text-3xl font-black">Fast answers that keep the line moving</h2>
          <div className="mt-6 grid gap-3">
            {responseScripts.map((script) => (
              <button
                key={script}
                type="button"
                onClick={() => copyText("Response script", script)}
                className="rounded-2xl border border-white/10 bg-black/18 p-4 text-left text-sm font-bold leading-6 text-white/72 transition hover:border-primary/40 hover:text-white"
              >
                {copiedLabel === "Response script" ? "Copied: " : null}
                {script}
              </button>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.06] p-6">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Closing checklist</p>
        <h2 className="mt-2 text-3xl font-black">End-of-day cleanup</h2>
        <div className="mt-6 grid gap-3">
          {closingChecklist.map((item) => {
            const done = closedItems.has(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => toggleClosed(item)}
                className={`flex items-center justify-between gap-4 rounded-2xl border p-4 text-left transition ${
                  done ? "border-accent/40 bg-accent/10" : "border-white/10 bg-black/18 hover:border-primary/40"
                }`}
              >
                <span className="text-sm font-bold leading-6 text-white/76">{item}</span>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.14em] ${
                    done ? "bg-accent/14 text-accent" : "bg-white/10 text-white/58"
                  }`}
                >
                  {done ? "Done" : "Open"}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.06] p-6">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Owner notes</p>
        <h2 className="mt-2 text-3xl font-black">One place for tomorrow&apos;s focus</h2>
        <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-white/58">
          Keep short reminders here. This stays local to the browser so Tomas can use it during a demo without needing a backend.
        </p>
        <textarea
          value={ownerNote}
          onChange={(event) => setOwnerNote(event.target.value)}
          rows={7}
          className="mt-6 w-full rounded-3xl border border-white/10 bg-black/18 p-4 text-sm font-semibold leading-6 text-white outline-none transition placeholder:text-white/32 focus:border-primary/40"
          placeholder="Write tomorrow's focus, sold-out items, follow-up calls, or anything else useful."
        />
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Operating outputs</p>
          <h2 className="mt-2 text-3xl font-black">Copy, print, and run the day</h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-white/58">
            These are simple by design: useful outputs Tomas can use immediately before real POS, reviews, and lead systems are connected.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => copyText("Prep sheet", prepSheet)}
              className="rounded-2xl border border-white/10 bg-black/18 p-4 text-left text-sm font-black text-white transition hover:border-primary/40"
            >
              {copiedLabel === "Prep sheet" ? "Copied prep sheet" : "Copy prep sheet"}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-2xl border border-white/10 bg-black/18 p-4 text-left text-sm font-black text-white transition hover:border-primary/40"
            >
              Print dashboard
            </button>
            <button
              type="button"
              onClick={() => copyText("Lead export", leadExport)}
              className="rounded-2xl border border-white/10 bg-black/18 p-4 text-left text-sm font-black text-white transition hover:border-primary/40"
            >
              {copiedLabel === "Lead export" ? "Copied leads" : "Copy lead export"}
            </button>
            <button
              type="button"
              onClick={() => copyText("Review ask", "Thanks for stopping by Tomy's Kitchen today. If you enjoyed the food, a quick Google review helps the truck a lot.")}
              className="rounded-2xl border border-white/10 bg-black/18 p-4 text-left text-sm font-black text-white transition hover:border-primary/40"
            >
              {copiedLabel === "Review ask" ? "Copied review ask" : "Copy review ask"}
            </button>
          </div>
        </article>

        <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Promo text bank</p>
          <h2 className="mt-2 text-3xl font-black">Fast posts for slow moments</h2>
          <div className="mt-6 grid gap-3">
            {promoMessages.map((message) => (
              <button
                key={message}
                type="button"
                onClick={() => copyText(message, message)}
                className="rounded-2xl border border-white/10 bg-black/18 p-4 text-left text-sm font-bold leading-6 text-white/72 transition hover:border-primary/40 hover:text-white"
              >
                {copiedLabel === message ? "Copied: " : null}
                {message}
              </button>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
