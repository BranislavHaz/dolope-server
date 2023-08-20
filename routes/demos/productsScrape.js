const express = require("express");
let router = express.Router();
const app = express();
const { startBrowser, closeBrowser } = require("../../helpers/browser");
const pagesIterate = require("../../helpers/demos/pagesIterate");
const productsInsertToDB = require("../../helpers/demos/productsInsertToDB");

app.use(express.json());

const startScrapping = async () => {
  const { browser, page } = await startBrowser();
  page.setViewport({ width: 1366, height: 768 });
  const products = await pagesIterate(page);
  await productsInsertToDB(products);
  await closeBrowser(browser);
  console.log("koniec");
};

router.get("/", async (req, res) => {
  try {
    await startScrapping();
    res.status(200).json({ message: "everything is OK" });
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
