const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const b64 = fs.readFileSync('C:/Users/nitya/OneDrive/Attachments/Desktop/Robotics Club/rc-landing-page/src/assets/club-logo.png').toString('base64');

  await page.setContent(`
    <style>
      body { background: #333; display: flex; justify-content: center; align-items: center; height: 100vh; }
      img { max-width: 500px; border: 1px solid red; }
    </style>
    <img src="data:image/png;base64,${b64}" />
  `);
  
  await page.screenshot({ path: 'C:/Users/nitya/.gemini/antigravity/brain/cd43bbb8-d8b6-4b97-8392-37512f0ee604/scratch/logo-test.png' });
  await browser.close();
})();
