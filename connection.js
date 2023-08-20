const db = require("mysql2-promise")();
require("dotenv").config();

db.configure({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
});

module.exports = db;
