const express = require("express");
let router = express.Router();
const app = express();

const { getAllProducts } = require("../helpers/agc/getFromDB");

app.use(express.json());

router.get("/", (req, res) => {
  res.status(200).json({ message: "AGC API" });
});

router.get("/products", async (req, res) => {
  const products = await getAllProducts();
  res.json(products);
});

module.exports = router;
