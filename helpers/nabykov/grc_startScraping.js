const axios = require("axios");
const cheerio = require("cheerio");
const scrapeProducts = require("./grc_scrapeProducts");

const { pageNavSelector } = require("../../variables/nabykovSelectors");

const { NABYKOV_URL } = require("../../variables/urls");

const axiosSet = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
  },
  withCredentials: true,
};

const getAllPages = async ($) => {
  const pagenavLinks = [NABYKOV_URL];
  $(pageNavSelector).each((index, element) => {
    const link = $(element).attr("href");
    pagenavLinks.push(link);
  });
  return pagenavLinks;
};

const startScraping = async () => {
  const products = [];

  const { data } = await axios.get(NABYKOV_URL, axiosSet);

  const $ = cheerio.load(data);

  const allPages = await getAllPages($);

  for (let step = 0; step <= allPages.length - 1; step++) {
    console.log("Začínam scrapovať " + (step + 1) + " stranu.");
    const { data } = await axios.get(allPages[step], axiosSet);
    const $ = cheerio.load(data);
    const scrappedProducts = await scrapeProducts($);
    products.push(...scrappedProducts);
  }

  return products;
};

module.exports = startScraping;
