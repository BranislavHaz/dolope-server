const { pageNavSelector } = require("../../variables/nabykov/selectors");
const { NABYKOV_URL } = require("../../variables/urls");

// Získanie posledného čísla v paginatore
const pagesGetAllUrls = async (page) => {
  console.log("Spustenie - pagesGetAllUrls");

  const hrefValues = await page.evaluate((pageNavSelector) => {
    const pagenavLinks = Array.from(document.querySelectorAll(pageNavSelector));
    return pagenavLinks.map((link) => link.href);
  }, pageNavSelector);

  await hrefValues.unshift(NABYKOV_URL);
  return hrefValues;
};

module.exports = pagesGetAllUrls;
