const { startBrowser, closeBrowser } = require("../browser");
const pagesIterate = require("./pagesIterate");
const productsInsertToDB = require("./productsInsertToDB");

const startScrapping = async () => {
  console.log("Spustenie - startScrapping");
  const { browser, page } = await startBrowser();
  page.setViewport({ width: 1366, height: 768 });
  const products = await pagesIterate(page);
  await productsInsertToDB(products);
  await closeBrowser(browser);
  console.log("koniec");
};

module.exports = startScrapping;
