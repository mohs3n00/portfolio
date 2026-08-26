import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_IMAGES_DIR = path.resolve(__dirname, '../public/images');
const SHOWCASE_DIR = path.resolve(__dirname, '../public/showcase'); // Just in case

async function getFiles(dir) {
  let results = [];
  try {
    const list = await fs.readdir(dir);
    for (const file of list) {
      const filePath = path.join(dir, file);
      const stat = await fs.stat(filePath);
      if (stat && stat.isDirectory()) {
        results = results.concat(await getFiles(filePath));
      } else {
        if (filePath.match(/\.(png|jpe?g)$/i)) {
          results.push(filePath);
        }
      }
    }
  } catch (err) {
    // ignore if dir doesn't exist
  }
  return results;
}

async function optimizeImages() {
  console.log('Starting image optimization...');
  const files = [
    ...(await getFiles(PUBLIC_IMAGES_DIR)),
    ...(await getFiles(SHOWCASE_DIR)),
  ];

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const stat = await fs.stat(file);
    totalBefore += stat.size;

    const ext = path.extname(file);
    const basename = path.basename(file, ext);
    const dir = path.dirname(file);
    const newPath = path.join(dir, `${basename}.webp`);

    let quality = 80;
    
    // Categorization logic based on path
    const normalizedPath = file.replace(/\\/g, '/');
    if (
      normalizedPath.includes('/hero/') ||
      normalizedPath.includes('/hero-new/') ||
      normalizedPath.includes('/about/') ||
      normalizedPath.includes('/stickers/') ||
      normalizedPath.includes('/clouds/') ||
      normalizedPath.endsWith('BEE.png') // special case
    ) {
      // Hero / Parallax - Prioritize quality to preserve gradients & edges
      quality = 90;
    } else if (normalizedPath.includes('/projects/')) {
      // Screenshots / Thumbnails / Scrollable
      quality = 80;
    }

    try {
      await sharp(file)
        .webp({ quality })
        .toFile(newPath);

      const newStat = await fs.stat(newPath);
      totalAfter += newStat.size;

      // Delete the old file
      await fs.unlink(file);
      console.log(`Optimized (q:${quality}): ${path.relative(process.cwd(), file)} -> .webp`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }

  const saved = totalBefore - totalAfter;
  const savedPercent = ((saved / totalBefore) * 100).toFixed(2);

  console.log('--- Image Optimization Complete ---');
  console.log(`Total Before: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total After: ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total Saved: ${(saved / 1024 / 1024).toFixed(2)} MB (${savedPercent}%)`);
}

optimizeImages();
