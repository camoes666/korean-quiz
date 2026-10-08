const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const TARGET_DIR = path.join(__dirname, '..', 'public', 'images', 'mascot');
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

const IMAGES = [
  {
    src: 'C:/Users/USER/.gemini/antigravity/brain/b1576419-706f-4a54-8d0c-3708533ac48a/bomi_blackpink_1791417561436.jpg',
    name: 'bomi-blackpink',
  },
  {
    src: 'C:/Users/USER/.gemini/antigravity/brain/b1576419-706f-4a54-8d0c-3708533ac48a/hobi_bts_1791417580092.jpg',
    name: 'hobi-bts',
  },
  {
    src: 'C:/Users/USER/.gemini/antigravity/brain/b1576419-706f-4a54-8d0c-3708533ac48a/hobi_skz_1791417598666.jpg',
    name: 'hobi-skz',
  },
];

async function processImage(item) {
  const { data, info } = await sharp(item.src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  // Simple flood or color threshold to make near-white background transparent
  // We can scan from outer edges to avoid removing whites inside the eyes/body
  const visited = new Uint8Array(width * height);
  const queue = [];

  function isWhite(x, y) {
    const idx = (y * width + x) * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    // Background is very bright white
    return r > 240 && g > 240 && b > 240;
  }

  // Push border pixels
  for (let x = 0; x < width; x++) {
    if (isWhite(x, 0)) { queue.push((0 * width) + x); visited[0 * width + x] = 1; }
    if (isWhite(x, height - 1)) { queue.push(((height - 1) * width) + x); visited[(height - 1) * width + x] = 1; }
  }
  for (let y = 0; y < height; y++) {
    if (isWhite(0, y)) { queue.push((y * width) + 0); visited[y * width + 0] = 1; }
    if (isWhite(width - 1, y)) { queue.push((y * width) + (width - 1)); visited[y * width + (width - 1)] = 1; }
  }

  // BFS flood-fill only from outer edges so inside white fur remains intact!
  let head = 0;
  while (head < queue.length) {
    const curr = queue[head++];
    const cx = curr % width;
    const cy = Math.floor(curr / width);

    // Make transparent
    const pIdx = (cy * width + cx) * channels;
    data[pIdx + 3] = 0;

    // Check 4 neighbors
    const neighbors = [
      [cx + 1, cy],
      [cx - 1, cy],
      [cx, cy + 1],
      [cx, cy - 1]
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nPos = ny * width + nx;
        if (!visited[nPos] && isWhite(nx, ny)) {
          visited[nPos] = 1;
          queue.push(nPos);
        }
      }
    }
  }

  const outBuffer = Buffer.from(data);
  const webpPath = path.join(TARGET_DIR, `${item.name}.webp`);
  const pngPath = path.join(TARGET_DIR, `${item.name}.png`);

  await sharp(outBuffer, { raw: { width, height, channels } })
    .resize(512, 512, { fit: 'inside' })
    .webp({ quality: 90 })
    .toFile(webpPath);

  await sharp(outBuffer, { raw: { width, height, channels } })
    .resize(512, 512, { fit: 'inside' })
    .png({ quality: 90 })
    .toFile(pngPath);

  console.log(`Processed ${item.name} -> ${webpPath} (${fs.statSync(webpPath).size} bytes)`);
}

async function run() {
  for (const item of IMAGES) {
    await processImage(item);
  }
}

run().catch(console.error);
