const fs = require('fs');
const { PNG } = require('pngjs');

const data = fs.readFileSync('src/assets/club-logo.png');
const img = PNG.sync.read(data);
const width = img.width;
const height = img.height;

const out = new PNG({ width, height });

// Simple edge detection (Sobel)
for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
        const idx = (width * y + x) << 2;
        
        // We'll use luminance to detect edges
        const getLuma = (px, py) => {
            const i = (width * py + px) << 2;
            // If transparent, treat as black for edge detection against the yellow rim
            if (img.data[i+3] < 128) return 0;
            return 0.299 * img.data[i] + 0.587 * img.data[i+1] + 0.114 * img.data[i+2];
        };

        const tl = getLuma(x-1, y-1);
        const tc = getLuma(x, y-1);
        const tr = getLuma(x+1, y-1);
        const ml = getLuma(x-1, y);
        const mc = getLuma(x, y);
        const mr = getLuma(x+1, y);
        const bl = getLuma(x-1, y+1);
        const bc = getLuma(x, y+1);
        const br = getLuma(x+1, y+1);

        const gx = -tl - 2*ml - bl + tr + 2*mr + br;
        const gy = -tl - 2*tc - tr + bl + 2*bc + br;
        
        const mag = Math.sqrt(gx*gx + gy*gy);

        if (mag > 100) {
            // Edge! Make it yellow
            out.data[idx] = 255;   // R
            out.data[idx+1] = 215; // G
            out.data[idx+2] = 0;   // B
            out.data[idx+3] = 255; // A
        } else {
            // Not an edge! Make it transparent
            out.data[idx] = 0;
            out.data[idx+1] = 0;
            out.data[idx+2] = 0;
            out.data[idx+3] = 0;
        }
    }
}

fs.writeFileSync('src/assets/club-logo-outline.png', PNG.sync.write(out));
console.log('Outline saved!');
