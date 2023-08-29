const express = require("express");
let router = express.Router();
const app = express();

const startScraping = require("../helpers/demos/grc_startScraping");
//const startScrapping = require("../helpers/demos/startScrapping");
const {
  getAllProductsFromDB,
  get10thicknessProductsFromDB,
  get18thicknessProductsFromDB,
} = require("../helpers/demos/productsGetFromDB");
//const productsIterating = require("../helpers/demos/grc_startScraping");
const convertEURToCZK = require("../helpers/convertEURToCZK");
const insertToDB = require("../helpers/demos/insertToDB");
const sendErrorEmail = require("../helpers/emailOnScrapingError");

app.use(express.json());

router.get("/", (req, res) => {
  res.status(200).json({ message: "Demos API" });
});

router.get("/scrape", async (req, res) => {
  await startScrapping();
  res.status(200).json({ message: "everything is right" });
});

router.get("/scrapping", async (req, res) => {
  try {
    const manufacturer = req.query.manufacturer;
    const type = req.query.type;

    if (
      (manufacturer === "egger" || manufacturer === "krono") &&
      (type === "products" || type === "translations")
    ) {
      const products = await startScraping(manufacturer, type);
      const productsWithCZKCurrency = await convertEURToCZK(products);
      insertToDB(type, productsWithCZKCurrency);
      res.status(200).json(productsWithCZKCurrency);
    } else {
      res.status(400).send("Zajte správne parametre pre scrapovanie.");
    }
  } catch (err) {
    sendErrorEmail("Démos", err);
  }
});

router.get("/products/:type", async (req, res) => {
  if (req.params.type === "all") {
    const products = await getAllProductsFromDB();
    res.status(200).json(products);
  } else if (req.params.type === "10") {
    const products = await get10thicknessProductsFromDB();
    res.status(200).json(products);
  } else if (req.params.type === "18") {
    const products = await get18thicknessProductsFromDB();
    res.status(200).json(products);
  } else {
    res.status(400).send("Nesprávny formát URL");
  }
});

module.exports = router;
