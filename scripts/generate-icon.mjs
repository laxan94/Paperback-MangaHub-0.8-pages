import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
const size = 128;
const pixels = new Uint8Array(size * size * 4);
function paint(x, y, color) {
  if (x >= 0 && x < size && y >= 0 && y < size)
    pixels.set(color, (y * size + x) * 4);
}
for (let y = 0; y < size; y++)
  for (let x = 0; x < size; x++)
    paint(x, y, x < 6 || x >= 122 || y < 6 || y >= 122
      ? [16, 163, 127, 255] : [16, 39, 30, 255]);
const glyphs = [
  { x: 24, rows: ["10001","11011","10101","10101","10001","10001","10001"] },
  { x: 70, rows: ["10001","10001","10001","11111","10001","10001","10001"] },
];
for (const glyph of glyphs)
  for (let y = 0; y < 7; y++)
    for (let x = 0; x < 5; x++)
      if (glyph.rows[y][x] === "1")
        for (let dy = 0; dy < 8; dy++)
          for (let dx = 0; dx < 8; dx++)
            paint(glyph.x + x * 8 + dx, 36 + y * 8 + dy, [215, 243, 163, 255]);
const raw = Buffer.alloc(size * (size * 4 + 1));
for (let y = 0; y < size; y++) {
  const dest = y * (size * 4 + 1);
  raw[dest] = 0;
  raw.set(pixels.subarray(y * size * 4, (y + 1) * size * 4), dest + 1);
}
function crc32(data) {
  let crc = 0xffffffff;
  for (const byte of data) {
    crc ^= byte;
    for (let n = 0; n < 8; n++)
      crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const label = Buffer.from(type, "ascii");
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([label, data])));
  return Buffer.concat([length, label, data, crc]);
}
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(size, 0);
ihdr.writeUInt32BE(size, 4);
ihdr[8] = 8; ihdr[9] = 6;
const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk("IHDR", ihdr),
  chunk("IDAT", deflateSync(raw)),
  chunk("IEND", Buffer.alloc(0)),
]);
mkdirSync("src/Mangahub/static", { recursive: true });
writeFileSync("src/Mangahub/static/icon.png", png);
