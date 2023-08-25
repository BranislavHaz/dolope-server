const axios = require("axios");
const cheerio = require("cheerio");

const {
  lastPageSelector,
  productsListSelector,
  codeSelector,
  titleSelector,
  priceSelector,
  urlSelector,
} = require("../../variables/demosSelectors");

const { DEMOS_URL } = require("../../variables/urls");

const productsStartScrapping = async (manufacturer) => {
  const { data } = await axios.get(DEMOS_URL);

  const $ = cheerio.load(data);
  const products = [];
  const lastPage = Number($(lastPageSelector).text());
  console.log(lastPage);

  $(productsListSelector).each((index, element) => {
    const el = $(element);
    const id = Number(el.find(codeSelector).text().trim());
    const title = el.find(titleSelector).text().trim();
    const idManufacturer = title.split(" ")[1];
    const name = title.split(" ").slice(3, -1).join(" ");
    const label = title.split(" ")[2];
    const thickness = Number(title.match(/\/(\d+)$/)[1]);
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

    products.push(product);
  });

  return products;
};

module.exports = productsStartScrapping;
