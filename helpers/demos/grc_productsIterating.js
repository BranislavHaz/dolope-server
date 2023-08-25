const axios = require("axios");
const cheerio = require("cheerio");
const { lastPageSelector } = require("../../variables/demosSelectors");
const productsScrapeData = require("./grc_productsScrapeData");
const {
  DEMOS_EGGER_URL_CZ,
  DEMOS_EGGER_URL_SK,
  DEMOS_KRONO_URL_CZ,
  DEMOS_KRONO_URL_SK,
} = require("../../variables/urls");

const getURL = (type, manufacturer) => {
  if (manufacturer === "egger") {
    return {
      products: DEMOS_EGGER_URL_CZ,
      availability: DEMOS_EGGER_URL_SK,
    }[type];
  }

  if (manufacturer === "krono") {
    return {
      products: DEMOS_KRONO_URL_CZ,
      availability: DEMOS_KRONO_URL_SK,
    }[type];
  }

  return undefined;
};

const productsIterating = async (type, manufacturer) => {
  const url = await getURL(type, manufacturer);
  const { data } = await axios.get(url + 17);
  const $ = cheerio.load(data);

  const lastPage = $(lastPageSelector).text();
  const products = [];

  for (let page = 1; page <= lastPage; page++) {
    console.log("Začínam scrapovať " + page + " stranu.");
    const { data } = await axios.get(url + page);
    const $ = cheerio.load(data);
    const scrappedProducts = await productsScrapeData($);
    products.push(...scrappedProducts);
  }

  /*   const scrappedProducts = await productsScrapeData($);
  products.push(...scrappedProducts); */

  return products;
};

module.exports = productsIterating;
