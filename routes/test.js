const express = require("express");
let router = express.Router();
require("dotenv").config();
const app = express();

const { Pool, Client } = require("pg");

const pool = new Pool({
  user: process.env.DUSER,
  host: process.env.DHOST,
  database: process.env.DDATABASE,
  password: process.env.DPASSWORD,
  port: process.env.DPORT,
});

const getProducts = (req, res) => {
  pool.query("SELECT * FROM products", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

router.get("/", async (req, res) => {
  //console.log(await pool.query("SELECT NOW()"));
  getProducts(req, res);
  //res.write("hello");
});
app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});

module.exports = router;
