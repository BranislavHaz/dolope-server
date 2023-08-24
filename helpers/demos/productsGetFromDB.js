const pool = require("../../connectDB");

const getAllProductsFromDatabase = async () => {
  const queryText = "SELECT * FROM products_demos";
  const { rows } = await pool.query(queryText);
  return rows;
};

module.exports = getAllProductsFromDatabase;
