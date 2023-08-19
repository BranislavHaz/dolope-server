"use strict";
const express = require("express");
let router = express.Router();

router.route("/products/demos").get((req, res) => {
  res.send([
    { name: "Produkt 1", price: 352 },
    { name: "Produkt 2", price: 85 },
    { name: "Produkt 3", price: 32 },
  ]);
});

module.exports = router;
