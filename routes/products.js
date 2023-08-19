"use strict";
const express = require("express");
let router = express.Router();
const scrapeDemos = require("../helpers/demos/scrapeProducts");

router.route("/products/demos").get((req, res) => {
  scrapeDemos();
  res.send([
    { name: "Produkt 1", price: 352 },
    { name: "Produkt 2", price: 85 },
    { name: "Produkt 3", price: 32 },
  ]);
});

module.exports = router;
