const nodemailer = require("nodemailer");
require("dotenv").config();

const getTransporter = async () => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  return transporter;
};

module.exports = getTransporter;
