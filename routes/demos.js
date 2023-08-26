const express = require("express");
let router = express.Router();
const app = express();

const startScraping = require("../helpers/demos/grc_startScraping");
//const startScrapping = require("../helpers/demos/startScrapping");
const productsGetFromDB = require("../helpers/demos/productsGetFromDB");
const productsIterating = require("../helpers/demos/grc_startScraping");
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
      insertToDB(type, products);
      res.status(200).json(products);
    } else {
      res
        .status(400)
        .json({ errMessage: "Zajte správne parametre pre scrapovanie." });
    }
  } catch (err) {
    sendErrorEmail("Démos", err);
  }
});

router.get("/products", async (req, res) => {
  const products = await productsGetFromDB();
  res.json(products);
});

module.exports = router;
