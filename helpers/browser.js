const puppeteer = require("puppeteer");

// Naštartovať prehliadač
async function startBrowser() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  const cookie = {
    name: "productListByCategoryCount",
    value: "48",
    domain: "www.demos-trade.cz",
    path: "/",
    expires: Math.floor(Date.now() / 1000) + 3600,
  };
  await page.setCookie(cookie);

  return { browser, page };
}

// Zavrieť prehliadač
async function closeBrowser(browser) {
  return browser.close();
}

module.exports = { startBrowser, closeBrowser };
