const express = require("express");
const app = express();
const demosRouter = require("./routes/demos");
const nabykovRouter = require("./routes/nabykov");
const testRouter = require("./routes/test");
require("dotenv").config();

app.use(express.json());
app.use("/demos", demosRouter);
app.use("/nabykov", nabykovRouter);
app.use("/test", testRouter);

app.get("/", (req, res) => {
  res.send("Dolope API");
});

app.listen(8080, () => {
  console.log("Príklad aplikácie počúva na porte 8080!");
});
