const db = require("../../connection");

const getAllProductsFromDatabase = async () => {
  try {
    const [products] = await db.query(`SELECT * FROM products_nabykov`);
    return products;
  } catch (error) {
    throw error;
  }
};

module.exports = getAllProductsFromDatabase;
