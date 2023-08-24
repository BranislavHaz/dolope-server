const express = require("express");
const sendErrorEmail = require("../helpers/emailOnScrapingError");
let router = express.Router();
const app = express();

const startScrapping = require("../helpers/nabykov/startScrapping");
const productsGetFromDB = require("../helpers/nabykov/productsGetFromDB");

app.use(express.json());

router.get("/", (req, res) => {
  res.status(200).json({ message: "Nabykov API" });
});

//

router.get("/mail", async (req, res) => {
  sendErrorEmail("Demos");
  res.json({ Message: "Hello" });
});
//

router.get("/scrape", async (req, res) => {
  await startScrapping();
  await sendErrorEmail("Demos");
  res.status(200).json({ message: "Nabykov scrapping is done..." });
});

router.get("/products", async (req, res) => {
  const products = await productsGetFromDB();
  res.json(products);
});

module.exports = router;
