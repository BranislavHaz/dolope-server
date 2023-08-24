// Vloženie nového produktu, alebo aktualizácia stávajúceho produktu do databázy
const pool = require("../../connectDB");

const insertToDB = async (product) => {
  // Kontrola, či produkt s daným ID už existuje
  const existingProducts = await pool.query({
    text: `SELECT * FROM products_nabykov WHERE id = $1`,
    values: [product.id],
  });

  if (existingProducts.rows.length === 0) {
    // Vloženie nového produktu
    await pool.query({
      text: `INSERT INTO products_nabykov(id, title, price_with_VAT, availability, product_url) VALUES($1, $2, $3, $4, $5)`,
      values: [
        product.id,
        product.title,
        product.price_with_VAT,
        product.availability,
        product.product_url,
      ],
    });
  } else {
    // Aktualizácia ceny existujúceho produktu
    await pool.query({
      text: `UPDATE products_nabykov SET price_with_VAT= $1, availability = $2 WHERE id = $3`,
      values: [product.price_with_VAT, product.availability, product.id],
    });
  }
};

const productsInsertToDB = async (products) => {
  await pool.query({
    text: "UPDATE products_nabykov SET availability = false",
  });
  for (const product of products) {
    await insertToDB(product);
  }
};

module.exports = productsInsertToDB;
