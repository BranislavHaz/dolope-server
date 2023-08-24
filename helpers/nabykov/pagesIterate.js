const pagesGetAllUrls = require("./pagesGetAllUrls");
const productsExtractFromWeb = require("./productsExtractFromWeb");
const productsAdditionId = require("./productsAdditionId");

const { NABYKOV_URL } = require("../../variables/urls");

async function iteratePages(page) {
  await page.goto(NABYKOV_URL, { timeout: 60000 });
  console.log("Spustenie - iteratePages");
  const allPages = await pagesGetAllUrls(page);
  const allProducts = [];

  for (let step = 0; step <= allPages.length - 1; step++) {
    await page.goto(allPages[step], { timeout: 60000 });
    const products = await productsExtractFromWeb(page);
    const updatedProducts = await productsAdditionId(page, [...products]);
    allProducts.push(...updatedProducts);
  }

  return allProducts;
}

module.exports = iteratePages;
