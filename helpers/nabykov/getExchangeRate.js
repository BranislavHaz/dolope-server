const axios = require("axios");

const url = "https://data.kurzy.cz/json/meny/b[6].json";

const getExchangeRate = async () => {
  try {
    const response = await axios.get(url);
    const exchangeRateEUR = response.data.kurzy.EUR.dev_stred;
    return exchangeRateEUR;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    return 25;
  }
};

module.exports = getExchangeRate;
