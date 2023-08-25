const {
  productsListSelector,
  codeSelector,
  titleSelector,
  priceSelector,
  urlSelector,
  setSelector,
} = require("../../variables/demosSelectors");

const productsScrapeData = async ($) => {
  const scrappedProducts = [];

  $(productsListSelector).each((index, element) => {
    const el = $(element);
    const setVerify = el.find(setSelector).text() === "Komplet" ? false : true;
    const title = el.find(titleSelector).text().trim();
    const thicknessMatch = title.match(/\/(\d+(\,\d+)?)$/);
    const thickness = thicknessMatch
      ? Number(thicknessMatch[1].replace(",", "."))
      : null;
    const thicknessVerify = thickness === 10 || thickness === 18 ? true : false;

    if (setVerify && thicknessVerify) {
      const id = Number(el.find(codeSelector).text().trim());
      console.log(id);
      const idManufacturer = title.split(" ")[1];
      const name = title.split(" ").slice(3, -1).join(" ");
      const label = title.split(" ")[2];
      //const thickness = Number(title.match(/\/(\d+)$/)[1]);
      const priceText = el.find(priceSelector).text();
      const price = Math.round(
        priceText.replace(/[^0-9.,]/g, "").replace(",", ".")
      );
      const url = el.find(urlSelector).attr("href");

      const product = {
        id,
        title,
        idManufacturer,
        name,
        label,
        thickness,
        price,
        url,
      };

      scrappedProducts.push(product);
    } else {
      return;
    }
  });

  return scrappedProducts;
};

module.exports = productsScrapeData;
