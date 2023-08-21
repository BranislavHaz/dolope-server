const { lastPageSelector } = require("../../variables/demos/selectors");

// Získanie posledného čísla v paginatore
const pagesGetLastNumber = async (page) => {
  console.log("Spustenie - pagesGetLastNumber");

  const textContent = await page.evaluate((lastPageSelector) => {
    const element = document.querySelector(lastPageSelector);
    return element ? element.innerHTML : null;
  }, lastPageSelector);

  return textContent;
};

module.exports = pagesGetLastNumber;
