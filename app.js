const express = require("express");
const authMiddleware = require("./middlewares/authMiddleware");
const app = express();
const demosRouter = require("./routes/demos");
const nabykovRouter = require("./routes/nabykov");
const checkScrappingStatus = require("./helpers/checkScrappingStatus");
require("dotenv").config();

app.use(authMiddleware);
app.use(express.json());
app.use("/demos", demosRouter);
app.use("/nabykov", nabykovRouter);

app.get("/", (req, res) => {
  res.send("Dolope API");
});

app.get("/check-status", async (req, res) => {
  const status = await checkScrappingStatus();
  res.status(200).send(status);
});

app.listen(8080, () => {
  console.log("Príklad aplikácie počúva na porte 8080!");
});
