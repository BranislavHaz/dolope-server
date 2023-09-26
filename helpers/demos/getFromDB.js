const pool = require("../../connectDB");

const getAllProductsFromDB = async () => {
  const queryText = "SELECT * FROM products_demos AND availability = true";
  const { rows } = await pool.query(queryText);
  return rows;
};

const get10thicknessProductsFromDB = async () => {
  const queryText =
    "SELECT * FROM products_demos WHERE thickness = 10 AND availability = true";
  const { rows } = await pool.query(queryText);
  return rows;
};

const get18thicknessProductsFromDB = async () => {
  const queryText =
    "SELECT * FROM products_demos WHERE thickness = 18 AND availability = true";
  const { rows } = await pool.query(queryText);
  return rows;
};

module.exports = {
  getAllProductsFromDB,
  get10thicknessProductsFromDB,
  get18thicknessProductsFromDB,
};
