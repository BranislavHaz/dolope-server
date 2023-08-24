const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
let router = express.Router();
const app = express();

app.use(express.json());

const {
  productListSelector,
  codeSelector,
  titleSelector,
  priceSelector,
  setSelector,
} = require("../variables/demos/selectors");

async function fetchTitles() {
  try {
    // Stiahnutie obsahu stránky
    const { data } = await axios.get(
      "https://www.demos-trade.cz/dtd-laminovane/"
    );

    // Načítanie obsahu do cheerio
    const $ = cheerio.load(data);

    // Vytvorenie pola s názvami produktov
    const products = [];
    const web = data;
    const list = $(".list-products-line__item");
    $(
      "table.list-products-line__scroll__in:nth-of-type(1) tr.list-products-line__item:not(:first-child)"
    ).each((index, element) => {
      const el = $(element);
      const title = el.find(titleSelector).text().trim();
      const priceText = el.find(priceSelector).text();

      const product = {
        //id: el.find(codeSelector).text().trim(),
        title: title,
        //idManufacturer: title.split(" ")[1],
        //name: title.split(" ").slice(3, -1).join(" "),
        //label: title.split(" ")[2],
        //thickness: Number(title.match(/\/(\d+)$/)[1]),
        /*         price:
          Math.round(
            parseFloat(priceText.replace(/[^0-9.,]/g, "").replace(",", ".")) *
              100
          ) / 100,
        priceArea:
          Math.round(
            (parseFloat(priceText.replace(/[^0-9.,]/g, "").replace(",", ".")) /
              5.796) *
              100
          ) / 100, */
      };

      products.push(product);
    });

    // Výpis názvov produktov
    console.log(products);
    return data;
  } catch (error) {
    console.error("Chyba pri načítaní stránky:", error);
  }
}

router.get("/", async (req, res) => {
  await fetchTitles();
  res.status(200).json({ message: "tto" });
});

module.exports = router;
