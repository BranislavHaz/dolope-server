const express = require("express");
let router = express.Router();
const app = express();

const startScrapping = require("../helpers/demos/startScrapping");
const productsGetFromDB = require("../helpers/demos/productsGetFromDB");

app.use(express.json());

router.get("/", (req, res) => {
  res.status(200).json({ message: "Demos API" });
});

router.get("/scrape", async (req, res) => {
  await startScrapping();
  res.status(200).json({ message: "everything is right" });
});

router.get("/products", async (req, res) => {
  const products = await productsGetFromDB();
  res.json(products);
});

module.exports = router;
