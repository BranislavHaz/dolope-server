const express = require("express");
const app = express();
const products = require("./routes/products");
const client = require("./connection");

app.use(express.json());
app.use("/", products);

app.get("/", function (req, res) {
  res.send("Ahoj svet! Toto je tvoj pohreb.");
});

app.listen(8080, function () {
  console.log("Príklad aplikácie počúva na porte 8080!");
});

client.connect();

app.get("/produkty", (req, res) => {
  client.query(`Select * from products`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
  client.end;
});
