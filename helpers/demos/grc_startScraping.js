const axios = require("axios");
const cheerio = require("cheerio");
const { lastPageSelector } = require("../../variables/demosSelectors");
const scrapeProducts = require("./grc_scrapeProducts");
const scrapeTranslations = require("./grc_scrapeTranslations");
const {
  DEMOS_EGGER_URL_CZ,
  DEMOS_EGGER_URL_SK,
  DEMOS_KRONO_URL_CZ,
  DEMOS_KRONO_URL_SK,
} = require("../../variables/urls");

const getURL = (manufacturer, type) => {
  if (manufacturer === "egger") {
    return {
      products: DEMOS_EGGER_URL_SK,
      translations: DEMOS_EGGER_URL_CZ,
    }[type];
  }

  if (manufacturer === "krono") {
    return {
      products: DEMOS_KRONO_URL_SK,
      translations: DEMOS_KRONO_URL_CZ,
    }[type];
  }

  return undefined;
};

const cookies = {
  withCredentials: true,
  headers: {
    Cookie: "productListByCategoryCount=48",
  },
};

const startScraping = async (manufacturer, type) => {
  const url = await getURL(manufacturer, type);
  const { data } = await axios.get(url + 1, cookies);
  const $ = cheerio.load(data);

  const lastPage = $(lastPageSelector).text();
  const products = [];

  for (let page = 1; page <= lastPage; page++) {
    console.log("Začínam scrapovať " + page + " stranu.");
    const { data } = await axios.get(url + page, cookies);
    const $ = cheerio.load(data);
    const scrappedProducts =
      type === "products"
        ? await scrapeProducts($)
        : await scrapeTranslations($);
    products.push(...scrappedProducts);
  }

  /*   const scrappedProducts =
    type === "products" ? await scrapeProducts($) : await scrapeTranslations($);
  products.push(...scrappedProducts); */

  return products;
};

module.exports = startScraping;
