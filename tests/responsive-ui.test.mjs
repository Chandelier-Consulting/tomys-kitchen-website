import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (file) => readFile(new URL(file, import.meta.url), "utf8");

test("homepage leads with fresh family-owned catering story and fixed media", async () => {
  const journey = `${await read("../src/components/HomeTruckJourney.tsx")}\n${await read("../src/components/Reveal.tsx")}`;

  assert.match(journey, /Family owned/);
  assert.match(journey, /fresh Mexican food truck/i);
  assert.match(journey, /Breakfast burrito/);
  assert.match(journey, /Fish tacos/);
  assert.match(journey, /Shrimp tacos/);
  assert.match(journey, /Plan catering/);
  assert.match(journey, /autoPlay muted loop playsInline/);
  assert.match(journey, /object-cover/);
  assert.match(journey, /intersectionRatio >= 0\.4/);
  assert.match(journey, /intersectionRatio <= 0\.1/);
});

test("catering and about pages mention Tomas cuisine range", async () => {
  const source = `${await read("../src/app/about/page.tsx")}\n${await read("../src/app/group-orders/page.tsx")}\n${await read("../src/app/group-orders/GroupOrderPlanner.tsx")}`;

  assert.match(source, /Chef Tomas/);
  assert.match(source, /Mediterranean/);
  assert.match(source, /Italian/);
  assert.match(source, /American/);
  assert.match(source, /Continental/);
  assert.match(source, /Mexican first/);
  assert.doesNotMatch(source, /This page gives customers/);
  assert.doesNotMatch(source, /vague event order/);
  assert.doesNotMatch(source, /complicated catering system/);
});

test("navigation exposes catering and mobile controls stay compact", async () => {
  const source = `${await read("../src/components/Navbar.tsx")}\n${await read("../src/components/MobileActionBar.tsx")}`;

  assert.match(source, /label: "Catering"/);
  assert.match(source, /label: "Order"/);
  assert.match(source, /max-h-\[calc\(100svh-5rem\)\]/);
  assert.match(source, /overflow-y-auto/);
  assert.match(source, /Order online/);
});

test("dashboard is a simple site manager for photos and menu only", async () => {
  const dashboard = await read("../src/app/dashboard/DashboardClient.tsx");

  assert.match(dashboard, /Manager dashboard/i);
  assert.match(dashboard, /Section photo/);
  assert.match(dashboard, /Item photo/);
  assert.match(dashboard, /Add item to/);
  assert.match(dashboard, /Save menu changes/);
  assert.match(dashboard, /FileReader/);
  assert.match(dashboard, /toDataURL/);
  assert.match(dashboard, /deleteDoc/);
  assert.match(dashboard, /removedIds/);
  assert.doesNotMatch(dashboard, /Photo Manager/);
  assert.doesNotMatch(dashboard, /Prototype/);
  assert.doesNotMatch(dashboard, /onAuthStateChanged/);
});

test("firebase config and seed script support direct manager editing", async () => {
  const firebaseClient = await read("../src/lib/firebase-client.ts");
  const firebaseConfig = await read("../firebase.json");
  const proxy = await read("../src/proxy.ts");
  const firestoreRules = await read("../firestore.rules");
  const seed = await read("../scripts/seed-firestore.mjs");

  assert.match(firebaseClient, /initializeApp/);
  assert.match(firebaseClient, /getFirestore/);
  assert.match(firebaseClient, /getStorage/);
  assert.match(firebaseConfig, /firestore/);
  assert.match(firebaseConfig, /storage/);
  assert.match(proxy, /DASHBOARD_BASIC_AUTH/);
  assert.doesNotMatch(proxy, /owner-preview/);
  assert.match(firestoreRules, /allow write: if true/);
  assert.match(seed, /tomysImages/);
  assert.match(seed, /menuCategories/);
  assert.match(firebaseClient, /Boolean\(firebaseConfig\.projectId\)/);
});

test("ordering marketplace links use the live customer-facing URLs", async () => {
  const content = `${await read("../src/lib/site-content.ts")}\n${await read("../scripts/seed-firestore.mjs")}`;

  assert.match(content, /DoorDash/);
  assert.match(content, /Uber Eats/);
  assert.match(content, /Postmates/);
  assert.match(content, /Yelp/);
  assert.doesNotMatch(content, /href: ""/);
  assert.match(content, /doordash\.com\/store\/tomys-kitchen-food-truck-mountain-view-30486102/);
  assert.match(content, /ubereats\.com\/store\/tomys-kitchen/);
  assert.match(content, /postmates\.com\/store\/tomys-kitchen/);
  assert.match(content, /yelp\.com\/biz\/tomys-kitchen-mountain-view-5/);
});

test("menu items carry their own photo defaults through the menu and dashboard", async () => {
  const menuData = await read("../src/lib/menu-data.ts");
  const menuSections = await read("../src/components/ManagedMenuSections.tsx");
  const dashboardContent = await read("../src/lib/dashboard-content.ts");

  assert.match(menuData, /imageSrc:/);
  assert.match(menuSections, /resolveItemImage/);
  assert.match(dashboardContent, /item\.imageSrc/);
});
