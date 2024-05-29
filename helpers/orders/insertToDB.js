const pool = require("../../connectDB");
const checkOrderData = require("./checkOrderData");

const insertOrderToDB = async (orderData) => {
  const order = await checkOrderData(orderData);

  const result = await pool.query({
    text: `INSERT INTO orders(name, surname, mail, phone, city, zip, info, state, timestamp, price, currency) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`,
    values: [
      order.name,
      order.surname,
      order.mail,
      order.phone,
      order.city,
      order.zip,
      order.info,
      order.state,
      order.timestamp,
      order.price,
      order.currency,
    ],
  });

  return result.rows[0].id;
};

module.exports = insertOrderToDB;
