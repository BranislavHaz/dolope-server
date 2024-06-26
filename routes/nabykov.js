const express = require("express");
let router = express.Router();
const app = express();

const startScraping = require("../helpers/nabykov/startScraping");
const extractParamsFromTitle = require("../helpers/nabykov/extractParamsFromTitle");
const { getAllProducts } = require("../helpers/nabykov/getFromDB");
const convertEURToCZK = require("../helpers/convertEURToCZK");
const insertToDB = require("../helpers/nabykov/insertToDB");
const sendErrorEmail = require("../helpers/emailOnScrapingError");
const insertStatusToDB = require("../helpers/insertStatusToDB");

app.use(express.json());

router.get("/", (req, res) => {
  res.status(200).json({ message: "Nabykov API" });
});

router.get("/scrape", async (req, res) => {
  try {
    const products = await startScraping();
    const productsWithCZKCurrency = await convertEURToCZK(products, "nabykov");
    const productsWithParams = await extractParamsFromTitle(
      productsWithCZKCurrency
    );
    await insertToDB(productsWithParams);
    await insertStatusToDB("nabykov", "products");
    console.log("Všetko prebehlo úspešne!");
    res.status(200).json(productsWithParams);
  } catch (err) {
    await sendErrorEmail("Nabykov", err);
    console.log("Ojoj, niečo sa porobilo!" + err);
    res.status(400).send("Niečo je zle." + err);
  }
});

router.get("/products", async (req, res) => {
  const products = await getAllProducts();
  res.json(products);
});

module.exports = router;
