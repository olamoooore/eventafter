import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const galleryDir = path.join(__dirname, '..', 'public', 'gallery-images');
const outputFile = path.join(__dirname, '..', 'public', 'gallery-manifest.json');
const imageExtensions = /\.(webp|jpg|jpeg|png|avif|gif)$/i;

const files = fs.readdirSync(galleryDir).filter((f) => imageExtensions.test(f));
const images = files.map((filename, index) => ({
  id: String(index),
  url: `/gallery-images/${encodeURIComponent(filename)}`,
}));

fs.writeFileSync(outputFile, JSON.stringify({ images }, null, 2));
console.log(`Gallery manifest written: ${images.length} images`);
