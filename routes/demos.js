const express = require("express");
let router = express.Router();
const app = express();

const startScraping = require("../helpers/demos/startScraping");
const {
  getAllProductsFromDB,
  get10thicknessProductsFromDB,
  get18thicknessProductsFromDB,
} = require("../helpers/demos/getFromDB");
const convertEURToCZK = require("../helpers/convertEURToCZK");
const insertToDB = require("../helpers/demos/insertToDB");
const sendErrorEmail = require("../helpers/emailOnScrapingError");
const insertStatusToDB = require("../helpers/insertStatusToDB");

app.use(express.json());

router.get("/", (req, res) => {
  res.status(200).json({ message: "Demos API" });
});

router.get("/scrape", async (req, res) => {
  try {
    const manufacturer = req.query.manufacturer;
    const type = req.query.type;

    if (
      (manufacturer === "egger" || manufacturer === "krono") &&
      type === "products"
    ) {
      const products = await startScraping(manufacturer, type);
      const productsWithCZKCurrency = await convertEURToCZK(products);
      await insertToDB(type, productsWithCZKCurrency);
      await insertStatusToDB("demos", type, manufacturer);
      console.log("Všetko prebehlo úspešne!");
      res.status(200).json(productsWithCZKCurrency);
    } else if (
      (manufacturer === "egger" || manufacturer === "krono") &&
      type === "translations"
    ) {
      const products = await startScraping(manufacturer, type);
      await insertToDB(type, products);
      await insertStatusToDB("demos", type, manufacturer);
      console.log("Všetko prebehlo úspešne!");
      res.status(200).json(products);
    } else {
      res.status(400).send("Zajte správne parametre pre scrapovanie.");
    }
  } catch (err) {
    await sendErrorEmail("Démos", err);
    console.log("Ojoj, niečo sa porobilo!" + err);
    res.status(400).send("Niečo je zle." + err);
  }
});

router.get("/products/:type", async (req, res) => {
  if (req.params.type === "all") {
    const products = await getAllProductsFromDB();
    res.status(200).json(products);
  } else if (req.params.type === "dtd10") {
    const products = await get10thicknessProductsFromDB();
    res.status(200).json(products);
  } else if (req.params.type === "dtd18") {
    const products = await get18thicknessProductsFromDB();
    res.status(200).json(products);
  } else {
    res.status(400).send("Nesprávny formát URL");
  }
});

module.exports = router;
