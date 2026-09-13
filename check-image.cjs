const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setContent(`
    <img id="img" src="file:///C:/Users/nitya/OneDrive/Attachments/Desktop/Robotics Club/rc-landing-page/src/assets/club-logo.png" />
    <canvas id="canvas"></canvas>
  `);

  const hasAlpha = await page.evaluate(() => {
    return new Promise(resolve => {
      const img = document.getElementById('img');
      img.onload = () => {
        const canvas = document.getElementById('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, img.width, img.height).data;
        
        let hasTransparentPixels = false;
        let hasWhitePixels = false;
        // Check corners and center
        const testPoints = [
          0, // top-left
          (img.width - 1) * 4, // top-right
          ((img.height - 1) * img.width) * 4, // bottom-left
          ((img.height - 1) * img.width + img.width - 1) * 4, // bottom-right
          Math.floor(img.height/2 * img.width + img.width/2) * 4 // center
        ];
        
        for (let i = 0; i < data.length; i += 4) {
          if (data[i+3] < 255) hasTransparentPixels = true;
          if (data[i] > 240 && data[i+1] > 240 && data[i+2] > 240 && data[i+3] === 255) hasWhitePixels = true;
        }
        resolve({ hasTransparentPixels, hasWhitePixels, width: img.width, height: img.height });
      };
    });
  });
  
  console.log('Image alpha check:', hasAlpha);
  await browser.close();
})();
