import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const MAP_IMG_DIR = path.join(ROOT, 'public', 'images', 'map');
const MAP_SPOTS_FILE = path.join(ROOT, 'src', 'data', 'mapSpots.ts');

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const MAX_WIDTH = 900;
const WEBP_QUALITY = 75;
const SKIP_WEBP_MAX_BYTES = 100 * 1024;

async function main() {
  if (!fs.existsSync(MAP_IMG_DIR)) {
    console.error('Directory not found:', MAP_IMG_DIR);
    process.exit(1);
  }

  const spotDirs = fs.readdirSync(MAP_IMG_DIR, { withFileTypes: true }).filter((d) => d.isDirectory());

  let totalBefore = 0;
  let totalAfter = 0;
  let convertedCount = 0;
  const renames = [];

  for (const dir of spotDirs) {
    const dirPath = path.join(MAP_IMG_DIR, dir.name);
    const files = fs.readdirSync(dirPath, { withFileTypes: true }).filter((f) => f.isFile());

    for (const file of files) {
      const ext = path.extname(file.name).toLowerCase();
      if (!IMAGE_EXTS.has(ext)) continue;

      const srcPath = path.join(dirPath, file.name);
      if (file.name.endsWith('.tmp.webp')) {
        fs.unlinkSync(srcPath);
        continue;
      }

      const stat = fs.statSync(srcPath);
      totalBefore += stat.size;

      const stem = path.basename(file.name, ext);
      const destName = `${stem}.webp`;
      const destPath = path.join(dirPath, destName);

      const inputBuffer = fs.readFileSync(srcPath);

      // Idempotency: if already webp, small enough, and within max width, keep as-is
      if (ext === '.webp' && stat.size <= SKIP_WEBP_MAX_BYTES) {
        const meta = await sharp(inputBuffer).metadata();
        if (!meta.width || meta.width <= MAX_WIDTH) {
          totalAfter += stat.size;
          continue;
        }
      }

      const buffer = await sharp(inputBuffer)
        .rotate()
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY, effort: 4 })
        .toBuffer();

      if (srcPath !== destPath && fs.existsSync(srcPath)) {
        fs.unlinkSync(srcPath);
        renames.push({
          from: `/images/map/${dir.name}/${file.name}`,
          to: `/images/map/${dir.name}/${destName}`,
        });
      }

      fs.writeFileSync(destPath, buffer);
      totalAfter += buffer.length;
      convertedCount++;
    }
  }

  if (renames.length > 0 && fs.existsSync(MAP_SPOTS_FILE)) {
    let content = fs.readFileSync(MAP_SPOTS_FILE, 'utf8');
    for (const { from, to } of renames) {
      content = content.split(from).join(to);
    }
    fs.writeFileSync(MAP_SPOTS_FILE, content, 'utf8');
  }

  const beforeMB = (totalBefore / (1024 * 1024)).toFixed(2);
  const afterMB = (totalAfter / (1024 * 1024)).toFixed(2);
  const pct = totalBefore > 0 ? (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1) : '0';

  console.log(`Optimized ${convertedCount} images (${renames.length} URL references updated in mapSpots.ts)`);
  console.log(`Total size: ${beforeMB} MB -> ${afterMB} MB (-${pct}%)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
