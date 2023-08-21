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

    /*TESTUJEM*/

    /*     const content = await page.content();

    const gtagRegex =
      /gtag\("event",\s*"view_item_list",\s*{"items":\s*(\[[^\]]+\])/;
    const matches = content.match(gtagRegex);

    if (matches && matches.length >= 2) {
      const jsonArray = JSON.parse(matches[1]);

      for (const item of jsonArray) {
        const item_name = item.item_name;
        const item_id = item.item_id;

        // Prehľadávanie produktovej zoznamu a dopisovanie id
        for (const product of products) {
          if (product.title === item_name) {
            product.id = item_id;
            break; // Nájdená zhoda, nemá zmysel pokračovať
          }
        }
      }

      console.log(products); // Updatovaný zoznam produktov
    } */

    /*KONIEC TESTU*/
  }
  /*   await page.goto(NABYKOV_URL, { timeout: 60000 });
  console.log("Spustenie - iteratePages");
  const lastPageNumber = await pagesGetLastNumber(page);
  const allProducts = []; */
  /*   for (let step = 1; step <= lastPageNumber; step++) {
    await page.goto(`${NABYKOV_URL}&page=${step}`, { timeout: 60000 });
    const products = await productsExtractFromWeb(page);
    allProducts.push(...products);
  } */
  /*   await page.goto(`${NABYKOV_URL}&page=${1}`, { timeout: 60000 });
  const products = await productsExtractFromWeb(page);
  allProducts.push(...products);

  return allProducts; */

  //const updatedAllProducts = await productsAdditionId(page, allProducts);
  //console.log("KKK" + updatedAllProducts);
  return allProducts;

  //return allProducts;
}

module.exports = iteratePages;
