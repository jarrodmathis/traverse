// Builds public/data.js: the book structure and the three verse pools.
// Verse text is the Berean Standard Bible (public domain), fetched at build time.
import { readFile, writeFile } from "node:fs/promises";
const SRC = "https://raw.githubusercontent.com/scrollmapper/bible_databases/master/formats/json/BSB.json";
const res = await fetch(SRC);
if (!res.ok) throw new Error("Could not fetch verse text: " + res.status);
const books = (await res.json()).books;
const fix = (n) => {
  n = n.replace(/^III /, "3 ").replace(/^II /, "2 ").replace(/^I /, "1 ");
  return n.startsWith("Revelation") ? "Revelation" : n;
};
const all = [];
const struct = books.map((b, bi) => [
  fix(b.name),
  b.chapters.map((c) => {
    for (const v of c.verses) all.push([bi, c.chapter, v.verse, v.text.trim()]);
    return c.verses.length;
  }),
]);
const pools = JSON.parse(await readFile(new URL("./pools.json", import.meta.url), "utf8"));
const data = { books: struct, pools: [pools.easy, pools.medium, pools.hard, pools.easy2].map((p) => p.map((i) => all[i])) };
await writeFile(new URL("./public/data.js", import.meta.url), "window.TV_DATA=" + JSON.stringify(data) + ";");
console.log("Wrote public/data.js with", data.pools.map((p) => p.length).join(" + "), "verses");
