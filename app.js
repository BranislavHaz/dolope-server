const express = require("express");
const app = express();
const demosRouter = require("./routes/demos/index");
require("dotenv").config();

app.use(express.json());
app.use("/demos", demosRouter);

app.get("/", (req, res) => {
  res.send("Ahoj svet! Toto je tvoj pohreb.");
});

app.listen(8080, () => {
  console.log("Príklad aplikácie počúva na porte 8080!");
});
