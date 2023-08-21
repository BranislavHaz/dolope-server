const pagesGetLastNumber = require("./pagesGetLastNumber");
const productsExtractFromWeb = require("./productsExtractFromWeb");

const { DEMOS_URL } = require("../../variables/urls");

async function iteratePages(page) {
  await page.goto(DEMOS_URL, { timeout: 60000 });
  console.log("Spustenie - iteratePages");
  const lastPageNumber = await pagesGetLastNumber(page);
  const allProducts = [];

  console.log(lastPageNumber);

  for (let step = 1; step <= lastPageNumber; step++) {
    console.log(`${DEMOS_URL}&page=${step}`);
    await page.goto(`${DEMOS_URL}&page=${step}`, { timeout: 60000 });
    const products = await productsExtractFromWeb(page);
    allProducts.push(...products);
  }

  return allProducts;
}

module.exports = iteratePages;
