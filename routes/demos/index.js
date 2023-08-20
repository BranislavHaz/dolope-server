const express = require("express");
let router = express.Router();
const app = express();

const productsScrapeRouter = require("./productsScrape");

app.use(express.json());

router.use("/scrape", productsScrapeRouter);

router.get("/", (req, res) => {
  res.status(200).json({ message: "Demos API" });
});

module.exports = router;
