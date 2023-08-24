const {
  productListSelector,
  codeSelector,
  titleSelector,
  priceSelector,
  setSelector,
} = require("../../variables/demos/selectors");

const productsExtractFromWeb = async (page) => {
  console.log("Spustenie - productsExtractFromWeb");
  await page.content();
  //await page.waitForSelector(priceSelector, { timeout: 190000 });

  // Extrahujte produkty na aktuální stránce
  const products = await page.evaluate(
    (
      productListSelector,
      codeSelector,
      titleSelector,
      priceSelector,
      setSelector
    ) => {
      const productElements = document.querySelectorAll(productListSelector);
      const products = [];

      productElements.forEach((element) => {
        const idElement = element.querySelector(codeSelector);
        const titleElement = element.querySelector(titleSelector);
        const priceElement = element.querySelector(priceSelector);
        const setElement = element.querySelector(setSelector) ? true : false;

        // Overuje či ide o set s ABS hranami
        if (setElement) {
          return;
        }

        const id = idElement.textContent.trim();
        const title = titleElement.innerText;
        const idManufacturer = title.split(" ")[1];
        const name = title.split(" ").slice(3, -1).join(" ");
        const label = title.split(" ")[2];
        const thickness = Number(title.match(/\/(\d+)$/)[1]);

        const price =
          Math.round(
            parseFloat(
              priceElement.innerText.replace(/[^0-9.,]/g, "").replace(",", ".")
            ) * 100
          ) / 100;
        const priceArea = Math.round((price / 5.796) * 100) / 100;

        products.push({
          id: +id,
          idManufacturer: idManufacturer,
          title: title,
          label: label,
          name: name,
          thickness: thickness,
          price_with_VAT_ks: price,
          price_with_VAT_m2: priceArea,
          availability: true,
        });
      });

      return products;
    },
    productListSelector,
    codeSelector,
    titleSelector,
    priceSelector,
    setSelector
  );
  return products;
};

module.exports = productsExtractFromWeb;
