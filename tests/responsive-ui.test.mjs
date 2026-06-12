import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("homepage uses real responsive food imagery", async () => {
  const page = await readFile(new URL("../src/app/page.tsx", import.meta.url), "utf8");
  const journey = await readFile(new URL("../src/components/HomeTruckJourney.tsx", import.meta.url), "utf8");

  assert.match(page, /HomeTruckJourney/);
  assert.match(journey, /from "next\/image"/);
  assert.match(journey, /\/images\/tomys-hero\.png/);
  assert.match(journey, /\/images\/tomys-tacos\.png/);
  assert.match(journey, /\/images\/tomys-quesabirria\.png/);
  assert.match(journey, /sizes="/);
});

test("homepage is a full truck road scroll experience", async () => {
  const page = await readFile(new URL("../src/app/page.tsx", import.meta.url), "utf8");
  const journey = await readFile(new URL("../src/components/HomeTruckJourney.tsx", import.meta.url), "utf8");

  assert.match(page, /<HomeTruckJourney \/>/);
  assert.doesNotMatch(page, /<section/);
  assert.match(journey, /"use client"/);
  assert.match(journey, /min-h-\[680vh\]/);
  assert.match(journey, /sticky/);
  assert.match(journey, /useScroll/);
  assert.match(journey, /useTransform/);
  assert.match(journey, /scroll-cue/i);
  assert.match(journey, /animate-bounce/);
  assert.match(journey, /roadOffset/);
  assert.match(journey, /"-72%"/);
  assert.match(journey, /h-\[320%\]/);
  assert.match(journey, /viewBox="0 0 100 320"/);
  assert.match(journey, /truckScale/);
  assert.match(journey, /truckSpeedShadow/);
  assert.match(journey, /roadPathRef/);
  assert.match(journey, /truckLeft/);
  assert.match(journey, /truckTop/);
  assert.match(journey, /truckRotation/);
  assert.match(journey, /getTotalLength/);
  assert.match(journey, /getPointAtLength/);
  assert.match(journey, /drivenProgress/);
  assert.match(journey, /style=\{\{ left: truckLeft, top: truckTop \}\}/);
  assert.match(journey, /style=\{\{ rotate: truckRotation, scale: truckScale, boxShadow: truckSpeedShadow \}\}/);
  assert.doesNotMatch(journey, /translate\(-50%, -50%\)/);
  assert.match(journey, /top-down-truck/);
  assert.match(journey, /road-lane/);
  assert.match(journey, /story-lane/);
  assert.match(journey, /right-story-lane/);
  assert.doesNotMatch(journey, /const truckX/);
  assert.doesNotMatch(journey, /const truckY/);
  assert.doesNotMatch(journey, /const truckLaneX/);
  assert.doesNotMatch(journey, /const truckTravelY/);
  assert.match(journey, /cardVariants/);
  assert.match(journey, /from-left/);
  assert.match(journey, /from-right/);
  assert.match(journey, /squiggly road/i);
  assert.match(journey, /Top-down Tomy's Kitchen truck staying in its road lane/);
  assert.match(journey, /small truck with a short line and a regular crowd/i);
  assert.match(journey, /truck-window/);
});

test("navigation and menu category controls guard against mobile overflow", async () => {
  const navbar = await readFile(new URL("../src/components/Navbar.tsx", import.meta.url), "utf8");
  const menuPage = await readFile(new URL("../src/app/menu/page.tsx", import.meta.url), "utf8");

  assert.match(navbar, /max-h-\[calc\(100svh-5rem\)\]/);
  assert.match(navbar, /overflow-y-auto/);
  assert.match(menuPage, /max-w-full/);
  assert.match(menuPage, /overflow-x-auto/);
});

test("visible restaurant copy avoids theme placeholder language", async () => {
  const files = [
    "../src/app/page.tsx",
    "../src/app/about/page.tsx",
    "../src/app/menu/page.tsx",
    "../src/app/layout.tsx",
    "../src/components/Footer.tsx",
  ];

  const source = (
    await Promise.all(files.map((file) => readFile(new URL(file, import.meta.url), "utf8")))
  ).join("\n");

  assert.doesNotMatch(source, /charcoal/i);
  assert.doesNotMatch(source, /built around workflows/i);
});

test("about page tells a Tomas Tejeda restaurant story", async () => {
  const aboutPage = await readFile(new URL("../src/app/about/page.tsx", import.meta.url), "utf8");

  assert.match(aboutPage, /Tomas Tejeda/);
  assert.match(aboutPage, /El Camino Real/);
  assert.match(aboutPage, /food truck/);
  assert.match(aboutPage, /made daily/i);
});

test("editorial redesign uses regular type scale", async () => {
  const files = [
    "../src/app/page.tsx",
    "../src/app/about/page.tsx",
    "../src/app/menu/page.tsx",
    "../src/app/location/page.tsx",
    "../src/components/SectionHeading.tsx",
    "../src/components/HomeTruckJourney.tsx",
  ];

  const source = (
    await Promise.all(files.map((file) => readFile(new URL(file, import.meta.url), "utf8")))
  ).join("\n");

  assert.doesNotMatch(source, /(?:^|\s)(?:sm:|md:|lg:|xl:|2xl:)?text-[4-9]xl/);
  assert.doesNotMatch(source, /min-h-\[660px\]/);
  assert.doesNotMatch(source, /h-\[610px\]/);
});
