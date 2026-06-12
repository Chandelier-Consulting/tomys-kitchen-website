import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("homepage uses real responsive food imagery", async () => {
  const page = await readFile(new URL("../src/app/page.tsx", import.meta.url), "utf8");

  assert.match(page, /from "next\/image"/);
  assert.match(page, /\/images\/tomys-hero\.png/);
  assert.match(page, /\/images\/tomys-tacos\.png/);
  assert.match(page, /\/images\/tomys-quesabirria\.png/);
  assert.match(page, /sizes="/);
});

test("navigation and menu category controls guard against mobile overflow", async () => {
  const navbar = await readFile(new URL("../src/components/Navbar.tsx", import.meta.url), "utf8");
  const menuPage = await readFile(new URL("../src/app/menu/page.tsx", import.meta.url), "utf8");

  assert.match(navbar, /max-h-\[calc\(100svh-5rem\)\]/);
  assert.match(navbar, /overflow-y-auto/);
  assert.match(menuPage, /max-w-full/);
  assert.match(menuPage, /overflow-x-auto/);
});
