const express = require("express");
let router = express.Router();
const app = express();

const insertOrderToDB = require("../helpers/orders/insertToDB");
const getOrderFromDB = require("../helpers/orders/getOrderFromDB");
const sendOrderEmail = require("../helpers/sendOrderEmail");

app.use(express.json());

router.get("/", (req, res) => {
  res.status(200).json({ message: "ORDER API" });
});

router.post("/send-order", async (req, res) => {
  try {
    const orderData = req.body;
    const orderId = await insertOrderToDB(orderData);
    const protocol = req.protocol;
    const host = req.get("host");
    const url = `${protocol}://${host}/orders/${orderId}`;
    await sendOrderEmail({ orderData, orderId, url });
    res.json({ message: "Order inserted", orderId });
  } catch (error) {
    console.error("Error inserting order:", error);
    res.status(500).json({ message: "Error inserting order", error });
  }
});

router.get("/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const state = await getOrderFromDB(orderId);

    if (state !== undefined) {
      res.json({ ...state });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching order state", error });
  }
});

module.exports = router;
