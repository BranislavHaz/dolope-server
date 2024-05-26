const express = require("express");
let router = express.Router();
const app = express();

const insertOrderToDB = require("../helpers/orders/insertToDB");

app.use(express.json());

router.get("/", (req, res) => {
  res.status(200).json({ message: "MAIL API" });
});

router.post("/send-order", async (req, res) => {
  const orderData = await req.body;
  await insertOrderToDB(orderData);
  console.log(orderData);
  res.json("hello");
});

module.exports = router;
