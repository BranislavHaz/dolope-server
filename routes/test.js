const express = require("express");
const nodemailer = require("nodemailer");
const http = require("http");
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

const transporter = nodemailer.createTransport({
  host: process.env.MHOST,
  port: process.env.MPORT,
  secure: true,
  auth: {
    user: process.env.MUSER,
    pass: process.env.MPASS,
  },
});

const sendEmail = async (req, res) => {
  transporter.sendMail(
    {
      from: '"Dolope test 3" <dolope@dolope.cz>', // sender address
      to: "haz.branislav@gmail.com", // list of receivers
      subject: "Ahoj toto posielam z backend appky", // Subject line
      text: "Ahoj, toto je test 3 a posielam to z rosti", // plain text body
      html: "<b>Prešlo to v pohode?</b>", // html body
    },
    (err, info) => {
      if (err) {
        res.json({ error: err, "Your IP": req.socket.remoteAddress });
      } else {
        res.json({
          messageId: info.messageId,
          envelope: info.envelope,
          accepted: info.accepted,
          rejected: info.rejected,
          pending: info.pending,
          "Your IP": req.socket.remoteAddress,
        });
      }
    }
  );
};

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
  /*   transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  res.status(200).json({ hello: "Hello" }); */
  //getProducts(req, res);
  //res.write("hello");
  sendEmail(req, res);
});
app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});

module.exports = router;
