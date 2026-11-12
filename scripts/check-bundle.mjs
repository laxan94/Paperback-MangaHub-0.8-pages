import { readFileSync, existsSync } from "node:fs";
if (!existsSync("bundles/versioning.json"))
  throw new Error("Missing Paperback 0.9 versioning.json");
const manifest = JSON.parse(readFileSync("bundles/versioning.json", "utf8"));
const source = manifest.sources?.find(item => item.id === "Mangahub");
if (!source || source.version !== "1.0.0")
  throw new Error("Mangahub manifest ID/version mismatch");
if (!existsSync("bundles/Mangahub/index.js"))
  throw new Error("Missing bundled Mangahub/index.js");
const bundle = readFileSync("bundles/Mangahub/index.js", "utf8");
if (!bundle.includes("Mangahub") || !bundle.includes("source"))
  throw new Error("The bundled JavaScript does not export Mangahub");
console.log("MangaHub 0.9 manifest and bundle: OK");
