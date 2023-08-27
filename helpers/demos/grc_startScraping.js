const axios = require("axios");
const cheerio = require("cheerio");
const { lastPageSelector } = require("../../variables/demosSelectors");
const scrapeProducts = require("./grc_scrapeProducts");
const scrapeTranslations = require("./grc_scrapeTranslations");
const {
  DEMOS_EGGER_URL_CZ,
  DEMOS_EGGER_URLS_SK,
  DEMOS_KRONO_URL_CZ,
  DEMOS_KRONO_URLS_SK,
} = require("../../variables/urls");

const getURL = async (manufacturer, type) => {
  if (type === "products") {
    return {
      egger: DEMOS_EGGER_URLS_SK,
      krono: DEMOS_KRONO_URLS_SK,
    }[manufacturer];
  }

  if (type === "translations") {
    return {
      egger: DEMOS_EGGER_URL_CZ,
      krono: DEMOS_KRONO_URL_CZ,
    }[manufacturer];
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
  if (type === "products") {
    const urls = await getURL(manufacturer, type);
    const products = [];

    for (let key in urls) {
      console.log("Kľúč:", key);

      const { data } = await axios.get(urls[key] + 1, cookies);
      const $ = cheerio.load(data);

      const lastPage =
        $(lastPageSelector).text() > 1 ? $(lastPageSelector).text() : 1;

      for (let page = 1; page <= lastPage; page++) {
        console.log("Začínam scrapovať " + page + " stranu.");
        const { data } = await axios.get(urls[key] + page, cookies);
        const $ = cheerio.load(data);
        const scrappedProducts = await scrapeProducts($, manufacturer, key);
        products.push(...scrappedProducts);
      }
    }
    return products;
  }
  if (type === "translations") {
    const url = await getURL(manufacturer, type);
    const products = [];

    const { data } = await axios.get(url + 1, cookies);
    const $ = cheerio.load(data);

    const lastPage =
      $(lastPageSelector).text() > 1 ? $(lastPageSelector).text() : 1;

    for (let page = 1; page <= lastPage; page++) {
      console.log("Začínam scrapovať " + page + " stranu.");
      const { data } = await axios.get(url + page, cookies);
      const $ = cheerio.load(data);
      const scrappedProducts = await scrapeTranslations($);
      products.push(...scrappedProducts);
    }

    return products;
  }
};

module.exports = startScraping;
