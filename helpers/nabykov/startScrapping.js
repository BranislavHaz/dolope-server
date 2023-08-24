const { startBrowser, closeBrowser } = require("../browser");
const pagesIterate = require("./pagesIterate");
const productsInsertToDB = require("./productsInsertToDB");

const startScrapping = async () => {
  try {
    const { browser, page } = await startBrowser();
    page.setViewport({ width: 1366, height: 768 });
    const products = await pagesIterate(page);
    await productsInsertToDB(products);
    await closeBrowser(browser);
    console.log("koniec");
  } catch (err) {
    throw err;
  }
};

module.exports = startScrapping;
