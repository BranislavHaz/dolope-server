const pagesGetLastNumber = require("./pagesGetLastNumber");
const productsExtractFromWeb = require("./productsExtractFromWeb");

const { DTD_URL } = require("../../variables/urls");

async function iteratePages(page) {
  await page.goto(DTD_URL, { timeout: 60000 });
  console.log("Spustenie - iteratePages");
  const lastPageNumber = await pagesGetLastNumber(page);
  const allProducts = [];

  for (let step = 1; step <= lastPageNumber; step++) {
    await page.goto(`${DTD_URL}&page=${1}`, { timeout: 60000 });
    const products = await productsExtractFromWeb(page);
    allProducts.push(...products);
  }

  return allProducts;
}

module.exports = iteratePages;
