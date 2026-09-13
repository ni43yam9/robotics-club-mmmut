const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
  
  await page.goto('http://localhost:5173/');
  
  // Wait for the total duration of the animation plus transition (around 6-7 seconds)
  console.log('Waiting for boot sequence to finish...');
  await new Promise(r => setTimeout(r, 6500));
  
  const status = await page.evaluate(() => {
    return {
      loaderDisplay: document.getElementById('loader-stage')?.style.display,
      bgDisplay: document.getElementById('bg-container')?.style.display,
      landingHeaderVisible: !!document.querySelector('.relative.w-full.min-h-\\[calc\\(100vh-4rem\\)\\]') // From LandingPage.tsx
    };
  });
  
  console.log('Final state at 6.5s:', status);
  
  await browser.close();
})();
