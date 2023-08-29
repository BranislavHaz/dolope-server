const {
  productListSelector,
  titleSelector,
  priceSelector,
  availabilitySelector,
  urlSelector,
} = require("../../variables/nabykovSelectors");
const addIDs = require("./addIDs");

const scrapeProducts = async ($) => {
  const scrappedProducts = [];

  $(productListSelector).each((index, element) => {
    const el = $(element);
    const title = el.find(titleSelector).attr("title");
    const availability =
      el.find(availabilitySelector).text().trim() === "Skladom" ? true : false;
    const priceString = el.find(priceSelector).text().trim();
    const price = parseFloat(
      priceString.replace(/[^\d.,]/g, "").replace(",", ".")
    );
    const url = el.find(urlSelector).attr("href");

    const product = {
      title,
      availability,
      price,
      url,
    };

    scrappedProducts.push(product);
  });

  const scrappedProductsWithIDs = await addIDs($, scrappedProducts);

  return scrappedProductsWithIDs;
};

module.exports = scrapeProducts;
