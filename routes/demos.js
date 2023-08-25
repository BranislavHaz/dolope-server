const express = require("express");
let router = express.Router();
const app = express();

const productsStartScrapping = require("../helpers/demos/grc_productsStartScrapping");
const startScrapping = require("../helpers/demos/startScrapping");
const productsGetFromDB = require("../helpers/demos/productsGetFromDB");
const productsIterating = require("../helpers/demos/grc_productsIterating");

app.use(express.json());

router.get("/", (req, res) => {
  res.status(200).json({ message: "Demos API" });
});

router.get("/scrape", async (req, res) => {
  await startScrapping();
  res.status(200).json({ message: "everything is right" });
});

router.get("/scrapping", async (req, res) => {
  //const products = await productsStartScrapping();
  //res.status(200).json({ products });
  const products = await productsIterating("availability", "egger");
  res.json(products);
});

router.get("/products", async (req, res) => {
  const products = await productsGetFromDB();
  res.json(products);
});

module.exports = router;
