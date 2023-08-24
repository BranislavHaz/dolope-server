const axios = require("axios");

const url = "https://data.kurzy.cz/json/meny/b[6].json";

const getExchangeRate = async () => {
  const response = await axios.get(url);
  const exchangeRateEUR = response.data.kurzy.EUR.dev_stred;
  return exchangeRateEUR;
};

module.exports = getExchangeRate;
