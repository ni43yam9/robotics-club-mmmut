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
        
        // If it's transparent in the original, make it transparent
        if (img.data[idx+3] < 128) {
            out.data[idx+3] = 0;
            continue;
        }

        const r = img.data[idx];
        const g = img.data[idx+1];
        const b = img.data[idx+2];
        const luma = 0.299 * r + 0.587 * g + 0.114 * b;

        // If it's a dark pixel (black text/robot), copy it
        if (luma < 100) {
            out.data[idx] = r;
            out.data[idx+1] = g;
            out.data[idx+2] = b;
            out.data[idx+3] = 255;
        } else {
            // Otherwise transparent
            out.data[idx] = 0;
            out.data[idx+1] = 0;
            out.data[idx+2] = 0;
            out.data[idx+3] = 0;
        }
    }
}

fs.writeFileSync('src/assets/club-logo-black.png', PNG.sync.write(out));
console.log('Black overlay saved!');
