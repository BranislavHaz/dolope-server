const express = require("express");
const app = express();
const products = require("./routes/products");

app.use(express.json());
app.use("/", products);

app.get("/", function (req, res) {
  res.send("Ahoj svet! Toto je tvoj pohreb.");
});

app.listen(8080, function () {
  console.log("Príklad aplikácie počúva na porte 3000!");
});
