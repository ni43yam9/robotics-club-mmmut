const fs = require('fs');
const { PNG } = require('pngjs');

const data = fs.readFileSync('src/assets/club-logo.png');
const img = PNG.sync.read(data);
const width = img.width;
const height = img.height;

const out = new PNG({ width, height });

for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        const idx = (width * y + x) << 2;
        
        // Copy original pixel
        out.data[idx] = img.data[idx];
        out.data[idx+1] = img.data[idx+1];
        out.data[idx+2] = img.data[idx+2];
        out.data[idx+3] = img.data[idx+3];

        // If it's near white, make it transparent
        const r = img.data[idx];
        const g = img.data[idx+1];
        const b = img.data[idx+2];
        const a = img.data[idx+3];

        // White threshold (e.g., > 240 for R, G, B)
        if (a > 0 && r > 240 && g > 240 && b > 240) {
            // Also check if it's actually white/grey, not a very bright yellow
            // Yellow would be high R, high G, low B.
            // White is high R, high G, high B.
            if (Math.abs(r - g) < 20 && Math.abs(g - b) < 20) {
                out.data[idx+3] = 0; // Transparent
            }
        }
    }
}

fs.writeFileSync('src/assets/club-logo-nobg.png', PNG.sync.write(out));
console.log('No-BG logo saved!');
