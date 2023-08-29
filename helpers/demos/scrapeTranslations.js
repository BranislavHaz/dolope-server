const {
  productsListSelector,
  titleSelector,
  setSelector,
} = require("../../variables/demosSelectors");

const scrapeTranslations = async ($) => {
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
      const idManufacturer = title.split(" ")[1];
      const label = title.split(" ")[2];
      const nameCZ = title.split(" ").slice(3, -1).join(" ");

      const product = {
        idManufacturer,
        label,
        nameCZ,
      };

      scrappedProducts.push(product);
    } else {
      return;
    }
  });

  return scrappedProducts;
};

module.exports = scrapeTranslations;
