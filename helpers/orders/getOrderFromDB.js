const pool = require("../../connectDB");

const getOrderStateFromDB = async (orderId) => {
  const result = await pool.query({
    text: `SELECT state FROM orders WHERE id = $1`,
    values: [orderId],
  });

  return result.rows[0].state;
};

module.exports = getOrderStateFromDB;
