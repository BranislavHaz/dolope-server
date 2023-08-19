const lastPageSelector = require("../../variables/selectors");

// Získanie posledného čísla v paginatore
const getLastPageNumber = async (page) => {
  console.log("Spustenie - getLastPageNumber");

  const textContent = await page.evaluate((lastPageSelector) => {
    const element = document.querySelector(lastPageSelector);
    return element ? element.innerHTML : null;
  }, lastPageSelector);

  return textContent;
};

// Prechádzanie všetkými stranami
async function iteratePages(page) {
  console.log("Spustenie - iteratePages");
  const lastPageNumber = await getLastPageNumber(page);

  // DOČASNE ZAP
  await page.goto(`${PRODUCTS_PAGE}&page=${1}`, { timeout: 60000 });
  await testujem(page);

  /* DOČASNE VYP
    for (let step = 1; step <= lastPageNumber; step++) {
      await page.goto(`${PRODUCTS_PAGE}&page=${step}`, { timeout: 60000 });
      await testujem(page);
    }*/

  saveProducts();
}

module.exports = getLastPageNumber;
