const mysql = require("mysql2/promise");
require("dotenv").config();

const options = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
};

const connection = async () => {
  return await mysql.createConnection(options);
};

/* const db = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
};

const query = async (sql, params) => {
  const connection = await mysql.createConnection(db);
  const [results] = await connection.execute(sql, params);
  return results;
}; */

module.exports = connection;
