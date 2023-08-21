const connection = require("../../connection");

const getAllProductsFromDatabase = async () => {
  /*   try {
    const products = await db.query(`SELECT * FROM products_nabykov`);
    console.log(products);
    return products;
  } catch (error) {
    throw error;
  } */
  const conn = await connection();
  const [products] = await conn.execute(`SELECT * FROM products_nabykov`);
  return products;
};

module.exports = getAllProductsFromDatabase;
