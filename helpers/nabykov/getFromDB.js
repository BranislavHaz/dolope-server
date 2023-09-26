const pool = require("../../connectDB");

const getAllProducts = async () => {
  const queryText = "SELECT * FROM products_nabykov WHERE availability = true";
  const { rows } = await pool.query(queryText);
  return rows;
};

module.exports = { getAllProducts };
