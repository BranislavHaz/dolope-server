const axios = require("axios");

const url = "https://data.kurzy.cz/json/meny/b[6].json";

const customRound = async (number) => {
  const rounded = Math.ceil(number * 2) / 2;
  return rounded;
};

const convertEURToCZK = async (products) => {
  const response = await axios.get(url);
  const exchangeRateEUR = await customRound(response.data.kurzy.EUR.dev_stred);
  const exchangeRate = exchangeRateEUR ? exchangeRateEUR : 26;

  await Promise.all(
    products.map(async (product) => {
      const exchangePrice = product.price * exchangeRate;
      product.price = Math.ceil(exchangePrice);
    })
  );
  return products;
};

module.exports = convertEURToCZK;
