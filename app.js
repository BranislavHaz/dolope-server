const express = require("express");
const authMiddleware = require("./middlewares/authMiddleware");
const cors = require("cors");
const app = express();
const demosRouter = require("./routes/demos");
const nabykovRouter = require("./routes/nabykov");
const agcRouter = require("./routes/agc");
const otherRouter = require("./routes/other");
const ordersRouter = require("./routes/orders");

const checkScrappingStatus = require("./helpers/checkScrappingStatus");
require("dotenv").config();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8080",
  "https://www.dolope.cz",
  "https://dolope-6771.rostiapp.cz",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      console.log(`CORS allowed for origin: ${origin}`);
      callback(null, true);
    } else {
      console.log(`CORS not allowed for origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/demos", authMiddleware, demosRouter);
app.use("/nabykov", authMiddleware, nabykovRouter);
app.use("/agc", authMiddleware, agcRouter);
app.use("/other", authMiddleware, otherRouter);
app.use("/orders", ordersRouter);

app.get("/", (req, res) => {
  res.send("Dolope API");
});

app.get("/check-status", authMiddleware, async (req, res) => {
  const status = await checkScrappingStatus();
  res.status(200).send(status);
});

app.listen(8080, () => {
  console.log("Príklad aplikácie počúva na porte 8080!");
});
