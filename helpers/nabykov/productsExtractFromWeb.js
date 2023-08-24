const getExchangeRate = require("./getExchangeRate");
const {
  productListSelector,
  titleSelector,
  priceSelector,
  availabilitySelector,
  productUrlSelector,
} = require("../../variables/nabykov/selectors");

const productsExtractFromWeb = async (page) => {
  console.log("Spustenie - productsExtractFromWeb");
  await page.waitForSelector(priceSelector, { timeout: 60000 });

  const exchangeRate = await getExchangeRate();

  // Extrahujte produkty na aktuální stránce
  const products = await page.evaluate(
    (
      exchangeRate,
      productListSelector,
      titleSelector,
      priceSelector,
      availabilitySelector,
      productUrlSelector
    ) => {
      const productElements = document.querySelectorAll(productListSelector);
      const products = [];

      productElements.forEach((element) => {
        const titleElement = element.querySelector(titleSelector);
        const priceElement = element.querySelector(priceSelector);
        const availabilityElement = element.querySelector(availabilitySelector);
        const productUrlElement = element.querySelector(productUrlSelector);
        const title = titleElement.title;
        const availability =
          availabilityElement.innerText === "Skladom" ? true : false;

        const rawPrice = parseFloat(
          priceElement.innerText.replace(/[^0-9.,]/g, "").replace(",", ".")
        );

        const price = Math.ceil(rawPrice * exchangeRate * 100) / 100;

        const url = productUrlElement.href;

        products.push({
          title: title,
          price_with_VAT: price,
          availability: availability,
          product_url: url,
        });
      });

      return products;
    },
    exchangeRate,
    productListSelector,
    titleSelector,
    priceSelector,
    availabilitySelector,
    productUrlSelector
  );
  return products;
};

module.exports = productsExtractFromWeb;
