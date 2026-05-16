import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SCREENSHOTS_DIR = path.join(process.cwd(), 'debug-screenshots');
if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR);

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  // Inject a mutation observer to log DOM changes that cause "blackout"
  await page.addInitScript(() => {
    window.__navTransitions = [];
    // Track visibility changes on body children
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'childList') {
          const added = [...m.addedNodes].filter(n => n.nodeType === 1).map(n => n.tagName + '.' + n.className?.substring(0,50));
          const removed = [...m.removedNodes].filter(n => n.nodeType === 1).map(n => n.tagName + '.' + n.className?.substring(0,50));
          if (added.length || removed.length) {
            window.__navTransitions.push({
              time: Date.now(),
              target: m.target.tagName + '.' + (m.target.className || '').substring(0,30),
              added,
              removed,
            });
          }
        }
      }
    });
    // Start observing once DOM is ready
    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        observer.observe(document.body, { childList: true, subtree: true });
      });
    }
  });

  console.log('=== STEP 1: Loading homepage ===');
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01-homepage.png') });
  console.log('Homepage loaded.');

  // Get all nav links
  const navLinks = await page.$$eval('header a', els => els.map(el => ({ href: el.href, text: el.textContent.trim() })));
  console.log('Nav links found:', navLinks.map(l => `${l.text} -> ${l.href}`).join(', '));

  // Find a series link (not blog, not home, not "Start Reading")
  const seriesLink = navLinks.find(l => 
    l.href.includes('localhost:3001/') && 
    !l.href.endsWith('/blog') && 
    !l.href.endsWith('/series') &&
    !l.href.endsWith(':3001/') &&
    l.text !== 'Start Reading ->'
  );

  if (!seriesLink) {
    console.log('No series link found in nav! Trying to find links on page...');
    const pageLinks = await page.$$eval('a', els => els.map(el => ({ href: el.href, text: el.textContent.trim().substring(0, 50) })));
    console.log('Page links:', JSON.stringify(pageLinks.slice(0, 20), null, 2));
    
    // Try clicking "Start Reading" or series link
    const startReading = pageLinks.find(l => l.text.includes('Start Reading') || l.href.includes('/series'));
    if (startReading) {
      console.log('\n=== STEP 2: Clicking Series page link ===');
      // Clear transitions
      await page.evaluate(() => { window.__navTransitions = []; });
      
      await page.click(`a[href="${new URL(startReading.href).pathname}"]`);
      
      // Take rapid screenshots during transition
      for (let i = 0; i < 8; i++) {
        await sleep(150);
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `02-series-transition-${i}.png`) });
      }
      
      await page.waitForLoadState('networkidle');
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '02-series-loaded.png') });
      
      const transitions1 = await page.evaluate(() => window.__navTransitions);
      console.log('DOM transitions during series nav:', JSON.stringify(transitions1, null, 2));
    }
  } else {
    console.log(`\n=== STEP 2: Clicking series: "${seriesLink.text}" ===`);
    // Clear transitions
    await page.evaluate(() => { window.__navTransitions = []; });
    
    const pathname = new URL(seriesLink.href).pathname;
    await page.click(`header a[href="${pathname}"]`);
    
    // Take rapid screenshots during transition
    for (let i = 0; i < 8; i++) {
      await sleep(200);
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `02-series-transition-${i}.png`) });
    }
    
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '02-series-loaded.png') });
    
    const transitions1 = await page.evaluate(() => window.__navTransitions);
    console.log('DOM transitions during series nav:', JSON.stringify(transitions1.slice(-15), null, 2));
  }

  // Now click on Blog to compare
  console.log('\n=== STEP 3: Clicking Blog (the one that works fine) ===');
  await page.evaluate(() => { window.__navTransitions = []; });
  
  await page.click('a[href="/blog"]');
  
  for (let i = 0; i < 8; i++) {
    await sleep(200);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `03-blog-transition-${i}.png`) });
  }
  
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '03-blog-loaded.png') });
  
  const transitions2 = await page.evaluate(() => window.__navTransitions);
  console.log('DOM transitions during blog nav:', JSON.stringify(transitions2.slice(-15), null, 2));

  // Now click on a series link from blog page
  console.log('\n=== STEP 4: Clicking a series link from blog ===');
  await page.evaluate(() => { window.__navTransitions = []; });
  
  // Find a series link in header
  const navLinksNow = await page.$$eval('header a', els => els.map(el => ({ href: el.href, text: el.textContent.trim() })));
  const seriesLink2 = navLinksNow.find(l => 
    l.href.includes('localhost:3001/') && 
    !l.href.endsWith('/blog') && 
    !l.href.endsWith('/series') &&
    !l.href.endsWith(':3001/') &&
    l.text !== 'Start Reading ->'
  );
  
  if (seriesLink2) {
    const pathname2 = new URL(seriesLink2.href).pathname;
    console.log(`Clicking: "${seriesLink2.text}" (${pathname2})`);
    await page.click(`header a[href="${pathname2}"]`);
    
    for (let i = 0; i < 10; i++) {
      await sleep(200);
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `04-series2-transition-${i}.png`) });
    }
    
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '04-series2-loaded.png') });
    
    const transitions3 = await page.evaluate(() => window.__navTransitions);
    console.log('DOM transitions during series2 nav:', JSON.stringify(transitions3.slice(-15), null, 2));
    
    // Now check the body's computed style during this page
    const bodyBg = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    console.log('Body background:', bodyBg);
    
    // Check HTML structure
    const bodyHTML = await page.evaluate(() => {
      return Array.from(document.body.children).map(el => `<${el.tagName.toLowerCase()} class="${(el.className || '').substring(0,80)}">`).join('\n');
    });
    console.log('Body children:\n', bodyHTML);
  }

  // Check for an article link on current page
  console.log('\n=== STEP 5: Clicking an article ===');
  const articleLinks = await page.$$eval('a[href]', els => 
    els.filter(el => {
      const h = el.getAttribute('href');
      return h && h.split('/').length >= 2 && !h.startsWith('http') && h !== '/blog' && h !== '/series' && h !== '/' && !h.startsWith('/search');
    }).map(el => el.getAttribute('href')).slice(0, 5)
  );
  console.log('Article links found:', articleLinks);
  
  if (articleLinks.length > 0) {
    await page.evaluate(() => { window.__navTransitions = []; });
    await page.click(`a[href="${articleLinks[0]}"]`);
    
    for (let i = 0; i < 10; i++) {
      await sleep(250);
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `05-article-transition-${i}.png`) });
    }
    
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '05-article-loaded.png') });
    
    const transitions4 = await page.evaluate(() => window.__navTransitions);
    console.log('DOM transitions during article nav:', JSON.stringify(transitions4.slice(-20), null, 2));
  }

  await browser.close();
  console.log(`\nDone! Screenshots saved to: ${SCREENSHOTS_DIR}`);
})();
