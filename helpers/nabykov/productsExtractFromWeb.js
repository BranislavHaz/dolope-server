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

  // Extrahujte produkty na aktuální stránce
  const products = await page.evaluate(
    (
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

        //const id = idElement.textContent.trim();
        const title = titleElement.title;
        const availability =
          availabilityElement.innerText === "Skladom" ? true : false;

        const price =
          Math.round(
            parseFloat(
              priceElement.innerText.replace(/[^0-9.,]/g, "").replace(",", ".")
            ) * 100
          ) / 100;

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
    productListSelector,
    titleSelector,
    priceSelector,
    availabilitySelector,
    productUrlSelector
  );
  return products;
};

module.exports = productsExtractFromWeb;
