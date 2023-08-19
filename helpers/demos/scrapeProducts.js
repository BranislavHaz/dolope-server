const fs = require("fs");
const puppeteer = require("puppeteer");
const parseProductTitle = require("../../libs/parsingProductData");

const getLastPageNumber = require("../../helpers/demos/pages");

function scrapeDemos(req, res) {
  const PRODUCTS_PAGE =
    "https://www.demos-trade.sk/dtd-laminovane/?product_filter_form%5BavailabilitiesData%5D%5B%5D=3&product_filter_form%5BpriceRange%5D%5Bmin%5D=44&product_filter_form%5BpriceRange%5D%5Bmax%5D=524&product_filter_form%5BbrandsData%5D%5B%5D=8&product_filter_form%5BnameFilterData%5D=&product_filter_form%5Bparameters%5D%5B96%5D%5B%5D=23&product_filter_form%5Bparameters%5D%5B52%5D%5B%5D=53";

  let allProducts = [];

  async function startBrowser() {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    return { browser, page };
  }

  async function closeBrowser(browser) {
    return browser.close();
  }

  async function iteratePages(page) {
    console.log("Spustenie - iteratePages");
    const lastPageNumber = await getLastPageNumber(page);

    // DOČASNE ZAP
    await page.goto(`${PRODUCTS_PAGE}&page=${1}`, { timeout: 60000 });
    await getAllProducts(page);

    /* DOČASNE VYP
    for (let step = 1; step <= lastPageNumber; step++) {
      await page.goto(`${PRODUCTS_PAGE}&page=${step}`, { timeout: 60000 });
      await getAllProducts(page);
    }*/

    saveProducts();
  }

  const getAllProducts = async (page) => {
    console.log("Spustenie - getAllProducts");
    const selector =
      ".no-scrollbar > div > div.scroll-wrapper.js-scroll-content > div.js-scroll-content.scroll-content > table > tbody > tr";
    const codeSelector = "a.in-code";
    const priceSelector = ".list-products-line__item__price__item--main";

    await page.waitForSelector(priceSelector, { timeout: 60000 });

    // Extrahujte produkty na aktuální stránce
    const products = await page.evaluate(
      (selector, codeSelector, priceSelector) => {
        const productElements = document.querySelectorAll(selector);
        const products = [];

        productElements.forEach((element) => {
          const codeElement = element.querySelector(codeSelector);
          const priceElement = element.querySelector(priceSelector);

          const code = codeElement ? codeElement.textContent.trim() : "";
          let price = priceElement.innerText ? priceElement.innerText : "";

          if (price) {
            price = parseFloat(price.replace(",", ".").match(/\d+\.\d+/));
          }

          products.push({
            product_code: code,
            price_with_VAT_ks: price,
          });
        });

        return products;
      },
      selector,
      codeSelector,
      priceSelector
    );

    allProducts = allProducts.concat(products); // Přidejte produkty na aktuální stránce do globálního pole
  };

  const saveProducts = () => {
    console.log("Spustenie - saveProducts");
    const jsonContent = JSON.stringify(allProducts);

    fs.writeFile("products.json", jsonContent, "utf8", function (err) {
      if (err) {
        console.log("Chyba pri zápise do súboru:", err);
      } else {
        console.log("Dáta boli úspešne uložené do products.json");
      }
    });
  };

  async function playTest() {
    const { browser, page } = await startBrowser();
    page.setViewport({ width: 1366, height: 768 });
    await page.goto(PRODUCTS_PAGE, { timeout: 60000 });
    await iteratePages(page);

    await closeBrowser(browser);
  }

  playTest();

  res.status(200).json({ message: "Hello!" });
}

module.exports = scrapeDemos;
