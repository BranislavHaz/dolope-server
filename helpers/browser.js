const puppeteer = require("puppeteer");

// Naštartovať prehliadač
async function startBrowser() {
  try {
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
  } catch {
    throw new Error("Chyba vo funkcií startBrowser()");
  }
}

// Zavrieť prehliadač
async function closeBrowser(browser) {
  try {
    return browser.close();
  } catch {
    throw new Error("Chyba vo funkcií closeBrowser()");
  }
}

module.exports = { startBrowser, closeBrowser };
