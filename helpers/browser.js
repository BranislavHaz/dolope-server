const puppeteer = require("puppeteer");

// Naštartovať prehliadač
async function startBrowser() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  return { browser, page };
}

// Zavrieť prehliadač
async function closeBrowser(browser) {
  return browser.close();
}

module.exports = { startBrowser, closeBrowser };
