const axios = require("axios");

const url = "https://data.kurzy.cz/json/meny/b[6].json";

const customRound = async (number) => {
  const rounded = Math.ceil(number * 2) / 2;
  return rounded;
};

const convertEURToCZK = async (products, manufacturer) => {
  const response = await axios.get(url);
  const exchangeRateEUR = await customRound(response.data.kurzy.EUR.dev_stred);
  const exchangeRate = exchangeRateEUR ? exchangeRateEUR : 26;

  await Promise.all(
    products.map(async (product) => {
      const exchangePrice = product.price * exchangeRate;

      if (product.id === 2159933) {
        console.log("Scraped price: " + product.price);
        console.log("exchangeRateEUR: " + exchangeRateEUR);
        console.log("exchangeRate: " + exchangeRate);
        console.log("exchangePrice: " + exchangePrice);
      }

      if (manufacturer === "demos") {
        // 5.796 sú m2 jednej tabule
        product.price = Math.ceil(exchangePrice / 5.796);
      } else {
        product.price = exchangePrice;
      }
    })
  );
  return products;
};

module.exports = convertEURToCZK;
