const express = require("express");
let router = express.Router();
const app = express();

const startScrapping = require("../helpers/nabykov/startScrapping");
const productsGetFromDB = require("../helpers/nabykov/productsGetFromDB");

app.use(express.json());

router.get("/", (req, res) => {
  res.status(200).json({ message: "Nabykov API" });
});

router.get("/scrapping", async (req, res) => {
  try {
    await startScrapping();
    res.status(200).json({ message: "Nabykov Scrapping is done..." });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await productsGetFromDB();
    res.json(products);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
